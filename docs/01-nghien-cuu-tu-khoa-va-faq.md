# 1. Nghiên cứu từ khóa và câu hỏi thường gặp (FAQ)

## 1.1 Phương pháp

| Bước | Cách làm | Công cụ |
|---|---|---|
| 1 | Xác định chủ đề gốc (seed): *data warehouse, kho dữ liệu, data mart, data lake, lakehouse, ETL, ELT, star schema* | — |
| 2 | Mở rộng từ khóa dạng câu hỏi (“là gì”, “khác nhau”, “so sánh”, “khi nào dùng”, “ví dụ”) | Google Autocomplete, mục “Mọi người cũng hỏi” (People Also Ask), AnswerThePublic |
| 3 | Hỏi trực tiếp các AI engine “người dùng thường hỏi gì về X” để thu thập câu hỏi dạng hội thoại | ChatGPT Search, Perplexity, Gemini, Copilot |
| 4 | Đo lượng tìm kiếm và xu hướng | Google Keyword Planner, Google Trends (khu vực Việt Nam) |
| 5 | Phân loại theo ý định (intent) và gán mỗi cụm vào **một** trang đích để tránh trùng lặp nội dung | Bảng dưới |

> Lưu ý trung thực: cột “Lượng tìm kiếm/tháng” để trống vì cần lấy từ Google Keyword Planner bằng tài khoản Google Ads. Điền số liệu thực tế trước khi nộp; không ước đoán.

## 1.2 Bộ từ khóa mục tiêu

| Cụm từ khóa | Ý định | Loại câu hỏi AI | Trang đích | Lượng tìm kiếm/tháng |
|---|---|---|---|---|
| data warehouse là gì | Thông tin | Định nghĩa | `/` | |
| kho dữ liệu là gì | Thông tin | Định nghĩa | `/` | |
| đặc điểm của data warehouse | Thông tin | Liệt kê | `/#4-dac-tinh` | |
| kiến trúc data warehouse | Thông tin | Giải thích | `/#kien-truc` | |
| OLTP và OLAP khác nhau | So sánh | So sánh | `/#oltp-olap` | |
| có nên xây data warehouse | Điều tra | Tư vấn | `/#khi-nao-can` | |
| data lake là gì | Thông tin | Định nghĩa | `/data-warehouse-vs-data-lake-vs-lakehouse/` | |
| data warehouse vs data lake | So sánh | So sánh | `/data-warehouse-vs-data-lake-vs-lakehouse/` | |
| data lakehouse là gì | Thông tin | Định nghĩa | `/data-warehouse-vs-data-lake-vs-lakehouse/` | |
| schema on read schema on write | Thông tin | Giải thích | `/data-warehouse-vs-data-lake-vs-lakehouse/#schema-on-write-read` | |
| kimball vs inmon | So sánh | So sánh | `/kimball-vs-inmon/` | |
| data vault là gì | Thông tin | Định nghĩa | `/kimball-vs-inmon/#data-vault` | |
| data mart là gì | Thông tin | Định nghĩa | `/data-mart-la-gi/` | |
| data mart và data warehouse khác nhau | So sánh | So sánh | `/data-mart-la-gi/#so-sanh` | |
| etl là gì | Thông tin | Định nghĩa | `/etl-vs-elt/` | |
| etl vs elt | So sánh | So sánh | `/etl-vs-elt/` | |
| reverse etl là gì | Thông tin | Định nghĩa | `/etl-vs-elt/#reverse-etl` | |
| star schema là gì | Thông tin | Định nghĩa | `/star-schema-snowflake-schema/` | |
| star schema vs snowflake schema | So sánh | So sánh | `/star-schema-snowflake-schema/#so-sanh` | |
| fact và dimension là gì | Thông tin | Định nghĩa | `/star-schema-snowflake-schema/#fact-dimension` | |
| slowly changing dimension / SCD type 2 | Thông tin | Giải thích | `/star-schema-snowflake-schema/#scd` | |
| thuật ngữ data warehouse | Thông tin | Tra cứu | `/thuat-ngu/` | |

## 1.3 Bộ câu hỏi FAQ (đã triển khai trên website)

Tất cả câu hỏi dưới đây xuất hiện dưới dạng `<h3>` hiển thị trên trang **và** trong schema `FAQPage`. Tổng: 23 câu (xem `/faq/`).

- Data Warehouse tiếng Việt là gì?
- Data Warehouse có phải là cơ sở dữ liệu không?
- Ai là người đặt nền móng cho Data Warehouse?
- Doanh nghiệp nhỏ có cần Data Warehouse không?
- Công cụ Data Warehouse phổ biến hiện nay là gì?
- Data Lake và Data Warehouse khác nhau ở điểm nào quan trọng nhất?
- Lakehouse có thay thế hoàn toàn Data Warehouse không?
- Data swamp là gì?
- Delta Lake, Apache Iceberg, Apache Hudi là gì?
- Kimball và Inmon khác nhau như thế nào?
- Conformed dimension là gì?
- Phương pháp nào phổ biến hơn hiện nay?
- Data Mart có phải là Data Warehouse thu nhỏ không?
- Có nên xây Data Mart trước khi có Data Warehouse không?
- Data Mart và OLAP cube khác nhau thế nào?
- ETL và ELT khác nhau ở điểm nào?
- ELT có tốt hơn ETL không?
- dbt là ETL hay ELT?
- Reverse ETL dùng để làm gì?
- Star schema và snowflake schema khác nhau thế nào?
- SCD Type 2 là gì?
- Grain trong data warehouse là gì?
- Vì sao cần surrogate key?

## 1.4 Nguyên tắc áp dụng từ khóa vào nội dung

- Mỗi `<h2>` được viết **dưới dạng câu hỏi** giống cách người dùng hỏi AI (“ETL và ELT khác nhau thế nào?”).
- Câu đầu tiên sau mỗi tiêu đề là **câu trả lời trực tiếp** (answer-first), đủ nghĩa khi bị trích riêng.
- Hộp “Trả lời nhanh” đầu trang tóm tắt 3–4 ý chính — đoạn dễ được AI trích nhất.
- Giữ song ngữ thuật ngữ (VD: “kho dữ liệu (Data Warehouse)”) để khớp cả truy vấn tiếng Việt lẫn tiếng Anh.
