import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { beneficiaries, chart, transactions, users, wallets } from './data.js';
import {
  register,
  httpRequestsTotal,
  httpRequestDuration,
  loginSuccessTotal,
  loginFailedTotal,
  transferTotal,
} from './metrics.js';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-change-me';

const app = express();

// Helmet configuration
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        upgradeInsecureRequests: null,
      },
    },
  })
);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? true,
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan('tiny'));
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();

  res.on('finish', () => {
    const route = req.route?.path || req.path;

    httpRequestsTotal.inc({
      method: req.method,
      route,
      status: res.statusCode,
    });

    end({
      method: req.method,
      route,
      status: res.statusCode,
    });
  });

  next();
});

const sign = (user) =>
  jwt.sign(
    { sub: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '2h' }
  );

const publicUser = (u) => ({
  id: u.id,
  name: u.name,
  email: u.email,
});

function auth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      message: 'Missing bearer token',
    });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({
      message: 'Invalid or expired token',
    });
  }
}

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'novapay-api',
  });
});

app.get('/metrics', async (_req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.post('/api/auth/login', async (req, res) => {
  const body = z
    .object({
      email: z.string().email(),
      password: z.string().min(6),
    })
    .safeParse(req.body);

  if (!body.success) {
    return res.status(400).json({
      message: 'Enter a valid email and password.',
    });
  }

  const user = users.find(
    (u) => u.email === body.data.email.toLowerCase()
  );

  if (!user || !(await bcrypt.compare(body.data.password, user.passwordHash))) {
  loginFailedTotal.inc();

  return res.status(401).json({
    message: 'Invalid credentials',
  });
}

loginSuccessTotal.inc();

  res.json({
    token: sign(user),
    user: publicUser(user),
  });
});

app.post('/api/auth/register', async (req, res) => {
  const body = z
    .object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(8),
    })
    .safeParse(req.body);

  if (!body.success) {
    return res.status(400).json({
      message:
        'Please provide name, valid email, and 8+ character password.',
    });
  }

  if (
    users.some(
      (u) => u.email === body.data.email.toLowerCase()
    )
  ) {
    return res.status(409).json({
      message: 'Account already exists',
    });
  }

  const user = {
    id: `usr_${Date.now()}`,
    name: body.data.name,
    email: body.data.email.toLowerCase(),
    passwordHash: await bcrypt.hash(body.data.password, 10),
  };

  users.push(user);

  res.status(201).json({
    token: sign(user),
    user: publicUser(user),
  });
});

app.get('/api/dashboard', auth, (req, res) => {
  const user = users.find((u) => u.id === req.user.sub);

  const totalBalance = wallets
    .filter((w) => w.userId === req.user.sub)
    .reduce((sum, wallet) => sum + wallet.balance, 0);

  res.json({
    user: publicUser(user),
    stats: {
      totalBalance,
      income: 2500,
      expenses: 4230.5,
      pending: 1230,
    },
    wallets,
    beneficiaries,
    transactions,
    chart,
  });
});

app.post('/api/transfers', auth, (req, res) => {
  const body = z
    .object({
      fromWalletId: z.string(),
      to: z.string().min(2),
      amount: z.number().positive(),
      description: z.string().optional(),
    })
    .safeParse(req.body);

  if (!body.success) {
    return res.status(400).json({
      message: 'Invalid transfer request',
    });
  }

  const wallet = wallets.find(
    (w) =>
      w.id === body.data.fromWalletId &&
      w.userId === req.user.sub
  );

  if (!wallet) {
    return res.status(404).json({
      message: 'Wallet not found',
    });
  }

  if (wallet.balance < body.data.amount) {
    return res.status(409).json({
      message: 'Insufficient funds',
    });
  }

  wallet.balance -= body.data.amount;

  const txn = {
    id: `txn_${Date.now()}`,
    date: new Date().toISOString().slice(0, 10),
    description:
      body.data.description ||
      `Money Transfer to ${body.data.to}`,
    type: 'Transfer',
    amount: -body.data.amount,
    status: 'Completed',
  };

  transactions.unshift(txn);

  transferTotal.inc();res.status(201).json({
    transaction: txn,
    wallet,
  });
});

export default app;
