import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildEnquiryMessage } from '../src/enquiry.mjs';
const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url)));
const headers = Object.fromEntries(config.headers[0].headers.map(({key,value})=>[key,value]));
test('production policy blocks inline scripts, plugins, framing and native form posts', () => {
  const csp = headers['Content-Security-Policy'];
  for (const rule of ["default-src 'none'", "script-src 'self'", "script-src-attr 'none'", "object-src 'none'", "base-uri 'none'", "form-action 'none'", "frame-ancestors 'none'"]) assert.ok(csp.split('; ').includes(rule), rule);
  assert.ok(!csp.includes('unsafe-eval'));
  assert.equal(headers['X-Content-Type-Options'], 'nosniff');
  assert.equal(headers['X-Frame-Options'], 'DENY');
});
test('enquiry contains untrusted text only inside an encoded fixed-origin URL', () => {
  const fd = new FormData();
  fd.set('name', 'A\nService: injected\u202e');
  fd.set('message', '<script>alert(1)</script>&text=https://evil.example#fragment');
  const message = buildEnquiryMessage(fd);
  assert.equal(message.split('\n').length, 8);
  assert.ok(!message.includes('\u202e'));
  const url = new URL(`https://wa.me/97125511925?text=${encodeURIComponent(message)}`);
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.searchParams.size, 1);
  assert.equal(url.searchParams.get('text'), message);
  assert.equal(url.hash, '');
});
test('oversized and missing fields remain bounded and safe', () => {
  const fd = new FormData(); fd.set('message', 'x'.repeat(100000));
  const message = buildEnquiryMessage(fd);
  assert.ok(message.length < 2200);
  assert.ok(!message.includes('null'));
});
