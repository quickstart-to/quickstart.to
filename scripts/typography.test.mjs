import test from 'node:test';
import assert from 'node:assert/strict';
import { htmlSpacingIssues, spacingBoundaries } from './lib/typography.mjs';

test('checks Chinese–Latin and digit boundaries, including accented Latin', () => {
  assert.equal(spacingBoundaries('使用Asana整理3份PDF报告').length, 6);
  assert.equal(spacingBoundaries('使用 Asana 整理 3 份 PDF 报告').length, 0);
  assert.equal(spacingBoundaries('在Café工作').length, 2);
});

test('finds boundaries across inline markup and checks accessible labels', () => {
  const html = '<p>准备<span>14</span>分钟，用<strong>Asana</strong>整理。</p><img alt="CSV示例" src="/CSV示例.png">';
  assert.equal(htmlSpacingIssues(html).length, 5);
  assert.equal(htmlSpacingIssues('<p>准备 <span>14</span> 分钟，用 <strong>Asana</strong> 整理。</p>').length, 0);
});

test('does not join separate blocks or inspect executable and verbatim material', () => {
  const html = '<h2>第一段</h2><p>PDF</p><pre><code>中文API</code></pre><script>const s="中文API"</script><blockquote>原文20天</blockquote><q>原文API</q> <span data-typography="verbatim">精确标识A</span><a href="https://example.com/中文API">https://example.com/中文API</a><p>“原文20天”</p>';
  assert.deepEqual(htmlSpacingIssues(html), []);
});

test('leaves machine attributes and source titles outside the prose check', () => {
  assert.deepEqual(htmlSpacingIssues('<a id="中文API" href="#中文API" data-value="中文API">已加空格的 API</a><section class="sources"><a>原文20天</a></section>'), []);
});

test('checks spaces outside inline code without rewriting its contents', () => {
  assert.equal(htmlSpacingIssues('<p>运行<code>中文API()</code>和<code>test中文API</code>命令</p>').length, 2);
  assert.deepEqual(htmlSpacingIssues('<p>运行 <code>中文API()</code> 和 <code>test中文API</code> 命令</p>'), []);
});
