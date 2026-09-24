// Kiểm tra kỹ thuật SEO/GEO cho thư mục site/: node build/check.mjs [--external]
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
const checkExternal = process.argv.includes('--external');

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const files = (await walk(OUT)).filter((f) => f.endsWith('.html') && !f.endsWith('404.html'));
const pages = {};
for (const f of files) {
  const rel = '/' + relative(OUT, f).replace(/\\/g, '/').replace(/index\.html$/, '');
  pages[rel] = await readFile(f, 'utf8');
}

const problems = [];
const externals = new Set();
const rows = [];
const text = (s) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();

for (const [path, html] of Object.entries(pages)) {
  const fail = (m) => problems.push(`${path}: ${m}`);
  const title = text(html.match(/<title>(.*?)<\/title>/)?.[1] || '');
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] || '';
  const h1s = html.match(/<h1[\s>]/g) || [];
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);

  if (!/<html lang="vi">/.test(html)) fail('thiếu lang="vi"');
  if (!/name="viewport"/.test(html)) fail('thiếu meta viewport');
  if (!/rel="canonical"/.test(html)) fail('thiếu canonical');
  if (h1s.length !== 1) fail(`có ${h1s.length} thẻ h1 (cần đúng 1)`);
  if (title.length > 75) fail(`title dài ${title.length} ký tự`);
  if (desc.length < 70 || desc.length > 170) fail(`meta description ${desc.length} ký tự (nên 70–170)`);
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dup.length) fail(`id trùng: ${[...new Set(dup)].join(', ')}`);
  if (/\{\{/.test(html)) fail('còn placeholder {{...}} chưa thay');

  // JSON-LD
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!blocks.length) fail('không có JSON-LD');
  const types = [];
  let faqCount = 0;
  for (const [, raw] of blocks) {
    try {
      const data = JSON.parse(raw);
      for (const node of data['@graph'] || [data]) {
        types.push(node['@type']);
        const qs = node.mainEntity && Array.isArray(node.mainEntity) ? node.mainEntity : [];
        for (const q of qs) {
          faqCount++;
          // Câu hỏi trong schema phải hiển thị trên trang (yêu cầu của Google).
          if (!text(html).includes(q.name)) fail(`câu hỏi FAQ không hiển thị trên trang: ${q.name}`);
        }
        if (node['@type'] === 'TechArticle') {
          for (const k of ['headline', 'author', 'datePublished', 'dateModified', 'about', 'citation']) if (!node[k]) fail(`TechArticle thiếu ${k}`);
        }
      }
    } catch (e) {
      fail(`JSON-LD lỗi cú pháp: ${e.message}`);
    }
  }

  // Liên kết nội bộ và anchor
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (/^https?:/.test(href)) {
      if (!href.startsWith('https://example.com')) externals.add(href);
      continue;
    }
    if (href.startsWith('#')) {
      if (!ids.includes(href.slice(1))) fail(`anchor không tồn tại: ${href}`);
      continue;
    }
    if (href.startsWith('/')) fail(`link nội bộ tuyệt đối (cần tương đối): ${href}`);
    const resolved = new URL(href, `http://site${path}`);
    const p = resolved.pathname;
    const hash = resolved.hash.slice(1);
    if (['/favicon.svg', '/sitemap.xml', '/llms.txt'].includes(p)) continue;
    if (!(p in pages)) {
      fail(`liên kết nội bộ hỏng: ${href}`);
      continue;
    }
    if (hash && !pages[p].includes(`id="${hash}"`)) fail(`anchor hỏng: ${href}`);
  }

  const bytes = Buffer.byteLength(html);
  rows.push({
    trang: path,
    'KB': (bytes / 1024).toFixed(1),
    'title': title.length,
    'desc': desc.length,
    'bảng': (html.match(/<table/g) || []).length,
    'nguồn': (html.match(/id="src-\d+"/g) || []).length,
    'FAQ': faqCount,
    'schema': [...new Set(types)].join(','),
  });
}

for (const f of ['robots.txt', 'sitemap.xml', 'llms.txt']) {
  try {
    await stat(join(OUT, f));
  } catch {
    problems.push(`thiếu ${f}`);
  }
}

console.table(rows);

if (checkExternal) {
  console.log(`\nKiểm tra ${externals.size} liên kết ngoài...`);
  await Promise.all(
    [...externals].map(async (u) => {
      try {
        const r = await fetch(u, { method: 'GET', redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 link-check' }, signal: AbortSignal.timeout(20000) });
        if (r.status >= 400) problems.push(`liên kết ngoài lỗi ${r.status}: ${u}`);
      } catch (e) {
        problems.push(`không truy cập được: ${u} (${e.cause?.code || e.message})`);
      }
    })
  );
}

if (problems.length) {
  console.log(`\n${problems.length} vấn đề:`);
  for (const p of problems) console.log(' - ' + p);
  process.exit(1);
}
console.log('\nKhông phát hiện vấn đề.');
