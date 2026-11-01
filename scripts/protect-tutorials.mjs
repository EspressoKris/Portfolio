// Encrypt every built tutorial page with StatiCrypt so readers need a password.
// Runs after `astro build` (see the "build" script in package.json).
//
// Password: the TUTORIALS_PASSWORD environment variable (a GitHub Actions secret in CI).
// - In CI a missing password stops the build, so tutorials are never published unprotected.
// - Locally a missing password just skips encryption (handy for previewing).
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const DIR = 'dist/tutorials';
// Not secret. Kept fixed so "remember me" keeps working across deploys.
const SALT = 'bbbfbc518abab6a1862e0409f8de1444';
const password = process.env.TUTORIALS_PASSWORD;
const inCI = Boolean(process.env.CI);
// In GitHub Actions, '::error::' lines show up as public annotations on the run.
const fail = (msg) => { console.error(inCI ? `::error title=protect-tutorials::${msg}` : msg); process.exit(1); };

if (!existsSync(DIR)) {
  const msg = `protect-tutorials: ${DIR} not found (tutorials repo not checked out?)`;
  if (inCI) fail(msg);
  console.warn(`${msg}; skipping.`);
  process.exit(0);
}

if (!password) {
  if (inCI) fail('TUTORIALS_PASSWORD is not set (add it under Settings → Secrets and variables → Actions); refusing to publish unprotected tutorials.');
  console.warn('protect-tutorials: TUTORIALS_PASSWORD not set; tutorials left unencrypted (local build only).');
  process.exit(0);
}

const args = [
  // StatiCrypt keeps the input folder name, so writing to dist/ overwrites dist/tutorials/ in place
  'staticrypt', DIR, '-r', '-d', 'dist',
  '--salt', SALT, '-c', 'false', '--short',
  '--remember', '30',
  '--template-title', 'Tutorials',
  '--template-instructions', 'These tutorials are password protected. Enter the password to read them.',
  '--template-button', 'Unlock',
  '--template-placeholder', 'Password',
  '--template-remember', 'Remember me on this device for 30 days',
  '--template-error', 'Wrong password, please try again.',
  '--template-color-primary', '#0b4f74',
  '--template-color-secondary', '#f5f7fa',
];
const res = spawnSync('npx', args, { stdio: 'inherit', env: { ...process.env, STATICRYPT_PASSWORD: password } });
if (res.status !== 0) fail(`StatiCrypt failed with exit code ${res.status}`);
console.log('protect-tutorials: tutorial pages encrypted.');
