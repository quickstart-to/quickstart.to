import drill from '../../../../topics/go-global/assets/subscription-recovery-drill.mjs?raw';

export function GET() {
  return new Response(drill, { headers: { 'Content-Type': 'text/javascript; charset=utf-8' } });
}
