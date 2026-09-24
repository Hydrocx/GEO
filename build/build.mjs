// Generator tĩnh không phụ thuộc thư viện ngoài: node build/build.mjs
// Kết quả nằm trong thư mục site/ — deploy thư mục này lên bất kỳ static host nào.
import { mkdir, writeFile, readFile, rm, cp } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, AUTHOR } from './config.mjs';
import { SOURCES, ENTITIES } from './sources.mjs';
import home from './pages/home.mjs';
import dwVsLake from './pages/dw-vs-lake.mjs';
import kimballInmon from './pages/kimball-inmon.mjs';
import dataMart from './pages/data-mart.mjs';
import etlElt from './pages/etl-elt.mjs';
import starSchema from './pages/star-schema.mjs';
import faq from './pages/faq.mjs';
import glossary, { TERMS } from './pages/glossary.mjs';
import about from './pages/about.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'site');
const PAGES = [home, dwVsLake, kimballInmon, dataMart, etlElt, starSchema, faq, glossary, about];
const BASE_PATH = process.env.BASE_PATH || ''; // Ví dụ: '/repo-name' cho GitHub Pages project repo

const NAV = [
  ['', 'DW là gì'],
  ['data-warehouse-vs-data-lake-vs-lakehouse/', 'DW vs Lake'],
  ['kimball-vs-inmon/', 'Kimball vs Inmon'],
  ['data-mart-la-gi/', 'Data Mart'],
  ['etl-vs-elt/', 'ETL vs ELT'],
  ['star-schema-snowflake-schema/', 'Star schema'],
  ['faq/', 'FAQ'],
  ['thuat-ngu/', 'Thuật ngữ'],
];

