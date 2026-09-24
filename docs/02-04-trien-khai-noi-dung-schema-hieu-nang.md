# 2–4. Triển khai nội dung, Schema Markup, tốc độ và giao diện

Cơ sở lý thuyết: nghiên cứu *GEO: Generative Engine Optimization* (Aggarwal et al., KDD 2024, [arXiv:2311.09735](https://arxiv.org/abs/2311.09735)) cho thấy các kỹ thuật như trích dẫn nguồn, thêm trích dẫn nguyên văn và thêm số liệu có thể tăng mức hiển thị trong câu trả lời của generative engine tới 40%. Google cho biết không có yêu cầu hay markup đặc biệt nào để xuất hiện trong AI Overviews / AI Mode ngoài các nguyên tắc SEO nền tảng ([Google Search Central – AI features](https://developers.google.com/search/docs/appearance/ai-features)). Vì vậy website tập trung vào nội dung đáng tin cậy, cấu trúc rõ ràng và kỹ thuật chuẩn.

## 2. Nội dung chất lượng cao, có dẫn nguồn, trình bày có cấu trúc

| Kỹ thuật | Cách triển khai trên site | Vị trí |
|---|---|---|
| Trả lời trước (answer-first) | Hộp “Trả lời nhanh” 3–4 gạch đầu dòng ở đầu mỗi trang; câu đầu mỗi mục là định nghĩa trực tiếp | Mọi trang |
| Tiêu đề dạng câu hỏi | `<h2>` viết giống câu người dùng hỏi AI | Mọi trang |
| Dẫn nguồn uy tín | Chú thích `[n]` nối tới danh sách “Nguồn tham khảo”; 15 nguồn: sách gốc (Inmon 1992, Kimball & Ross 2013, Linstedt 2015), bài báo (Devlin & Murphy 1988, CIDR 2021), tài liệu chính thức AWS, Microsoft Learn, Databricks, Kimball Group | `build/sources.mjs` |
| Trích dẫn nguyên văn | Định nghĩa gốc của Inmon trong `<blockquote>` | Trang chủ |
| Bảng so sánh | 14 bảng có `<caption>`, `<th scope>` | Mọi bài viết |
| Bullet points / danh sách có thứ tự | Lợi ích, bước triển khai, tiêu chí chọn | Mọi bài viết |
| Định nghĩa thuật ngữ | `<dfn>`, `<dl>`, trang Thuật ngữ 22 mục | `/thuat-ngu/` |
| Mục lục + anchor | Tự sinh từ các `<h2>`, mỗi mục có `id` để AI trích dẫn đúng đoạn | Mọi bài viết |
| Liên kết nội bộ | “Bài liên quan”, liên kết trong văn bản | Mọi trang |
| Tín hiệu E-E-A-T | Tác giả, ngày cập nhật, trang Giới thiệu + chính sách biên tập + tiêu chuẩn nguồn | `/gioi-thieu/` |
| Không bịa số liệu | Không dùng số liệu thị trường không có nguồn | Toàn site |

Kiểm chứng nguồn: tất cả URL nguồn đã được truy cập và đối chiếu nội dung ngày 24/09/2026. Chạy `npm run check:external` để kiểm tra lại liên kết ngoài.

## 3. Schema Markup (JSON-LD)

Mỗi trang có một khối `<script type="application/ld+json">` dạng `@graph`, các thực thể liên kết bằng `@id`:

| Thực thể | Dùng ở | Mục đích cho AI |
|---|---|---|
| `WebSite` | Mọi trang | Xác định website, ngôn ngữ, nhà xuất bản |
| `Person` (tác giả) | Mọi trang | Tác giả chịu trách nhiệm nội dung, `knowsAbout` |
| `WebPage` / `AboutPage` / `CollectionPage` / `FAQPage` | Theo loại trang | Loại trang, ngày xuất bản/cập nhật |
| `TechArticle` | 6 bài viết | `headline`, `author`, `datePublished`, `dateModified`, `about`, `mentions`, `citation` |
| `about` / `mentions` → `Thing` + `sameAs` Wikipedia | Bài viết | Gắn khái niệm trên trang với thực thể đã biết (entity linking) |
| `citation` → `Book` / `ScholarlyArticle` / `WebPage` | Bài viết | Khai báo máy đọc được các nguồn đã trích |
| `FAQPage` → `Question` / `Answer` | 6 bài viết + trang FAQ | Cặp hỏi–đáp; mọi câu hỏi đều hiển thị trên trang |
| `DefinedTermSet` → `DefinedTerm` | Trang Thuật ngữ | Từ điển thuật ngữ máy đọc được |
| `BreadcrumbList` | Mọi trang | Quan hệ phân cấp giữa các trang |

Lưu ý: từ 08/2023 Google chỉ hiển thị rich result FAQ cho một số website chính phủ và y tế uy tín ([Google Search Central Blog](https://developers.google.com/search/blog/2023/08/howto-faq-changes)); site vẫn dùng `FAQPage` vì schema giúp máy hiểu cấu trúc hỏi–đáp, không nhằm mục đích rich result.

File hỗ trợ crawler:

- `robots.txt`: cho phép mọi crawler, liệt kê rõ GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, Bingbot…; khai báo sitemap.
- `sitemap.xml`: 9 URL có `lastmod`.
- `llms.txt`: tóm tắt site theo đề xuất [llmstxt.org](https://llmstxt.org/). Đây là đề xuất cộng đồng, Google không yêu cầu file này.

## 4. Tốc độ tải trang và giao diện đa thiết bị

| Kỹ thuật | Chi tiết |
|---|---|
| HTML tĩnh, không JavaScript | 0 byte JS; nội dung có sẵn trong HTML nên mọi crawler AI (kể cả crawler không chạy JS) đọc được đầy đủ |
| CSS inline, đã rút gọn | Không có request CSS chặn render; header dính, hero gradient, mục lục sidebar dính (desktop), nội dung dạng card |
| Không web font, không ảnh raster | Dùng font hệ thống Arial; sơ đồ bằng SVG inline |
| Dung lượng nhỏ | 23–48 KB mỗi trang trước nén (đã gồm CSS và JSON-LD) (xem `npm run check`) |
| Responsive | `meta viewport`, bố cục 1 cột max 860px, lề 16px, bảng cuộn ngang trong `.table-wrap`, cỡ chữ giảm ở màn < 600px |
| Dark mode | `prefers-color-scheme: dark` |
| Accessibility | `lang="vi"`, skip link, `aria-current`, `<caption>`, `scope`, SVG có `<title>`/`<desc>`, focus rõ |
| Cache | `_headers` cho Netlify / Cloudflare Pages |

Đo thực tế sau khi deploy: chạy PageSpeed Insights (Mobile và Desktop) cho trang chủ và 1 bài viết, chụp màn hình kết quả đưa vào báo cáo. Chưa có số đo vì site chưa deploy.
