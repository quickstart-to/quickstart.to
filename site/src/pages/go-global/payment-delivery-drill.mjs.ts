import model from '../../../../topics/go-global/assets/payment-delivery-model.mjs?raw';
import drill from '../../../../topics/go-global/assets/payment-delivery-drill.mjs?raw';

// Share the exact model used by the article, but deliver a single runnable file.
export function GET() {
  const standalone = drill.replace(/^import .* from '\.\/payment-delivery-model\.mjs';\n/m, '');
  return new Response(`${model}\n${standalone}`, { headers: { 'Content-Type': 'text/javascript; charset=utf-8' } });
}
