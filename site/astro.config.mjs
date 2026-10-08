// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkCitations from './src/lib/remark-citations.mjs';

export default defineConfig({
  site: 'https://quickstart.to',
  // Canonical URLs never carry a trailing slash or a UI-language prefix: /go-global/payments
  trailingSlash: 'never',
  build: { format: 'file' },
  markdown: {
    // unified (remark/rehype) pipeline so we can resolve [^src-id] citations from sources.yaml
    processor: unified({ remarkPlugins: [remarkCitations], smartypants: false }),
  },
});
