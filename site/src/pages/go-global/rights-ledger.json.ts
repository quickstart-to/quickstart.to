import ledger from '../../../../topics/go-global/assets/rights-ledger.json?raw';

// A filled teaching record; no licenses, signatures or private materials are bundled.
export function GET() {
  return new Response(ledger, { headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Disposition': 'attachment; filename="rights-ledger-r01.json"',
  } });
}
