import model from '../../../../topics/go-global/assets/measurement-model.mjs?raw';
import drill from '../../../../topics/go-global/assets/measurement-drill.mjs?raw';
export function GET() {
  const standalone = drill.replace(/^#!.*\n/, '').replace(/^import .* from '\.\/measurement-model\.mjs';\n/m, '');
  return new Response(model + '\n' + standalone, { headers: { 'Content-Type': 'text/javascript; charset=utf-8' } });
}
