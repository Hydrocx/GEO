export default {
  slug: 'data-mart-la-gi/',
  type: 'TechArticle',
  title: 'Data Mart là gì? Phân loại và so sánh với DW',
  description:
    'Data Mart là tập con của kho dữ liệu, tập trung vào một chủ đề hoặc phòng ban. Tìm hiểu 3 loại data mart, so sánh với Data Warehouse và ví dụ thực tế.',
  h1: 'Data Mart là gì? Phân loại và so sánh với Data Warehouse',
  about: ['dm'],
  mentions: ['dw', 'star', 'bi', 'inmon', 'kimball'],
  summary: [
    '<strong>Data Mart</strong> là một kho dữ liệu nhỏ, tập trung vào <strong>một chủ đề hoặc một phòng ban</strong> (bán hàng, tài chính, marketing).',
    'Có 3 loại: <strong>phụ thuộc</strong> (lấy từ kho dữ liệu doanh nghiệp), <strong>độc lập</strong> (lấy trực tiếp từ nguồn), <strong>lai</strong> (kết hợp cả hai).',
    'Data Mart thường được mô hình hóa dạng <strong>star schema</strong> để người dùng nghiệp vụ dễ truy vấn {{cite:kimball2013}}.',
    'Khác biệt chính với Data Warehouse: phạm vi hẹp hơn, số nguồn ít hơn, triển khai nhanh hơn.',
  ],
  body: `
<section id="dinh-nghia">
  <h2>Data Mart là gì?</h2>
  <p><dfn>Data Mart</dfn> là một tập dữ liệu phân tích hướng tới một nhóm người dùng hoặc một lĩnh vực nghiệp vụ cụ thể. Nếu data warehouse là “kho tổng”, data mart là “kho chi nhánh” chỉ chứa những gì một phòng ban cần. Trong phương pháp Inmon, data mart được sinh ra từ kho dữ liệu doanh nghiệp {{cite:inmon1992}}; trong phương pháp Kimball, kho dữ liệu chính là tập hợp các data mart dùng chung conformed dimensions {{cite:kimball2013}}.</p>
</section>

<section id="phan-loai">
  <h2>Có mấy loại Data Mart?</h2>
  <div class="table-wrap">
  <table>
    <caption>Ba loại Data Mart</caption>
    <thead><tr><th scope="col">Loại</th><th scope="col">Nguồn dữ liệu</th><th scope="col">Ưu điểm</th><th scope="col">Rủi ro</th></tr></thead>
    <tbody>
      <tr><th scope="row">Phụ thuộc (dependent)</th><td>Kho dữ liệu doanh nghiệp</td><td>Số liệu nhất quán với toàn công ty</td><td>Phải có kho dữ liệu trước</td></tr>
      <tr><th scope="row">Độc lập (independent)</th><td>Trực tiếp từ hệ thống nguồn</td><td>Triển khai nhanh, chi phí thấp</td><td>Dễ tạo “ốc đảo dữ liệu”, số liệu lệch giữa phòng ban</td></tr>
      <tr><th scope="row">Lai (hybrid)</th><td>Kho dữ liệu + nguồn bổ sung</td><td>Linh hoạt</td><td>Cần quản trị chặt để tránh trùng lặp logic</td></tr>
    </tbody>
  </table>
  </div>
</section>

<section id="so-sanh">
  <h2>Data Mart khác Data Warehouse như thế nào?</h2>
  <div class="table-wrap">
  <table>
    <caption>So sánh Data Mart và Data Warehouse</caption>
    <thead><tr><th scope="col">Tiêu chí</th><th scope="col">Data Warehouse</th><th scope="col">Data Mart</th></tr></thead>
    <tbody>
      <tr><th scope="row">Phạm vi</th><td>Toàn doanh nghiệp</td><td>Một phòng ban hoặc chủ đề</td></tr>
      <tr><th scope="row">Số nguồn dữ liệu</th><td>Nhiều</td><td>Ít</td></tr>
      <tr><th scope="row">Người dùng</th><td>Nhiều bộ phận</td><td>Một nhóm người dùng cụ thể</td></tr>
      <tr><th scope="row">Thời gian triển khai</th><td>Dài</td><td>Ngắn</td></tr>
      <tr><th scope="row">Mô hình thường gặp</th><td>3NF, Data Vault hoặc mô hình chiều</td><td>Star schema</td></tr>
    </tbody>
  </table>
  </div>
</section>

<section id="vi-du">
  <h2>Ví dụ về Data Mart trong doanh nghiệp</h2>
  <ul>
    <li><strong>Data mart Bán hàng:</strong> fact doanh thu theo dòng đơn hàng; dimension ngày, sản phẩm, khách hàng, cửa hàng, nhân viên.</li>
    <li><strong>Data mart Tài chính:</strong> fact bút toán sổ cái; dimension tài khoản, kỳ kế toán, đơn vị, trung tâm chi phí.</li>
    <li><strong>Data mart Marketing:</strong> fact chiến dịch, lượt tương tác; dimension kênh, chiến dịch, phân khúc khách hàng.</li>
    <li><strong>Data mart Nhân sự:</strong> fact ảnh chụp định kỳ số lượng nhân sự (periodic snapshot); dimension phòng ban, chức danh, thời gian.</li>
  </ul>
</section>

<section id="xay-dung">
  <h2>Các bước xây dựng một Data Mart</h2>
  <ol>
    <li>Xác định người dùng và câu hỏi nghiệp vụ cần trả lời.</li>
    <li>Chọn quy trình nghiệp vụ và grain của bảng fact {{cite:kimballTechniques}}.</li>
    <li>Tái sử dụng conformed dimensions sẵn có (ngày, sản phẩm, khách hàng).</li>
    <li>Xây pipeline nạp dữ liệu từ kho hoặc từ nguồn.</li>
    <li>Đối soát số liệu với hệ thống nguồn và báo cáo hiện hành.</li>
    <li>Công bố cho công cụ BI và hướng dẫn người dùng.</li>
  </ol>
</section>
`,
  faqs: [
    {
      q: 'Data Mart có phải là Data Warehouse thu nhỏ không?',
      a: 'Có thể hiểu như vậy: data mart là kho dữ liệu có phạm vi hẹp, phục vụ một phòng ban hoặc chủ đề, thường là tập con của data warehouse hoặc được xây trực tiếp từ một vài nguồn.',
    },
    {
      q: 'Có nên xây Data Mart trước khi có Data Warehouse không?',
      a: 'Có thể, theo hướng bottom-up của Kimball, với điều kiện các data mart dùng chung conformed dimensions. Nếu mỗi data mart tự định nghĩa khách hàng, sản phẩm riêng, doanh nghiệp sẽ gặp tình trạng số liệu không khớp.',
    },
    {
      q: 'Data Mart và OLAP cube khác nhau thế nào?',
      a: 'Data mart là tập bảng dữ liệu (thường là star schema) lưu trong cơ sở dữ liệu; OLAP cube hoặc semantic model là lớp tổng hợp đặt trên data mart để tính sẵn số đo và tăng tốc phân tích đa chiều.',
    },
  ],
  related: ['', 'kimball-vs-inmon/', 'star-schema-snowflake-schema/'],
};
