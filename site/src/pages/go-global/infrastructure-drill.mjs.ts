import source from '../../../../topics/go-global/assets/infrastructure-drill.mjs?raw';

// Keep the reproducible exercise with its topic; expose a stable download URL.
export function GET() {
  return new Response(source, { headers: { 'Content-Type': 'text/javascript; charset=utf-8' } });
}
