export default {
  slug: 'etl-vs-elt/',
  type: 'TechArticle',
  title: 'ETL vs ELT: Khác nhau thế nào và khi nào nên dùng?',
  description:
    'ETL biến đổi dữ liệu trước khi nạp vào kho; ELT nạp trước rồi biến đổi ngay trong kho dữ liệu. Bảng so sánh ETL và ELT, Reverse ETL, streaming và công cụ phổ biến.',
  h1: 'ETL và ELT khác nhau thế nào?',
  about: ['etl', 'elt'],
  mentions: ['dw', 'dl', 'lakehouse'],
  summary: [
    '<strong>ETL</strong> (Extract – Transform – Load): trích xuất, <strong>biến đổi trên một engine riêng</strong>, rồi mới nạp vào kho {{cite:msETL}}.',
    '<strong>ELT</strong> (Extract – Load – Transform): trích xuất, <strong>nạp dữ liệu thô vào kho trước</strong>, rồi dùng sức mạnh tính toán của kho để biến đổi {{cite:msETL}}.',
    'Theo AWS, ELT hiện là cách tiếp cận tiêu chuẩn cho phân tích trên cloud; ETL vẫn phù hợp với hệ thống cũ hoặc khi cần xử lý trước khi nạp {{cite:awsETL}}.',
    'Khác biệt cốt lõi duy nhất: <strong>nơi diễn ra bước biến đổi</strong>.',
  ],
  body: `
<section id="etl">
  <h2>ETL là gì?</h2>
  <p><dfn>ETL</dfn> (Extract, Transform, Load) là quy trình tích hợp dữ liệu từ nhiều nguồn vào một kho dữ liệu thống nhất. Ở bước Transform, dữ liệu được biến đổi theo quy tắc nghiệp vụ trên một engine chuyên dụng, thường dùng bảng staging tạm thời trước khi nạp vào đích {{cite:msETL}}.</p>
  <p>Các phép biến đổi thường gặp: lọc, sắp xếp, tổng hợp, kết nối (join), làm sạch, loại trùng và kiểm tra hợp lệ {{cite:msETL}}.</p>
</section>

<section id="elt">
  <h2>ELT là gì?</h2>
  <p><dfn>ELT</dfn> (Extract, Load, Transform) chỉ khác ETL ở vị trí thực hiện biến đổi: phép biến đổi diễn ra <em>ngay trong kho dữ liệu đích</em>. Kiến trúc đơn giản hơn vì bỏ được engine biến đổi riêng, và khi mở rộng kho thì hiệu năng pipeline cũng tăng theo. Tuy nhiên, ELT chỉ hiệu quả khi hệ thống đích đủ mạnh {{cite:msETL}}.</p>
</section>

<section id="bang-so-sanh">
  <h2>Bảng so sánh ETL và ELT</h2>
  <div class="table-wrap">
  <table>
    <caption>ETL và ELT theo từng tiêu chí</caption>
    <thead><tr><th scope="col">Tiêu chí</th><th scope="col">ETL</th><th scope="col">ELT</th></tr></thead>
    <tbody>
      <tr><th scope="row">Thứ tự</th><td>Extract → Transform → Load</td><td>Extract → Load → Transform</td></tr>
      <tr><th scope="row">Nơi biến đổi</th><td>Máy chủ/engine xử lý riêng</td><td>Trong kho dữ liệu hoặc lakehouse đích {{cite:awsETL}}</td></tr>
      <tr><th scope="row">Loại dữ liệu phù hợp</th><td>Chủ yếu dữ liệu có cấu trúc</td><td>Có cấu trúc, bán cấu trúc, phi cấu trúc {{cite:awsETL}}</td></tr>
      <tr><th scope="row">Dữ liệu thô</th><td>Thường không giữ lại trong kho</td><td>Giữ lại, có thể biến đổi lại khi logic thay đổi</td></tr>
      <tr><th scope="row">Hạ tầng</th><td>Thêm hệ thống xử lý trung gian</td><td>Ít hệ thống cần vận hành hơn {{cite:awsETL}}</td></tr>
      <tr><th scope="row">Phù hợp khi</th><td>Hệ thống đích hạn chế tài nguyên; quy tắc phức tạp cần engine riêng; yêu cầu tuân thủ phải kiểm tra trước khi nạp {{cite:msETL}}</td><td>Đích là kho dữ liệu/lakehouse cloud co giãn; cần giữ dữ liệu thô cho khám phá {{cite:msETL}}</td></tr>
      <tr><th scope="row">Công cụ ví dụ</th><td>SQL Server Integration Services (SSIS), Informatica PowerCenter, Talend</td><td>dbt, SQL trong BigQuery/Snowflake/Fabric, Spark trên lakehouse</td></tr>
    </tbody>
  </table>
  </div>
</section>

<section id="chon">
  <h2>Khi nào nên dùng ETL, khi nào nên dùng ELT?</h2>
  <p>Theo Microsoft Azure Architecture Center {{cite:msETL}}:</p>
  <ul>
    <li><strong>Chọn ETL</strong> khi cần giảm tải phép biến đổi nặng khỏi hệ thống đích hạn chế; khi quy tắc nghiệp vụ phức tạp cần engine chuyên dụng; khi quy định tuân thủ yêu cầu kiểm tra dữ liệu ở staging trước khi nạp.</li>
    <li><strong>Chọn ELT</strong> khi đích là data warehouse hoặc lakehouse hiện đại có khả năng co giãn; khi cần giữ dữ liệu thô cho phân tích khám phá hoặc thay đổi schema sau này; khi logic biến đổi tận dụng được năng lực có sẵn của hệ thống đích.</li>
  </ul>
</section>

<section id="reverse-etl">
  <h2>Reverse ETL là gì?</h2>
  <p><dfn>Reverse ETL</dfn> là quá trình đưa dữ liệu đã được mô hình hóa từ kho dữ liệu hoặc lakehouse <em>ngược trở lại</em> các hệ thống vận hành như CRM, công cụ marketing automation, hệ thống chăm sóc khách hàng — để người dùng nghiệp vụ hành động trực tiếp trên dữ liệu đó {{cite:msETL}}.</p>
</section>

<section id="streaming">
  <h2>ETL/ELT theo lô và xử lý luồng (streaming)</h2>
  <p>ETL và ELT thường chạy theo lô (batch) theo lịch. Với xử lý luồng, dữ liệu được đưa vào message broker (như Apache Kafka, Azure Event Hubs), xử lý liên tục bởi stream processor rồi chuyển tới dashboard, cảnh báo hoặc cơ sở dữ liệu. Các trường hợp điển hình: phát hiện gian lận giao dịch, giám sát thiết bị sản xuất, dashboard vận hành thời gian thực {{cite:msETL}}.</p>
</section>
`,
  faqs: [
    {
      q: 'ETL và ELT khác nhau ở điểm nào?',
      a: 'Khác nhau ở nơi thực hiện biến đổi: ETL biến đổi dữ liệu trên một engine riêng trước khi nạp vào kho; ELT nạp dữ liệu thô vào kho trước rồi biến đổi bằng năng lực tính toán của chính kho dữ liệu.',
    },
    {
      q: 'ELT có tốt hơn ETL không?',
      a: 'Không có phương án tốt hơn tuyệt đối. ELT phù hợp với kho dữ liệu và lakehouse cloud co giãn; ETL phù hợp khi hệ thống đích hạn chế tài nguyên, quy tắc biến đổi phức tạp hoặc cần kiểm tra tuân thủ trước khi nạp.',
    },
    {
      q: 'dbt là ETL hay ELT?',
      a: 'dbt là công cụ cho bước Transform trong ELT: nó chạy các câu lệnh SQL biến đổi dữ liệu ngay bên trong kho dữ liệu, không tự thực hiện bước Extract và Load.',
    },
    {
      q: 'Reverse ETL dùng để làm gì?',
      a: 'Reverse ETL đẩy dữ liệu đã mô hình hóa từ kho dữ liệu ngược về các ứng dụng vận hành như CRM hoặc công cụ marketing để đội kinh doanh dùng trực tiếp, ví dụ đồng bộ điểm khách hàng tiềm năng vào CRM.',
    },
  ],
  related: ['', 'data-warehouse-vs-data-lake-vs-lakehouse/', 'thuat-ngu/'],
};