const AUTHOR_ID = `${SITE.url}/gioi-thieu/#author`;
const WEBSITE_ID = `${SITE.url}/#website`;
const pageUrl = (p) => `${SITE.url}/${p.slug}`;
const bySlug = Object.fromEntries(PAGES.map((p) => [p.slug, p]));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const stripTags = (html) =>
  html
    .replace(/<sup class="cite">.*?<\/sup>/g, '')
    .replace(/\{\{cite:\w+\}\}/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
const jsonLd = (obj) => JSON.stringify(obj, null, 2).replace(/<\//g, '<\\/');

function formatSource(s) {
  const who = `${esc(s.author)}${s.year ? ` (${s.year})` : ''}. `;
  const title = s.type === 'Book' ? `<cite>${esc(s.title)}</cite>` : `“${esc(s.title)}”`;
  const link = s.url ? ` <a href="${esc(s.url)}" rel="noopener" target="_blank">${esc(new URL(s.url).hostname)}</a>` : '';
  return `${who}${title}. ${esc(s.publisher)}.${link}`;
}

// Thay {{cite:key}} bằng chỉ mục [n] theo thứ tự xuất hiện đầu tiên trong trang.
function makeCiter() {
  const order = [];
  const cite = (html) =>
    html.replace(/\{\{cite:(\w+)\}\}/g, (_, key) => {
      if (!SOURCES[key]) throw new Error(`Nguồn không tồn tại: ${key}`);
      if (!order.includes(key)) order.push(key);
      const n = order.indexOf(key) + 1;
      return `<sup class="cite"><a href="#src-${n}" aria-label="Nguồn ${n}">[${n}]</a></sup>`;
    });
  return { cite, order };
}

function entity(key) {
  const e = ENTITIES[key];
  const out = { '@type': e.type || 'Thing', name: e.name, sameAs: e.sameAs };
  if (e.alt && e.alt !== e.name) out.alternateName = e.alt;
  return out;
}

function sourceSchema(key) {
  const s = SOURCES[key];
  const out = { '@type': s.type, name: s.title, author: { '@type': s.type === 'WebPage' ? 'Organization' : 'Person', name: s.author } };
  if (s.year) out.datePublished = String(s.year);
  if (s.url) out.url = s.url;
  if (s.publisher) out.publisher = { '@type': 'Organization', name: s.publisher };
  return out;
}

function breadcrumbs(p) {
  const items = [{ name: 'Trang chủ', url: `${SITE.url}/` }];
  if (p.slug) items.push({ name: p.h1, url: pageUrl(p) });
  return items;
}

function faqItems(p) {
  if (!p.aggregateFaqs) return p.faqs;
  return PAGES.filter((x) => x !== p).flatMap((x) => x.faqs);
}

function buildSchema(p, citeOrder) {
  const url = pageUrl(p);
  const graph = [
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: `${SITE.url}/`,
      name: SITE.name,
      description: SITE.tagline,
      inLanguage: SITE.lang,
      publisher: { '@id': AUTHOR_ID },
    },
    {
      '@type': 'Person',
      '@id': AUTHOR_ID,
      name: AUTHOR.name,
      jobTitle: AUTHOR.jobTitle,
      url: `${SITE.url}/gioi-thieu/`,
      ...(AUTHOR.url ? { sameAs: [AUTHOR.url] } : {}),
      knowsAbout: ['Data warehouse', 'Data modeling', 'ETL', 'Business intelligence'],
    },
  ];

  const pageType = { AboutPage: 'AboutPage', FAQPage: 'FAQPage', Glossary: 'CollectionPage' }[p.type] || 'WebPage';
  const webpage = {
    '@type': pageType,
    '@id': `${url}#webpage`,
    url,
    name: p.title,
    description: p.description,
    inLanguage: SITE.lang,
    isPartOf: { '@id': WEBSITE_ID },
    datePublished: SITE.published,
    dateModified: SITE.modified,
    breadcrumb: { '@id': `${url}#breadcrumb` },
    about: p.about.map(entity),
  };
  graph.push(webpage);

  if (p.type === 'TechArticle') {
    graph.push({
      '@type': 'TechArticle',
      '@id': `${url}#article`,
      headline: p.h1,
      description: p.description,
      inLanguage: SITE.lang,
      author: { '@id': AUTHOR_ID },
      publisher: { '@id': AUTHOR_ID },
      datePublished: SITE.published,
      dateModified: SITE.modified,
      mainEntityOfPage: { '@id': `${url}#webpage` },
      isPartOf: { '@id': WEBSITE_ID },
      about: p.about.map(entity),
      mentions: p.mentions.map(entity),
      citation: citeOrder.map(sourceSchema),
      proficiencyLevel: 'Beginner',
    });
  }

  const faqs = faqItems(p);
  if (faqs.length) {
    const mainEntity = faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: stripTags(f.a) },
    }));
    if (p.type === 'FAQPage') webpage.mainEntity = mainEntity;
    else graph.push({ '@type': 'FAQPage', '@id': `${url}#faq`, isPartOf: { '@id': `${url}#webpage` }, mainEntity });
  }

  if (p.type === 'Glossary') {
    const setId = `${url}#terms`;
    graph.push({
      '@type': 'DefinedTermSet',
      '@id': setId,
      name: 'Thuật ngữ Data Warehouse',
      inLanguage: SITE.lang,
      hasDefinedTerm: TERMS.map((t) => ({
        '@type': 'DefinedTerm',
        '@id': `${url}#${t.id}`,
        name: t.term,
        description: t.def,
        url: `${url}#${t.id}`,
        inDefinedTermSet: { '@id': setId },
      })),
    });
    webpage.mainEntity = { '@id': setId };
  }

  graph.push({
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: breadcrumbs(p).map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: b.url })),
  });

  return { '@context': 'https://schema.org', '@graph': graph };
}

