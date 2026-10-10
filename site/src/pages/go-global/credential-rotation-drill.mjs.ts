import source from '../../../../topics/go-global/assets/credential-rotation-drill.mjs?raw';

// The exercise creates only synthetic credentials and a loopback HTTP server.
export function GET() {
  return new Response(source, { headers: { 'Content-Type': 'text/javascript; charset=utf-8' } });
}
