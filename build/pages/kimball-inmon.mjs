export default {
  slug: 'kimball-vs-inmon/',
  type: 'TechArticle',
  title: 'Kimball vs Inmon vs Data Vault: So sánh',
  description:
    'So sánh phương pháp Kimball (bottom-up, mô hình chiều), Inmon (top-down, 3NF) và Data Vault 2.0 trong thiết kế Data Warehouse. Ưu nhược điểm và khi nào nên dùng.',
  h1: 'Kimball và Inmon: Hai phương pháp xây dựng Data Warehouse',
  about: ['dw', 'dimModel', 'dataVault'],
  mentions: ['inmon', 'kimball', 'dm', 'star'],
  summary: [
    '<strong>Inmon (top-down):</strong> xây kho dữ liệu doanh nghiệp (EDW) chuẩn hóa 3NF trước, sau đó tạo các data mart phụ thuộc cho từng phòng ban {{cite:inmon1992}}.',
    '<strong>Kimball (bottom-up):</strong> xây các mô hình chiều (star schema) theo từng quy trình nghiệp vụ, liên kết qua <em>conformed dimensions</em> và bus matrix {{cite:kimballTechniques}}.',
    '<strong>Data Vault 2.0:</strong> mô hình Hub – Link – Satellite, tối ưu cho tích hợp nhiều nguồn, lưu vết đầy đủ và thay đổi linh hoạt {{cite:linstedt2015}}.',
    'Thực tế nhiều hệ thống kết hợp: tầng tích hợp theo Inmon hoặc Data Vault, tầng trình bày theo Kimball.',
  ],
  body: `
<section id="inmon">
  <h2>Phương pháp Inmon là gì?</h2>
  <p>Bill Inmon đề xuất xây dựng một <strong>kho dữ liệu doanh nghiệp (Enterprise Data Warehouse – EDW)</strong> tập trung, mô hình hóa ở dạng chuẩn hóa (thường là dạng chuẩn 3 – 3NF), là nguồn duy nhất cho toàn tổ chức {{cite:inmon1992}}. Các data mart cho từng phòng ban được tạo <em>từ</em> EDW (gọi là data mart phụ thuộc).</p>
  <ul>
    <li><strong>Hướng tiếp cận:</strong> từ trên xuống (top-down).</li>
    <li><strong>Ưu điểm:</strong> dữ liệu nhất quán toàn doanh nghiệp, ít trùng lặp, dễ thích ứng khi nghiệp vụ thay đổi.</li>
    <li><strong>Nhược điểm:</strong> thời gian và chi phí ban đầu lớn, cần mô hình dữ liệu doanh nghiệp tổng thể trước khi có báo cáo đầu tiên.</li>
  </ul>
</section>

<section id="kimball">
  <h2>Phương pháp Kimball là gì?</h2>
  <p>Ralph Kimball đề xuất <strong>mô hình hóa chiều (dimensional modeling)</strong>: dữ liệu được tổ chức thành bảng fact (số đo) và bảng dimension (ngữ cảnh mô tả) dạng star schema {{cite:kimball2013}}. Kho dữ liệu là tập hợp các mô hình chiều theo từng quy trình nghiệp vụ, được gắn kết bằng <strong>conformed dimensions</strong> (dimension dùng chung, cùng định nghĩa) và <strong>enterprise bus matrix</strong> {{cite:kimballTechniques}}.</p>
  <p>Quy trình thiết kế 4 bước của Kimball {{cite:kimballTechniques}}:</p>
  <ol>
    <li>Chọn quy trình nghiệp vụ (business process).</li>
    <li>Khai báo grain — mức chi tiết của một dòng trong bảng fact.</li>
    <li>Xác định các dimension.</li>
    <li>Xác định các fact (số đo).</li>
  </ol>
  <ul>
    <li><strong>Hướng tiếp cận:</strong> từ dưới lên (bottom-up), theo từng giai đoạn.</li>
    <li><strong>Ưu điểm:</strong> ra kết quả nhanh, dễ hiểu với người dùng nghiệp vụ, truy vấn BI hiệu quả.</li>
    <li><strong>Nhược điểm:</strong> nếu không quản lý conformed dimensions chặt chẽ, dễ tạo ra các data mart rời rạc, số liệu lệch nhau.</li>
  </ul>
  <p>Chi tiết kỹ thuật: <a href="/star-schema-snowflake-schema/">Star schema, fact và dimension</a>.</p>
</section>

<section id="bang-so-sanh">
  <h2>Bảng so sánh Kimball và Inmon</h2>
  <div class="table-wrap">
  <table>
    <caption>So sánh hai phương pháp kinh điển</caption>
    <thead><tr><th scope="col">Tiêu chí</th><th scope="col">Inmon</th><th scope="col">Kimball</th></tr></thead>
    <tbody>
      <tr><th scope="row">Hướng tiếp cận</th><td>Top-down</td><td>Bottom-up</td></tr>
      <tr><th scope="row">Mô hình kho lõi</th><td>Chuẩn hóa 3NF</td><td>Mô hình chiều (star schema)</td></tr>
      <tr><th scope="row">Data mart</th><td>Phụ thuộc, sinh ra từ EDW</td><td>Là một phần của kho, nối bằng conformed dimensions</td></tr>
      <tr><th scope="row">Thời gian ra kết quả đầu tiên</th><td>Dài</td><td>Ngắn</td></tr>
      <tr><th scope="row">Chi phí ban đầu</th><td>Cao</td><td>Thấp hơn</td></tr>
      <tr><th scope="row">Mức độ dễ hiểu với nghiệp vụ</th><td>Thấp (nhiều bảng chuẩn hóa)</td><td>Cao</td></tr>
      <tr><th scope="row">Phù hợp với</th><td>Tổ chức lớn, cần mô hình dữ liệu doanh nghiệp thống nhất</td><td>Dự án cần giá trị nhanh, nhu cầu BI rõ ràng</td></tr>
      <tr><th scope="row">Tài liệu gốc</th><td><cite>Building the Data Warehouse</cite> (1992)</td><td><cite>The Data Warehouse Toolkit</cite> (1996; tái bản lần 3 năm 2013)</td></tr>
    </tbody>
  </table>
  </div>
</section>

<section id="data-vault">
  <h2>Data Vault 2.0 là gì?</h2>
  <p>Data Vault do Dan Linstedt phát triển, được trình bày đầy đủ trong <cite>Building a Scalable Data Warehouse with Data Vault 2.0</cite> {{cite:linstedt2015}}. Mô hình gồm 3 loại bảng:</p>
  <div class="table-wrap">
  <table>
    <caption>Thành phần của Data Vault</caption>
    <thead><tr><th scope="col">Thành phần</th><th scope="col">Chứa gì</th><th scope="col">Ví dụ</th></tr></thead>
    <tbody>
      <tr><th scope="row">Hub</th><td>Khóa nghiệp vụ duy nhất của một thực thể</td><td>Mã khách hàng</td></tr>
      <tr><th scope="row">Link</th><td>Quan hệ giữa các hub</td><td>Khách hàng – Đơn hàng</td></tr>
      <tr><th scope="row">Satellite</th><td>Thuộc tính mô tả và lịch sử thay đổi</td><td>Tên, địa chỉ khách hàng theo thời gian</td></tr>
    </tbody>
  </table>
  </div>
  <p>Data Vault phù hợp làm <strong>tầng tích hợp</strong> khi có nhiều nguồn thay đổi thường xuyên và yêu cầu kiểm toán (audit) cao; tầng trình bày cho BI vẫn thường dùng star schema.</p>
</section>

<section id="nen-chon">
  <h2>Nên chọn Kimball, Inmon hay Data Vault?</h2>
  <ul>
    <li><strong>Chọn Kimball</strong> nếu cần dashboard nhanh, phạm vi rõ, đội ngũ nhỏ.</li>
    <li><strong>Chọn Inmon</strong> nếu tổ chức lớn, nhiều hệ thống, cần một mô hình dữ liệu doanh nghiệp chuẩn.</li>
    <li><strong>Chọn Data Vault</strong> nếu nguồn dữ liệu nhiều và thay đổi liên tục, cần lưu vết đầy đủ.</li>
    <li><strong>Kết hợp</strong> (phổ biến nhất): tích hợp bằng 3NF/Data Vault, trình bày bằng star schema.</li>
  </ul>
</section>
`,
  faqs: [
    {
      q: 'Kimball và Inmon khác nhau như thế nào?',
      a: 'Inmon xây kho dữ liệu doanh nghiệp chuẩn hóa 3NF trước rồi tạo data mart phụ thuộc (top-down); Kimball xây các mô hình chiều star schema theo từng quy trình nghiệp vụ và nối chúng bằng conformed dimensions (bottom-up).',
    },
    {
      q: 'Conformed dimension là gì?',
      a: 'Conformed dimension là bảng dimension dùng chung, có cùng khóa, cùng tên thuộc tính và cùng ý nghĩa giữa nhiều bảng fact, giúp số liệu từ các quy trình nghiệp vụ khác nhau có thể so sánh và kết hợp.',
    },
    {
      q: 'Phương pháp nào phổ biến hơn hiện nay?',
      a: 'Mô hình chiều của Kimball được dùng rất rộng rãi ở tầng trình bày cho BI; nhiều kiến trúc hiện đại kết hợp tầng tích hợp theo Inmon hoặc Data Vault với tầng trình bày theo Kimball.',
    },
  ],
  related: ['star-schema-snowflake-schema/', 'data-mart-la-gi/', ''],
};
