export default {
  slug: 'star-schema-snowflake-schema/',
  type: 'TechArticle',
  title: 'Star Schema và Snowflake Schema: Fact, Dimension, SCD',
  description:
    'Star schema gồm một bảng fact ở trung tâm nối với các bảng dimension. So sánh star schema và snowflake schema, các loại bảng fact và 8 loại Slowly Changing Dimension.',
  h1: 'Star Schema và Snowflake Schema trong Data Warehouse',
  about: ['star', 'snowflake', 'dimModel', 'scd'],
  mentions: ['kimball', 'dw', 'dm'],
  summary: [
    '<strong>Star schema:</strong> một bảng <strong>fact</strong> (số đo) ở trung tâm, nối trực tiếp với các bảng <strong>dimension</strong> (ngữ cảnh) — hình ngôi sao {{cite:kimball2013}}.',
    '<strong>Snowflake schema:</strong> các dimension được chuẩn hóa thành nhiều bảng con, giảm trùng lặp nhưng truy vấn cần nhiều phép join hơn.',
    'Kimball phân loại 3 loại fact cơ bản: <strong>transaction, periodic snapshot, accumulating snapshot</strong> {{cite:kimballTechniques}}.',
    '<strong>Slowly Changing Dimension (SCD)</strong> có 8 loại từ Type 0 đến Type 7; phổ biến nhất là Type 1 (ghi đè) và Type 2 (thêm dòng mới) {{cite:kimballTechniques}}.',
  ],
  body: `
<section id="fact-dimension">
  <h2>Bảng fact và bảng dimension là gì?</h2>
  <div class="table-wrap">
  <table>
    <caption>Fact và Dimension</caption>
    <thead><tr><th scope="col">Thành phần</th><th scope="col">Chứa gì</th><th scope="col">Ví dụ (bán lẻ)</th></tr></thead>
    <tbody>
      <tr><th scope="row">Bảng fact</th><td>Số đo định lượng của một sự kiện nghiệp vụ + khóa ngoại tới các dimension</td><td>Số lượng, đơn giá, doanh thu của từng dòng hóa đơn</td></tr>
      <tr><th scope="row">Bảng dimension</th><td>Thuộc tính mô tả dùng để lọc, nhóm, gắn nhãn</td><td>Ngày, Sản phẩm, Cửa hàng, Khách hàng, Khuyến mãi</td></tr>
      <tr><th scope="row">Grain</th><td>Mức chi tiết của một dòng trong bảng fact</td><td>“Một dòng = một sản phẩm trên một hóa đơn”</td></tr>
      <tr><th scope="row">Surrogate key</th><td>Khóa thay thế (số nguyên) do kho dữ liệu tự sinh cho dimension</td><td>product_key = 1024</td></tr>
    </tbody>
  </table>
  </div>
  <p>Kimball nhấn mạnh việc khai báo grain <em>trước</em> khi chọn dimension và fact, vì mọi số đo trong bảng fact phải cùng một grain {{cite:kimballTechniques}}.</p>
</section>

<section id="star-schema">
  <h2>Star schema là gì?</h2>
  <p><dfn>Star schema</dfn> (lược đồ hình sao) là mô hình trong đó bảng fact nằm ở trung tâm và mỗi bảng dimension nối trực tiếp với bảng fact. Các dimension thường được phi chuẩn hóa (denormalized) — ví dụ bảng Sản phẩm chứa luôn tên danh mục và tên nhãn hàng — để truy vấn đơn giản và nhanh {{cite:kimball2013}}.</p>
  <pre><code>-- Doanh thu theo danh mục sản phẩm và tháng (star schema)
SELECT d.year_month, p.category, SUM(f.sales_amount) AS revenue
FROM fact_sales f
JOIN dim_date    d ON f.date_key    = d.date_key
JOIN dim_product p ON f.product_key = p.product_key
GROUP BY d.year_month, p.category;</code></pre>
</section>

<section id="snowflake-schema">
  <h2>Snowflake schema là gì?</h2>
  <p><dfn>Snowflake schema</dfn> (lược đồ bông tuyết) chuẩn hóa các dimension thành nhiều cấp: ví dụ Sản phẩm → Danh mục → Ngành hàng nằm ở ba bảng riêng. Mô hình giảm dữ liệu trùng lặp nhưng tăng số phép join và độ phức tạp cho người dùng.</p>
</section>

<section id="so-sanh">
  <h2>So sánh Star schema và Snowflake schema</h2>
  <div class="table-wrap">
  <table>
    <caption>Star schema và Snowflake schema</caption>
    <thead><tr><th scope="col">Tiêu chí</th><th scope="col">Star schema</th><th scope="col">Snowflake schema</th></tr></thead>
    <tbody>
      <tr><th scope="row">Dimension</th><td>Phi chuẩn hóa, một bảng mỗi dimension</td><td>Chuẩn hóa, nhiều bảng mỗi dimension</td></tr>
      <tr><th scope="row">Số phép join</th><td>Ít</td><td>Nhiều</td></tr>
      <tr><th scope="row">Dung lượng dimension</th><td>Lớn hơn (có trùng lặp)</td><td>Nhỏ hơn</td></tr>
      <tr><th scope="row">Dễ hiểu với người dùng BI</th><td>Cao</td><td>Thấp hơn</td></tr>
      <tr><th scope="row">Hiệu năng truy vấn BI</th><td>Thường tốt hơn</td><td>Có thể chậm hơn do nhiều join</td></tr>
      <tr><th scope="row">Khi nên dùng</th><td>Mặc định cho tầng trình bày/BI</td><td>Dimension rất lớn, phân cấp sâu, cần tiết kiệm lưu trữ</td></tr>
    </tbody>
  </table>
  </div>
</section>

<section id="loai-fact">
  <h2>Các loại bảng fact</h2>
  <ul>
    <li><strong>Transaction fact:</strong> mỗi dòng là một sự kiện tại một thời điểm (một dòng hóa đơn) {{cite:kimballTechniques}}.</li>
    <li><strong>Periodic snapshot fact:</strong> mỗi dòng tóm tắt trạng thái tại cuối một kỳ đều đặn (tồn kho cuối ngày, số dư cuối tháng) {{cite:kimballTechniques}}.</li>
    <li><strong>Accumulating snapshot fact:</strong> mỗi dòng theo dõi một quy trình có các mốc xác định và được cập nhật khi quy trình tiến triển (đơn hàng: đặt → xuất kho → giao → thanh toán) {{cite:kimballTechniques}}.</li>
    <li><strong>Factless fact:</strong> ghi nhận sự kiện không có số đo (điểm danh sinh viên) {{cite:kimballTechniques}}.</li>
  </ul>
  <p>Về tính cộng dồn, số đo có thể là <strong>additive</strong> (cộng được theo mọi dimension, như doanh thu), <strong>semi-additive</strong> (không cộng theo thời gian, như số dư tài khoản) hoặc <strong>non-additive</strong> (như tỷ lệ phần trăm) {{cite:kimballTechniques}}.</p>
</section>

<section id="scd">
  <h2>Slowly Changing Dimension (SCD) có những loại nào?</h2>
  <p>SCD là kỹ thuật xử lý khi thuộc tính của dimension thay đổi theo thời gian (ví dụ khách hàng chuyển địa chỉ). Kimball Group liệt kê 8 loại {{cite:kimballTechniques}}:</p>
  <div class="table-wrap">
  <table>
    <caption>8 loại Slowly Changing Dimension</caption>
    <thead><tr><th scope="col">Loại</th><th scope="col">Cách xử lý</th><th scope="col">Lưu lịch sử?</th></tr></thead>
    <tbody>
      <tr><th scope="row">Type 0</th><td>Giữ nguyên giá trị gốc</td><td>Không (không bao giờ đổi)</td></tr>
      <tr><th scope="row">Type 1</th><td>Ghi đè giá trị cũ</td><td>Không</td></tr>
      <tr><th scope="row">Type 2</th><td>Thêm dòng mới với surrogate key mới, kèm ngày hiệu lực</td><td>Có, đầy đủ</td></tr>
      <tr><th scope="row">Type 3</th><td>Thêm cột lưu giá trị trước đó</td><td>Một phần (giá trị liền trước)</td></tr>
      <tr><th scope="row">Type 4</th><td>Tách thuộc tính thay đổi nhanh ra mini-dimension</td><td>Có</td></tr>
      <tr><th scope="row">Type 5</th><td>Mini-dimension + outrigger Type 1</td><td>Có</td></tr>
      <tr><th scope="row">Type 6</th><td>Thêm thuộc tính Type 1 vào dimension Type 2</td><td>Có, kèm giá trị hiện hành</td></tr>
      <tr><th scope="row">Type 7</th><td>Kết hợp song song Type 1 và Type 2</td><td>Có, kèm góc nhìn hiện hành</td></tr>
    </tbody>
  </table>
  </div>
</section>
`,
  faqs: [
    {
      q: 'Star schema và snowflake schema khác nhau thế nào?',
      a: 'Star schema giữ mỗi dimension trong một bảng phi chuẩn hóa nối trực tiếp với bảng fact; snowflake schema chuẩn hóa dimension thành nhiều bảng phân cấp. Star schema dễ hiểu và truy vấn nhanh hơn; snowflake schema giảm trùng lặp dữ liệu.',
    },
    {
      q: 'SCD Type 2 là gì?',
      a: 'SCD Type 2 xử lý thay đổi thuộc tính dimension bằng cách thêm một dòng mới với surrogate key mới và ngày hiệu lực, giữ nguyên dòng cũ, nhờ đó lưu được toàn bộ lịch sử thay đổi.',
    },
    {
      q: 'Grain trong data warehouse là gì?',
      a: 'Grain là mức chi tiết mà một dòng trong bảng fact biểu diễn, ví dụ “một sản phẩm trên một hóa đơn” hoặc “số dư một tài khoản vào cuối ngày”. Grain phải được khai báo trước khi chọn dimension và fact.',
    },
    {
      q: 'Vì sao cần surrogate key?',
      a: 'Surrogate key tách kho dữ liệu khỏi khóa của hệ thống nguồn, cho phép lưu nhiều phiên bản của cùng một thực thể (SCD Type 2), tích hợp khóa từ nhiều nguồn và giữ phép join gọn nhẹ.',
    },
  ],
  related: ['kimball-vs-inmon/', 'data-mart-la-gi/', 'thuat-ngu/'],
};
