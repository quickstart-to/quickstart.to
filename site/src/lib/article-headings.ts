import { parseFragment, type DefaultTreeAdapterMap } from 'parse5';

type Node = DefaultTreeAdapterMap['node'];

/** Include headings authored in HTML media blocks as well as Markdown. */
export function articleHeadings(html: string) {
  const headings: { depth: number; slug: string; text: string }[] = [];
  const text = (node: Node): string => {
    if (node.nodeName === '#text' && 'value' in node) return node.value;
    return 'childNodes' in node ? node.childNodes.map(text).join('') : '';
  };
  const visit = (node: Node) => {
    if ('tagName' in node && node.tagName === 'h2') {
      const slug = node.attrs.find((attribute) => attribute.name === 'id')?.value;
      if (slug && slug !== 'sources-heading') headings.push({ depth: 2, slug, text: text(node).trim() });
    }
    if ('childNodes' in node) node.childNodes.forEach(visit);
  };
  visit(parseFragment(html));
  return headings;
}
