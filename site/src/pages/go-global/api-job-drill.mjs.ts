import source from '../../../../topics/go-global/assets/api-job-drill.mjs?raw';

// Fixed-output provider and synthetic accounts; all requests stay on loopback.
export function GET() {
  return new Response(source, { headers: { 'Content-Type': 'text/javascript; charset=utf-8' } });
}
