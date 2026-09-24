# Kho Dữ Liệu Việt — Website kiến thức Data Warehouse tối ưu GEO

Website tĩnh tiếng Việt về Data Warehouse, Data Mart, Data Lakehouse, ETL/ELT và mô hình hóa dữ liệu, tối ưu cho việc được các công cụ AI Search (Perplexity, Gemini, Copilot, ChatGPT Search) trích dẫn.

## Cấu trúc

```
build/
  config.mjs        Domain, tên site, tác giả, ngày cập nhật
  sources.mjs       Danh mục nguồn tham khảo + thực thể (sameAs Wikipedia)
  pages/*.mjs       Nội dung từng trang (tóm tắt, thân bài, FAQ)
  build.mjs         Sinh HTML + JSON-LD + sitemap + robots + llms.txt vào site/
  check.mjs         Kiểm tra title, description, h1, canonical, JSON-LD, link, anchor
assets/             CSS (được inline khi build), favicon, _headers
site/               KẾT QUẢ BUILD — thư mục để deploy
docs/               Tài liệu theo checklist bài tập (1 → 5)
```

## Trang

| URL | Nội dung |
|---|---|
| `/` | Data Warehouse là gì |
| `/data-warehouse-vs-data-lake-vs-lakehouse/` | So sánh DW, Data Lake, Lakehouse |
| `/kimball-vs-inmon/` | Kimball, Inmon, Data Vault |
| `/data-mart-la-gi/` | Data Mart |
| `/etl-vs-elt/` | ETL, ELT, Reverse ETL |
| `/star-schema-snowflake-schema/` | Fact, dimension, star/snowflake, SCD |
| `/faq/` | 23 câu hỏi thường gặp |
| `/thuat-ngu/` | 22 thuật ngữ Anh – Việt |
| `/gioi-thieu/` | Tác giả, chính sách biên tập |

## Build và xem thử

Yêu cầu Node.js ≥ 18, không cần cài package.

```bash
# PowerShell
$env:SITE_URL="https://ten-mien-cua-ban"; $env:AUTHOR_NAME="Họ Tên"; $env:AUTHOR_URL="https://linkedin.com/in/..."; npm run build
# Bash
SITE_URL=https://ten-mien-cua-ban AUTHOR_NAME="Họ Tên" npm run build

npm run check            # kiểm tra kỹ thuật
npm run check:external   # kiểm tra thêm liên kết ngoài
npm run serve            # xem tại http://localhost:8080
```

Có thể sửa trực tiếp giá trị mặc định trong `build/config.mjs` thay vì dùng biến môi trường. **Bắt buộc thay domain và tên tác giả trước khi deploy** — canonical, sitemap và JSON-LD phụ thuộc vào `SITE_URL`.

## Deploy

Mọi link nội bộ là **đường dẫn tương đối** (`./`, `../`), nên site chạy đúng cả ở root domain lẫn dưới thư mục con. Chỉ cần đặt `SITE_URL` đúng (dùng cho canonical, sitemap, JSON-LD và trang 404).

- **GitHub Pages** (`https://<user>.github.io/<repo>/`): workflow [.github/workflows/main.yml](.github/workflows/main.yml) tự build với `SITE_URL=https://<user>.github.io/<repo>` và deploy thư mục `site/` khi push lên `main`. Trong Settings → Pages chọn Source = **GitHub Actions**.
- **Netlify / Cloudflare Pages / Vercel:** build command `npm run build`, output `site`, đặt biến `SITE_URL`.

## Checklist bài tập

| # | Yêu cầu | Tài liệu / vị trí |
|---|---|---|
| 1 | Nghiên cứu từ khóa và FAQ | [docs/01-nghien-cuu-tu-khoa-va-faq.md](docs/01-nghien-cuu-tu-khoa-va-faq.md) |
| 2 | Nội dung chất lượng, dẫn nguồn, bullet/table | [docs/02-04-...md](docs/02-04-trien-khai-noi-dung-schema-hieu-nang.md) § 2, `build/pages/` |
| 3 | Schema Markup | [docs/02-04-...md](docs/02-04-trien-khai-noi-dung-schema-hieu-nang.md) § 3, `build/build.mjs` |
| 4 | Tốc độ và responsive | [docs/02-04-...md](docs/02-04-trien-khai-noi-dung-schema-hieu-nang.md) § 4, `assets/style.css` |
| 5 | Kiểm tra trên AI Search và điều chỉnh | [docs/05-kiem-tra-ai-search.md](docs/05-kiem-tra-ai-search.md), [docs/ai-visibility-log.csv](docs/ai-visibility-log.csv) |

## Việc còn phải làm (cần thao tác thủ công)

1. Điền tên tác giả, domain → build lại.
2. Deploy; khai báo Google Search Console và Bing Webmaster Tools, gửi sitemap.
3. Chạy Rich Results Test, Schema Markup Validator, PageSpeed Insights; chụp kết quả.
4. Điền lượng tìm kiếm từ Google Keyword Planner vào docs/01.
5. Sau khi được index: chạy bộ prompt ở docs/05 trên các AI engine, ghi log, điều chỉnh nội dung, test vòng 2.