const LOGO = `<svg class="logo" viewBox="0 0 32 32" width="30" height="30" aria-hidden="true"><rect width="32" height="32" rx="8" fill="#000080"/><ellipse cx="16" cy="9" rx="9" ry="3.5" fill="#1fba00"/><path d="M7 9v14c0 1.9 4 3.5 9 3.5s9-1.6 9-3.5V9" fill="none" stroke="#fff" stroke-width="2"/><path d="M7 16c0 1.9 4 3.5 9 3.5s9-1.6 9-3.5" fill="none" stroke="#5cb3ff" stroke-width="2"/></svg>`;
const KICKER = { TechArticle: 'Bài viết kiến thức', FAQPage: 'Hỏi đáp', Glossary: 'Từ điển thuật ngữ', AboutPage: 'Về website' };
const navLabel = (slug) => (NAV.find(([s]) => s === slug) || [, 'Bài viết'])[1];
const firstSentence = (s) => s.split(/(?<=[.!?])\s/)[0];

function toc(body) {
  const items = [...body.matchAll(/<section id="([^"]+)"[^>]*>\s*<h2>(.*?)<\/h2>/g)];
  if (items.length < 3) return '';
  return `<nav class="toc" aria-label="Mục lục"><details open><summary>Mục lục</summary><ol>${items
    .map(([, id, h]) => `<li><a href="#${id}">${h}</a></li>`)
    .join('')}</ol></details></nav>`;
}

const card = (x) => `<a class="card" href="/${x.slug}"><span class="card-kicker">${esc(navLabel(x.slug))}</span><strong>${esc(x.h1)}</strong><span class="card-desc">${esc(firstSentence(x.description))}</span><span class="card-go" aria-hidden="true">Đọc bài →</span></a>`;

function topicsHtml(p) {
  if (p.slug !== '') return '';
  const items = PAGES.filter((x) => x.type === 'TechArticle' && x !== p);
  return `<section id="chu-de" class="topics">
  <h2>Chủ đề chính</h2>
  <div class="cards">${items.map(card).join('')}</div>
</section>`;
}

const qa = (f, cite) => `<div class="qa"><h3>${esc(f.q)}</h3><p>${cite(f.a)}</p></div>`;

function faqHtml(p, cite) {
  if (p.aggregateFaqs) {
    return PAGES.filter((x) => x !== p && x.faqs.length)
      .map(
        (x) => `<section id="faq-${x.slug.replace(/\/$/, '') || 'data-warehouse'}" class="faq">
  <h2>${esc(x.h1)}</h2>
  ${x.faqs.map((f) => qa(f, cite)).join('\n  ')}
  <p class="more"><a href="/${x.slug}">Đọc bài chi tiết →</a></p>
</section>`
      )
      .join('\n');
  }
  if (!p.faqs.length) return '';
  return `<section id="cau-hoi-thuong-gap" class="faq">
  <h2>Câu hỏi thường gặp</h2>
  ${p.faqs.map((f) => qa(f, cite)).join('\n  ')}
</section>`;
}

