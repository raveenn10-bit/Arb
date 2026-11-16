import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
const config = JSON.parse(readFileSync(new URL('./vercel.json', import.meta.url), 'utf8'));
const headers = Object.fromEntries(config.headers[0].headers.map(({ key, value }) => [key, value]));
export default defineConfig({ build: { sourcemap: false }, preview: { headers } });
