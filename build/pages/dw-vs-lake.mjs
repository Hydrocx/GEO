export default {
  slug: 'data-warehouse-vs-data-lake-vs-lakehouse/',
  type: 'TechArticle',
  title: 'Data Warehouse vs Data Lake vs Lakehouse',
  description:
    'So sánh Data Warehouse, Data Lake và Data Lakehouse theo loại dữ liệu, schema, chi phí, người dùng và trường hợp sử dụng. Bảng so sánh và hướng dẫn chọn kiến trúc.',
  h1: 'Data Warehouse, Data Lake và Data Lakehouse khác nhau thế nào?',
  about: ['dw', 'dl', 'lakehouse'],
  mentions: ['etl', 'elt', 'bi'],
  summary: [
    '<strong>Data Warehouse</strong> lưu dữ liệu có cấu trúc, đã làm sạch, áp schema khi ghi (schema-on-write) — tối ưu cho BI và báo cáo.',
    '<strong>Data Lake</strong> lưu mọi loại dữ liệu (có cấu trúc, bán cấu trúc, phi cấu trúc) ở dạng thô, áp schema khi đọc (schema-on-read) {{cite:awsDL}}.',
    '<strong>Data Lakehouse</strong> kết hợp chi phí thấp và tính linh hoạt của data lake với giao dịch ACID và quản trị dữ liệu của data warehouse {{cite:dbxLakehouse}}.',
    'Chọn DW khi nhu cầu chính là báo cáo có cấu trúc; chọn Lakehouse khi cần cả BI lẫn AI/ML trên cùng một nền tảng.',
  ],
  body: `
<section id="dinh-nghia">
  <h2>Định nghĩa ngắn gọn từng khái niệm</h2>
  <dl class="defs">
    <dt>Data Warehouse (kho dữ liệu)</dt>
    <dd>Kho lưu trữ tập trung dữ liệu đã tích hợp, có cấu trúc, phục vụ phân tích và ra quyết định {{cite:awsDW}}. Xem chi tiết: <a href="/">Data Warehouse là gì</a>.</dd>
    <dt>Data Lake (hồ dữ liệu)</dt>
    <dd>Kho tập trung cho phép lưu <q>mọi dữ liệu có cấu trúc và phi cấu trúc ở mọi quy mô</q> {{cite:awsDL}}. Thuật ngữ được James Dixon, CTO của Pentaho, đặt ra vào đầu thập niên 2010 {{cite:wikiDL}}.</dd>
    <dt>Data Lakehouse</dt>
    <dd>Kiến trúc quản lý dữ liệu mở, kết hợp tính linh hoạt, hiệu quả chi phí và quy mô của data lake với khả năng quản lý dữ liệu và giao dịch ACID của data warehouse, cho phép chạy BI và ML trên toàn bộ dữ liệu {{cite:dbxLakehouse}}. Kiến trúc này được trình bày học thuật trong bài báo tại hội nghị CIDR 2021 {{cite:armbrust2021}}.</dd>
  </dl>
</section>

<section id="bang-so-sanh">
  <h2>Bảng so sánh Data Warehouse, Data Lake và Lakehouse</h2>
  <div class="table-wrap">
  <table>
    <caption>So sánh 3 kiến trúc lưu trữ dữ liệu phân tích</caption>
    <thead><tr><th scope="col">Tiêu chí</th><th scope="col">Data Warehouse</th><th scope="col">Data Lake</th><th scope="col">Data Lakehouse</th></tr></thead>
    <tbody>
      <tr><th scope="row">Loại dữ liệu</th><td>Có cấu trúc</td><td>Có cấu trúc, bán cấu trúc, phi cấu trúc</td><td>Tất cả các loại</td></tr>
      <tr><th scope="row">Schema</th><td>Schema-on-write (định nghĩa trước khi nạp)</td><td>Schema-on-read (định nghĩa khi đọc)</td><td>Cả hai; có kiểm soát và tiến hóa schema</td></tr>
      <tr><th scope="row">Định dạng lưu trữ</th><td>Định dạng riêng của engine</td><td>File mở (Parquet, JSON, CSV, ảnh, log…)</td><td>File mở + định dạng bảng mở (Delta Lake, Apache Iceberg, Apache Hudi)</td></tr>
      <tr><th scope="row">Giao dịch ACID</th><td>Có</td><td>Thường không</td><td>Có (qua định dạng bảng mở)</td></tr>
      <tr><th scope="row">Chất lượng dữ liệu</th><td>Cao, đã làm sạch</td><td>Thô, dễ thành “data swamp” nếu thiếu quản trị</td><td>Phân tầng Bronze → Silver → Gold {{cite:dbxMedallion}}</td></tr>
      <tr><th scope="row">Người dùng chính</th><td>Nhà phân tích nghiệp vụ, BI</td><td>Data engineer, data scientist</td><td>Cả BI và data science</td></tr>
      <tr><th scope="row">Trường hợp sử dụng</th><td>Báo cáo tài chính, dashboard KPI</td><td>Lưu log, dữ liệu IoT, huấn luyện ML</td><td>BI + ML + streaming trên một nền tảng</td></tr>
      <tr><th scope="row">Ví dụ công nghệ</th><td>Amazon Redshift, Google BigQuery, Snowflake</td><td>Amazon S3, Azure Data Lake Storage, Google Cloud Storage</td><td>Databricks, Microsoft Fabric Lakehouse, bảng Iceberg trên các engine hỗ trợ</td></tr>
    </tbody>
  </table>
  </div>
  <p class="note">Ranh giới giữa các sản phẩm ngày càng mờ: nhiều data warehouse cloud đã đọc được định dạng bảng mở như Apache Iceberg, và nhiều lakehouse hỗ trợ SQL chuẩn kho dữ liệu.</p>
</section>

<section id="schema-on-write-read">
  <h2>Schema-on-write và schema-on-read là gì?</h2>
  <ul>
    <li><strong>Schema-on-write:</strong> cấu trúc bảng (cột, kiểu dữ liệu) được định nghĩa <em>trước</em> khi nạp. Dữ liệu sai cấu trúc bị từ chối. Ưu điểm: dữ liệu nhất quán, truy vấn nhanh. Nhược điểm: kém linh hoạt khi nguồn thay đổi.</li>
    <li><strong>Schema-on-read:</strong> dữ liệu được lưu nguyên dạng, cấu trúc chỉ được áp <em>khi đọc</em>. Ưu điểm: nạp nhanh, giữ được dữ liệu thô cho nhu cầu tương lai. Nhược điểm: mỗi người đọc có thể hiểu dữ liệu khác nhau.</li>
  </ul>
</section>

<section id="van-de-kien-truc-2-tang">
  <h2>Vì sao Lakehouse ra đời?</h2>
  <p>Trước lakehouse, nhiều doanh nghiệp dùng kiến trúc 2 tầng: dữ liệu vào data lake trước, sau đó một phần được sao chép sang data warehouse để làm BI. Bài báo CIDR 2021 chỉ ra các vấn đề của mô hình này {{cite:armbrust2021}}:</p>
  <ul>
    <li><strong>Dữ liệu cũ (staleness):</strong> kho dữ liệu chậm hơn data lake do thêm bước sao chép.</li>
    <li><strong>Độ tin cậy:</strong> giữ hai hệ thống đồng bộ khó và tốn công.</li>
    <li><strong>Tổng chi phí sở hữu cao:</strong> trả tiền lưu trữ hai lần.</li>
    <li><strong>Phụ thuộc nhà cung cấp:</strong> dữ liệu trong định dạng độc quyền của kho.</li>
    <li><strong>Hỗ trợ hạn chế cho ML:</strong> công cụ ML khó đọc trực tiếp dữ liệu trong kho.</li>
  </ul>
</section>

<section id="nen-chon">
  <h2>Nên chọn Data Warehouse, Data Lake hay Lakehouse?</h2>
  <div class="table-wrap">
  <table>
    <caption>Gợi ý lựa chọn theo tình huống</caption>
    <thead><tr><th scope="col">Tình huống</th><th scope="col">Gợi ý</th></tr></thead>
    <tbody>
      <tr><td>Nhu cầu chủ yếu là báo cáo tài chính, KPI; dữ liệu từ ERP/CRM có cấu trúc</td><td>Data Warehouse</td></tr>
      <tr><td>Cần lưu khối lượng lớn log, ảnh, dữ liệu cảm biến với chi phí thấp, chưa rõ mục đích phân tích</td><td>Data Lake (kèm quản trị dữ liệu)</td></tr>
      <tr><td>Cần BI và AI/ML trên cùng dữ liệu, muốn tránh sao chép giữa hai hệ thống</td><td>Data Lakehouse</td></tr>
      <tr><td>Đội ngũ nhỏ, chủ yếu biết SQL</td><td>Data Warehouse cloud (serverless)</td></tr>
    </tbody>
  </table>
  </div>
</section>
`,
  faqs: [
    {
      q: 'Data Lake và Data Warehouse khác nhau ở điểm nào quan trọng nhất?',
      a: 'Khác biệt quan trọng nhất là thời điểm áp schema: Data Warehouse áp schema trước khi nạp (schema-on-write) và chỉ chứa dữ liệu có cấu trúc đã làm sạch; Data Lake lưu dữ liệu thô mọi định dạng và áp schema khi đọc (schema-on-read).',
    },
    {
      q: 'Lakehouse có thay thế hoàn toàn Data Warehouse không?',
      a: 'Chưa có câu trả lời chung. Lakehouse giải quyết được nhiều hạn chế của kiến trúc hai tầng lake + warehouse, nhưng nhiều doanh nghiệp vẫn dùng data warehouse cloud cho BI vì đơn giản và quen thuộc. Lựa chọn phụ thuộc nhu cầu AI/ML, kỹ năng đội ngũ và chi phí.',
    },
    {
      q: 'Data swamp là gì?',
      a: 'Data swamp (đầm lầy dữ liệu) là data lake bị mất kiểm soát: thiếu metadata, thiếu quản trị và chất lượng, khiến người dùng không tìm được hoặc không tin dữ liệu bên trong.',
    },
    {
      q: 'Delta Lake, Apache Iceberg, Apache Hudi là gì?',
      a: 'Đây là các định dạng bảng mở (open table format) đặt trên file Parquet trong data lake, bổ sung giao dịch ACID, lịch sử phiên bản (time travel) và tiến hóa schema — nền tảng kỹ thuật của kiến trúc lakehouse.',
    },
  ],
  related: ['', 'etl-vs-elt/', 'data-mart-la-gi/', 'thuat-ngu/'],
};
