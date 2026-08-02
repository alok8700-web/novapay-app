import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('backend exposes required NovaPay API routes', async () => {
  const appSource = await readFile(new URL('../src/app.js', import.meta.url), 'utf8');
  for (const route of ['/api/health', '/api/auth/login', '/api/auth/register', '/api/dashboard', '/api/transfers']) {
    assert.match(appSource, new RegExp(route.replaceAll('/', '\\/')));
  }
});

test('backend protects dashboard and transfer APIs with auth middleware', async () => {
  const appSource = await readFile(new URL('../src/app.js', import.meta.url), 'utf8');
  assert.match(appSource, /app\.get\('\/api\/dashboard', auth,/);
  assert.match(appSource, /app\.post\('\/api\/transfers', auth,/);
});
