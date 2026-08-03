import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import app from './app.js';

const port = Number(process.env.PORT ?? 4000);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(publicDir));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(publicDir, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`NovaPay API listening on ${port}`);
});
