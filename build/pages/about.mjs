export default {
  slug: 'gioi-thieu/',
  type: 'AboutPage',
  title: 'Giới thiệu và chính sách biên tập',
  description:
    'Giới thiệu website Kho Dữ Liệu Việt: mục tiêu, tác giả, quy trình biên tập, tiêu chuẩn nguồn tham khảo và cách báo lỗi nội dung.',
  h1: 'Giới thiệu và chính sách biên tập',
  about: ['dw'],
  mentions: [],
  summary: [
    'Website cung cấp kiến thức nền tảng về Data Warehouse bằng tiếng Việt, trung lập, không quảng cáo sản phẩm.',
    'Mọi khẳng định kỹ thuật đều dẫn nguồn: sách gốc, bài báo học thuật hoặc tài liệu chính thức của nhà cung cấp.',
  ],
  body: `
<section id="muc-tieu">
  <h2>Mục tiêu của website</h2>
  <p>Kho Dữ Liệu Việt giải thích các khái niệm Data Warehouse, Data Mart, Data Lakehouse, ETL/ELT và mô hình hóa dữ liệu cho sinh viên, kỹ sư dữ liệu mới vào nghề và người làm nghiệp vụ cần hiểu hệ thống BI.</p>
</section>

<section id="tac-gia">
  <h2>Tác giả</h2>
  <p>Nội dung được biên soạn bởi <strong>{{AUTHOR_NAME}}</strong>{{AUTHOR_LINK}}.</p>
</section>

<section id="quy-trinh">
  <h2>Quy trình biên tập</h2>
  <ol>
    <li>Xác định câu hỏi người đọc thực sự hỏi (từ khóa, câu hỏi thường gặp).</li>
    <li>Tra cứu nguồn gốc: sách của Inmon, Kimball; bài báo khoa học; tài liệu chính thức của AWS, Microsoft, Databricks.</li>
    <li>Viết câu trả lời trực tiếp ở đầu mỗi mục, sau đó mới giải thích chi tiết.</li>
    <li>Kiểm tra lại từng liên kết nguồn trước khi xuất bản; ghi ngày cập nhật trên mỗi trang.</li>
    <li>Rà soát định kỳ và cập nhật khi công nghệ thay đổi.</li>
  </ol>
</section>

<section id="tieu-chuan-nguon">
  <h2>Tiêu chuẩn nguồn tham khảo</h2>
  <div class="table-wrap">
  <table>
    <caption>Thứ tự ưu tiên nguồn</caption>
    <thead><tr><th scope="col">Mức</th><th scope="col">Loại nguồn</th><th scope="col">Ví dụ</th></tr></thead>
    <tbody>
      <tr><td>1</td><td>Sách, bài báo gốc của tác giả khái niệm</td><td>Inmon (1992), Kimball &amp; Ross (2013), CIDR 2021</td></tr>
      <tr><td>2</td><td>Tài liệu chính thức của nhà cung cấp nền tảng</td><td>AWS, Microsoft Learn, Databricks</td></tr>
      <tr><td>3</td><td>Bách khoa mở, dùng để đối chiếu mốc lịch sử</td><td>Wikipedia</td></tr>
    </tbody>
  </table>
  </div>
  <p>Website không đăng số liệu thị trường không rõ nguồn và không nhận tài trợ từ nhà cung cấp công nghệ.</p>
</section>

<section id="bao-loi">
  <h2>Báo lỗi nội dung</h2>
  <p>Nếu phát hiện thông tin sai hoặc liên kết hỏng, vui lòng liên hệ tác giả kèm đường dẫn trang và nguồn đối chiếu.</p>
</section>
`,
  faqs: [],
  related: ['', 'faq/', 'thuat-ngu/'],
};
