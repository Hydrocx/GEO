# 5. Kiểm tra khả năng hiển thị trên AI Search và điều chỉnh

> Chỉ thực hiện được **sau khi website đã deploy lên domain công khai** và đã được index. Kết quả phải là số liệu thực tế đo được; ghi vào `docs/ai-visibility-log.csv`.

## 5.1 Chuẩn bị trước khi test

| Việc cần làm | Cách làm | Đã xong |
|---|---|---|
| Deploy site với domain thật | Xem `README.md` → mục Deploy | ☐ |
| Khai báo với Google | Google Search Console → thêm property → gửi `sitemap.xml` → “Kiểm tra URL” → “Yêu cầu lập chỉ mục” cho từng trang | ☐ |
| Khai báo với Bing (nguồn của Copilot và một phần ChatGPT Search) | Bing Webmaster Tools → import từ Search Console → gửi sitemap; bật IndexNow nếu host hỗ trợ | ☐ |
| Kiểm tra schema | [Rich Results Test](https://search.google.com/test/rich-results) và [Schema Markup Validator](https://validator.schema.org/) cho từng URL | ☐ |
| Kiểm tra tốc độ | [PageSpeed Insights](https://pagespeed.web.dev/) — ghi điểm Mobile/Desktop và LCP, CLS, INP | ☐ |
| Kiểm tra index | Tìm `site:<domain>` trên Google và Bing | ☐ |

Thời gian index thường mất từ vài ngày đến vài tuần; nên chờ index xong mới test AI.

## 5.2 Bộ câu hỏi test (prompt)

Chạy mỗi câu trên từng công cụ, **ở cửa sổ ẩn danh / chưa đăng nhập** (hoặc tài khoản mới) để giảm cá nhân hóa.

| ID | Prompt | Trang kỳ vọng được trích |
|---|---|---|
| P01 | Data warehouse là gì? | `/` |
| P02 | Kho dữ liệu có những đặc điểm nào theo Inmon? | `/` |
| P03 | So sánh OLTP và OLAP | `/` |
| P04 | Data warehouse và data lake khác nhau thế nào? | `/data-warehouse-vs-data-lake-vs-lakehouse/` |
| P05 | Data lakehouse là gì, có thay thế data warehouse không? | `/data-warehouse-vs-data-lake-vs-lakehouse/` |
| P06 | Kimball và Inmon khác nhau như thế nào? | `/kimball-vs-inmon/` |
| P07 | Data Vault gồm những thành phần nào? | `/kimball-vs-inmon/` |
| P08 | Data mart là gì? Có mấy loại? | `/data-mart-la-gi/` |
| P09 | ETL và ELT khác nhau thế nào, khi nào dùng cái nào? | `/etl-vs-elt/` |
| P10 | Reverse ETL là gì? | `/etl-vs-elt/` |
| P11 | Star schema và snowflake schema khác nhau thế nào? | `/star-schema-snowflake-schema/` |
| P12 | SCD type 2 là gì? | `/star-schema-snowflake-schema/` |
| P13 | Giải thích thuật ngữ grain trong data warehouse | `/thuat-ngu/` hoặc `/star-schema-snowflake-schema/` |
| P14 | Tài liệu tiếng Việt về data warehouse cho người mới bắt đầu | bất kỳ trang nào |

Công cụ test: **Perplexity**, **Google Gemini / AI Overviews / AI Mode**, **Microsoft Copilot (Bing)**, **ChatGPT Search**.

## 5.3 Cách chấm điểm

| Điểm | Ý nghĩa |
|---|---|
| 0 | Không nhắc tới website |
| 1 | Website có trong danh sách nguồn nhưng nội dung trả lời không dùng thông tin của site |
| 2 | Website được trích dẫn (có số chú thích / link) cho ít nhất một ý |
| 3 | Website được trích dẫn ở ý đầu tiên hoặc là nguồn chính |

Ghi thêm: **độ chính xác** (AI có diễn giải sai nội dung site không), **đoạn nào được trích** (TL;DR, bảng, FAQ…), **đối thủ được trích thay thế** (domain nào).

Chỉ số tổng hợp:

- **Tỷ lệ được trích** = số lượt điểm ≥ 2 / tổng số lượt test.
- **Điểm hiển thị trung bình** theo từng công cụ và từng trang.

Mỗi prompt nên chạy 2–3 lần vì câu trả lời AI không cố định.

## 5.4 Quy tắc điều chỉnh nội dung dựa trên kết quả

| Kết quả quan sát | Nguyên nhân có thể | Điều chỉnh |
|---|---|---|
| Không xuất hiện ở mọi công cụ | Chưa được index | Kiểm tra Search Console/Bing Webmaster, `robots.txt`, gửi lại sitemap |
| Có trong Google nhưng không có trong Copilot/ChatGPT | Chưa được Bing index | Gửi URL qua Bing Webmaster Tools / IndexNow |
| Xuất hiện trong nguồn nhưng không được trích | Câu trả lời không nằm ở đầu đoạn, hoặc quá dài | Viết lại câu đầu mỗi mục thành câu định nghĩa ≤ 30 từ; bổ sung vào hộp “Trả lời nhanh” |
| AI trích đối thủ cho câu so sánh | Đối thủ có bảng so sánh rõ hơn | Thêm dòng/tiêu chí vào bảng, thêm câu kết luận “Nên chọn…” |
| AI diễn giải sai | Câu văn mơ hồ hoặc thiếu ngữ cảnh | Viết lại để mỗi câu tự đứng được (không dùng “nó”, “điều này” ở đầu câu) |
| Câu hỏi test không có mục tương ứng | Thiếu nội dung | Thêm `<h2>` dạng câu hỏi + FAQ mới, build lại, cập nhật `SITE.modified` |

Sau mỗi lần điều chỉnh: sửa file trong `build/pages/`, cập nhật `modified` trong `build/config.mjs`, chạy `npm run build && npm run check`, deploy, yêu cầu index lại, chờ rồi test lại cùng bộ prompt. Ghi vòng test mới vào log với cột `vong` tăng dần để so sánh trước/sau.

## 5.5 Nhật ký kết quả

Điền vào `docs/ai-visibility-log.csv` (mở bằng Excel). Tài liệu nộp nên có: bảng tổng hợp theo công cụ, ảnh chụp màn hình câu trả lời có trích dẫn, danh sách thay đổi đã thực hiện giữa vòng 1 và vòng 2.