function render(p, css) {
  const { cite, order } = makeCiter();
  const summary = p.summary.map((s) => `<li>${cite(s)}</li>`).join('\n      ');
  const body = cite(p.body)
    .replaceAll('{{AUTHOR_NAME}}', esc(AUTHOR.name))
    .replaceAll('{{AUTHOR_LINK}}', AUTHOR.url ? ` (<a href="${esc(AUTHOR.url)}" rel="author noopener">hồ sơ</a>)` : '');
  const faqs = faqHtml(p, cite);
  const sources = order.length
    ? `<section id="nguon-tham-khao" class="sources">
  <h2>Nguồn tham khảo</h2>
  <ol>${order.map((k, i) => `\n    <li id="src-${i + 1}">${formatSource(SOURCES[k])}</li>`).join('')}
  </ol>
</section>`
    : '';
  const relatedPages = (p.related || []).filter((s) => bySlug[s] && s !== p.slug).map((s) => bySlug[s]);
  const related = relatedPages.length
    ? `<section class="related" id="bai-lien-quan"><h2>Bài liên quan</h2><div class="cards">${relatedPages.map(card).join('')}</div></section>`
    : '';
  const tocSource =
    p.body +
    (faqs && !p.aggregateFaqs ? '<section id="cau-hoi-thuong-gap"><h2>Câu hỏi thường gặp</h2></section>' : '') +
    (p.aggregateFaqs ? faqs : '') +
    (sources ? '<section id="nguon-tham-khao"><h2>Nguồn tham khảo</h2></section>' : '');
  const tocHtml = toc(tocSource);
  const words = stripTags(body + faqs).split(' ').length;
  const minutes = Math.max(1, Math.round(words / 200));
  const url = pageUrl(p);
  const crumbs = breadcrumbs(p);
  const nav = NAV.map(
    ([slug, label]) => `<a href="/${slug}"${slug === p.slug ? ' aria-current="page"' : ''}>${label}</a>`
  ).join('');
  const dateVi = (d) => d.split('-').reverse().join('/');
  const topicLinks = PAGES.filter((x) => x.type === 'TechArticle')
    .map((x) => `<li><a href="/${x.slug}">${esc(navLabel(x.slug))}</a></li>`)
    .join('');

  return `<!doctype html>
<html lang="${SITE.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)} | ${esc(SITE.name)}</title>
<meta name="description" content="${esc(p.description)}">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
<meta name="author" content="${esc(AUTHOR.name)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="${p.type === 'TechArticle' ? 'article' : 'website'}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:locale" content="${SITE.locale}">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${url}">
${p.type === 'TechArticle' ? `<meta property="article:published_time" content="${SITE.published}">\n<meta property="article:modified_time" content="${SITE.modified}">\n` : ''}<meta name="twitter:card" content="summary">
<meta name="theme-color" content="#000080">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="sitemap" type="application/xml" href="/sitemap.xml">
<style>${css}</style>
<script type="application/ld+json">
${jsonLd(buildSchema(p, order))}
</script>
</head>
<body>
<a class="skip" href="#noi-dung">Bỏ qua tới nội dung</a>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="/">${LOGO}<span>Kho Dữ Liệu <b>Việt</b></span></a>
    <nav class="main-nav" aria-label="Điều hướng chính">${nav}</nav>
  </div>
</header>
<main id="noi-dung">
<article>
  <header class="hero">
    <div class="wrap">
      <nav class="crumbs" aria-label="Breadcrumb"><ol>${crumbs
        .map((c, i) => (i === crumbs.length - 1 ? `<li aria-current="page">${esc(c.name)}</li>` : `<li><a href="${c.url.replace(SITE.url, '')}">${esc(c.name)}</a></li>`))
        .join('')}</ol></nav>
      <p class="eyebrow">${KICKER[p.type] || 'Bài viết'}</p>
      <h1>${esc(p.h1)}</h1>
      <p class="lede">${esc(p.description)}</p>
      <ul class="meta">
        <li>Tác giả: <a href="/gioi-thieu/" rel="author">${esc(AUTHOR.name)}</a></li>
        <li>Cập nhật: <time datetime="${SITE.modified}">${dateVi(SITE.modified)}</time></li>
        <li>${minutes} phút đọc</li>
        ${order.length ? `<li>${order.length} nguồn tham khảo</li>` : ''}
      </ul>
    </div>
  </header>
  <div class="wrap layout${tocHtml ? ' has-toc' : ''}">
    ${tocHtml ? `<aside class="sidebar">${tocHtml}</aside>` : ''}
    <div class="content">
      <aside class="tldr" aria-label="Trả lời nhanh">
        <h2>Trả lời nhanh</h2>
        <ul>
          ${summary}
        </ul>
      </aside>
      ${topicsHtml(p)}
      ${body}
      ${faqs}
      ${related}
      ${sources}
      <p class="to-top"><a href="#noi-dung">↑ Lên đầu trang</a></p>
    </div>
  </div>
</article>
</main>
<footer class="site-footer">
  <div class="wrap footer-grid">
    <div>
      <a class="brand" href="/">${LOGO}<span>Kho Dữ Liệu <b>Việt</b></span></a>
      <p>${esc(SITE.tagline)}. Nội dung trung lập, mọi khẳng định kỹ thuật đều có dẫn nguồn.</p>
    </div>
    <div>
      <h2>Chủ đề</h2>
      <ul>${topicLinks}</ul>
    </div>
    <div>
      <h2>Tài nguyên</h2>
      <ul><li><a href="/faq/">Câu hỏi thường gặp</a></li><li><a href="/thuat-ngu/">Thuật ngữ</a></li><li><a href="/gioi-thieu/">Giới thiệu &amp; chính sách biên tập</a></li><li><a href="/sitemap.xml">Sitemap</a></li><li><a href="/llms.txt">llms.txt</a></li></ul>
    </div>
  </div>
  <div class="wrap footer-bottom">© ${SITE.published.slice(0, 4)} ${esc(AUTHOR.name)} · Cập nhật ${dateVi(SITE.modified)}</div>
</footer>
</body>
</html>
`;
}

function sitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map((p) => `  <url><loc>${pageUrl(p)}</loc><lastmod>${SITE.modified}</lastmod></url>`).join('\n')}
</urlset>
`;
}

function robots() {
  // Cho phép cả crawler tìm kiếm truyền thống và crawler của các công cụ AI search.
  const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'Perplexity-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot'];
  return `# Cho phép mọi công cụ tìm kiếm và AI search thu thập nội dung
User-agent: *
Allow: /

${aiBots.map((b) => `User-agent: ${b}\nAllow: /`).join('\n\n')}

Sitemap: ${SITE.url}/sitemap.xml
`;
}

function llmsTxt() {
  const line = (p) => `- [${p.h1}](${pageUrl(p)}): ${p.description}`;
  const main = PAGES.filter((p) => p.type === 'TechArticle');
  const other = PAGES.filter((p) => p.type !== 'TechArticle');
  return `# ${SITE.name}

> ${SITE.tagline}. Nội dung trung lập, có dẫn nguồn từ Inmon (1992), Kimball & Ross (2013), CIDR 2021 và tài liệu chính thức của AWS, Microsoft, Databricks. Ngôn ngữ: tiếng Việt. Cập nhật: ${SITE.modified}.

## Bài viết

${main.map(line).join('\n')}

## Tham khảo

${other.map(line).join('\n')}
`;
}

const NOT_FOUND = (css) => `<!doctype html>
<html lang="${SITE.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Không tìm thấy trang | ${esc(SITE.name)}</title><meta name="robots" content="noindex"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><style>${css}</style></head>
<body><main class="wrap"><h1>Không tìm thấy trang</h1><p>Trang bạn tìm không tồn tại. Quay về <a href="/">trang chủ</a> hoặc xem <a href="/faq/">câu hỏi thường gặp</a>.</p></main></body></html>
`;

function applyBasePath(html) {
  if (!BASE_PATH) return html;
  return html.replace(/href="\/(?!\/)/g, `href="${BASE_PATH}/`).replace(/src="\/(?!\/)/g, `src="${BASE_PATH}/`);
}

async function main() {
  const css = (await readFile(join(ROOT, 'assets', 'style.css'), 'utf8')).replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{}:;,>])\s*/g, '$1').trim();
  await rm(OUT, { recursive: true, force: true });
  for (const p of PAGES) {
    const dir = join(OUT, p.slug);
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, 'index.html'), applyBasePath(render(p, css)));
  }
  await writeFile(join(OUT, '404.html'), applyBasePath(NOT_FOUND(css)));
  await writeFile(join(OUT, 'sitemap.xml'), sitemap());
  await writeFile(join(OUT, 'robots.txt'), robots());
  await writeFile(join(OUT, 'llms.txt'), llmsTxt());
  await cp(join(ROOT, 'assets', 'favicon.svg'), join(OUT, 'favicon.svg'));
  await cp(join(ROOT, 'assets', '_headers'), join(OUT, '_headers'));
  console.log(`Đã build ${PAGES.length} trang vào ${OUT} (SITE_URL=${SITE.url}, AUTHOR=${AUTHOR.name}, BASE_PATH=${BASE_PATH})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
