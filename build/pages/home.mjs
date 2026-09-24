export default {
  slug: '',
  type: 'TechArticle',
  title: 'Data Warehouse là gì? Định nghĩa, kiến trúc và ví dụ',
  description:
    'Data Warehouse (kho dữ liệu) là hệ thống lưu trữ tập trung dữ liệu đã tích hợp từ nhiều nguồn để phân tích và báo cáo. Định nghĩa, 4 đặc tính, kiến trúc, OLTP vs OLAP.',
  h1: 'Data Warehouse là gì? Định nghĩa, kiến trúc và cách hoạt động',
  about: ['dw'],
  mentions: ['olap', 'oltp', 'etl', 'dm', 'bi', 'inmon', 'kimball'],
  summary: [
    '<strong>Data Warehouse (kho dữ liệu)</strong> là hệ thống lưu trữ tập trung, chứa dữ liệu đã được làm sạch và tích hợp từ nhiều hệ thống nguồn, được tổ chức để <strong>phân tích và báo cáo</strong> thay vì xử lý giao dịch hằng ngày.',
    'Theo Bill Inmon, kho dữ liệu có 4 đặc tính: <strong>hướng chủ đề, tích hợp, gắn với thời gian, không thay đổi</strong> {{cite:inmon1992}}.',
    'Dữ liệu thường đi theo luồng: <strong>hệ thống nguồn → ETL/ELT → kho dữ liệu → data mart / semantic layer → công cụ BI</strong>.',
    'Ví dụ nền tảng phổ biến: Amazon Redshift, Google BigQuery, Snowflake, Microsoft Fabric Data Warehouse, Databricks SQL.',
  ],
  body: `
<section id="dinh-nghia">
  <h2>Data Warehouse là gì?</h2>
  <p><dfn>Data Warehouse</dfn> (tiếng Việt: <em>kho dữ liệu</em>, viết tắt DW hoặc DWH) là một kho lưu trữ tập trung chứa dữ liệu lịch sử đã được tích hợp từ nhiều nguồn như ERP, CRM, hệ thống bán hàng, file Excel. AWS mô tả kho dữ liệu là <q>một kho thông tin tập trung có thể được phân tích để đưa ra quyết định tốt hơn</q> {{cite:awsDW}}.</p>
  <p>Định nghĩa kinh điển nhất đến từ Bill Inmon — người thường được gọi là “cha đẻ của data warehouse”:</p>
  <blockquote cite="Inmon, Building the Data Warehouse, 1992">
    <p>“A data warehouse is a subject-oriented, integrated, time-variant, and non-volatile collection of data in support of management's decision making process.”</p>
    <footer>— W. H. Inmon, <cite>Building the Data Warehouse</cite> (1992) {{cite:inmon1992}}</footer>
  </blockquote>
</section>

<section id="4-dac-tinh">
  <h2>4 đặc tính của Data Warehouse theo Inmon</h2>
  <div class="table-wrap">
  <table>
    <caption>Bốn đặc tính cốt lõi của kho dữ liệu</caption>
    <thead><tr><th scope="col">Đặc tính</th><th scope="col">Ý nghĩa</th><th scope="col">Ví dụ</th></tr></thead>
    <tbody>
      <tr><th scope="row">Hướng chủ đề (subject-oriented)</th><td>Tổ chức theo chủ đề kinh doanh, không theo ứng dụng</td><td>Chủ đề “Khách hàng”, “Doanh thu”, “Tồn kho”</td></tr>
      <tr><th scope="row">Tích hợp (integrated)</th><td>Dữ liệu từ nhiều nguồn được chuẩn hóa về cùng định dạng, mã, đơn vị</td><td>Mã khách hàng ở CRM và ERP được hợp nhất thành một</td></tr>
      <tr><th scope="row">Gắn với thời gian (time-variant)</th><td>Lưu lịch sử, mỗi bản ghi gắn với một mốc hoặc khoảng thời gian</td><td>Doanh thu theo ngày trong 5 năm gần nhất</td></tr>
      <tr><th scope="row">Không thay đổi (non-volatile)</th><td>Dữ liệu đã nạp chủ yếu được đọc, không bị ghi đè như hệ thống giao dịch</td><td>Đơn hàng tháng trước không bị sửa trực tiếp trong kho</td></tr>
    </tbody>
  </table>
  </div>
</section>

<section id="oltp-olap">
  <h2>Data Warehouse khác gì cơ sở dữ liệu giao dịch (OLTP)?</h2>
  <p>Cơ sở dữ liệu giao dịch (<abbr title="Online Transaction Processing">OLTP</abbr>) tối ưu cho việc ghi từng bản ghi nhỏ, nhanh. Kho dữ liệu phục vụ xử lý phân tích (<abbr title="Online Analytical Processing">OLAP</abbr>): đọc khối lượng lớn, tổng hợp, so sánh theo thời gian. Microsoft Learn mô tả hệ OLAP được <q>tối ưu cho tác vụ đọc nhiều, ghi ít</q> và thường giữ dữ liệu lịch sử cho phân tích chuỗi thời gian {{cite:msOLAP}}.</p>
  <div class="table-wrap">
  <table>
    <caption>So sánh OLTP và Data Warehouse (OLAP)</caption>
    <thead><tr><th scope="col">Tiêu chí</th><th scope="col">OLTP (CSDL giao dịch)</th><th scope="col">Data Warehouse (OLAP)</th></tr></thead>
    <tbody>
      <tr><th scope="row">Mục đích</th><td>Vận hành nghiệp vụ hằng ngày</td><td>Phân tích, báo cáo, ra quyết định</td></tr>
      <tr><th scope="row">Kiểu truy vấn</th><td>Đọc/ghi từng bản ghi</td><td>Đọc và tổng hợp hàng triệu bản ghi</td></tr>
      <tr><th scope="row">Mô hình dữ liệu</th><td>Chuẩn hóa (thường 3NF)</td><td>Star schema, snowflake schema hoặc cube</td></tr>
      <tr><th scope="row">Dữ liệu lịch sử</th><td>Chủ yếu dữ liệu hiện hành</td><td>Lưu lịch sử nhiều năm</td></tr>
      <tr><th scope="row">Người dùng</th><td>Nhân viên nghiệp vụ, ứng dụng</td><td>Nhà phân tích, quản lý, công cụ BI</td></tr>
      <tr><th scope="row">Ví dụ</th><td>SQL Server, PostgreSQL, MySQL của hệ bán hàng</td><td>BigQuery, Redshift, Snowflake, Fabric Warehouse</td></tr>
    </tbody>
  </table>
  </div>
</section>

<section id="kien-truc">
  <h2>Kiến trúc Data Warehouse gồm những tầng nào?</h2>
  <p>Một kiến trúc kho dữ liệu điển hình có 5 tầng:</p>
  <figure class="diagram">
    <svg viewBox="0 0 760 120" role="img" aria-labelledby="dg-title dg-desc">
      <title id="dg-title">Luồng dữ liệu trong kiến trúc Data Warehouse</title>
      <desc id="dg-desc">Hệ thống nguồn, sang ETL/ELT, sang kho dữ liệu, sang data mart, sang công cụ BI.</desc>
      <g font-family="Arial, sans-serif" font-size="14" text-anchor="middle">
        <rect x="4" y="30" width="130" height="60" rx="8" class="d-box"/><text x="69" y="65" class="d-text">Nguồn</text>
        <rect x="160" y="30" width="130" height="60" rx="8" class="d-box"/><text x="225" y="65" class="d-text">ETL / ELT</text>
        <rect x="316" y="30" width="130" height="60" rx="8" class="d-box d-core"/><text x="381" y="65" class="d-text d-text-core">Data Warehouse</text>
        <rect x="472" y="30" width="130" height="60" rx="8" class="d-box"/><text x="537" y="65" class="d-text">Data Mart</text>
        <rect x="628" y="30" width="128" height="60" rx="8" class="d-box"/><text x="692" y="65" class="d-text">BI / Báo cáo</text>
        <g class="d-arrow"><path d="M136 60h20M292 60h20M448 60h20M604 60h20"/></g>
      </g>
    </svg>
    <figcaption>Hình 1. Luồng dữ liệu điển hình từ hệ thống nguồn tới báo cáo.</figcaption>
  </figure>
  <ol>
    <li><strong>Tầng nguồn (source):</strong> ERP, CRM, POS, website, file, API.</li>
    <li><strong>Tầng tích hợp (ETL/ELT, staging):</strong> trích xuất, làm sạch, chuẩn hóa dữ liệu. Xem thêm <a href="/etl-vs-elt/">ETL và ELT khác nhau thế nào</a>.</li>
    <li><strong>Tầng kho dữ liệu lõi (core/EDW):</strong> dữ liệu tích hợp, có lịch sử, là “nguồn sự thật duy nhất” (single source of truth).</li>
    <li><strong>Tầng data mart / semantic layer:</strong> tập dữ liệu theo phòng ban hoặc chủ đề, đặt tên thân thiện với người dùng. Xem <a href="/data-mart-la-gi/">Data Mart là gì</a>.</li>
    <li><strong>Tầng khai thác:</strong> dashboard, báo cáo, phân tích tự phục vụ, mô hình ML.</li>
  </ol>
  <p>Với nền tảng lakehouse, các tầng này thường được đặt tên theo <strong>kiến trúc medallion</strong>: Bronze (dữ liệu thô), Silver (đã làm sạch), Gold (đã tổng hợp theo nhu cầu kinh doanh) {{cite:dbxMedallion}}.</p>
</section>

<section id="loi-ich">
  <h2>Lợi ích của Data Warehouse đối với doanh nghiệp</h2>
  <ul>
    <li><strong>Một nguồn số liệu thống nhất:</strong> các phòng ban dùng chung định nghĩa KPI, tránh tình trạng “mỗi báo cáo một con số” {{cite:msOLAP}}.</li>
    <li><strong>Không ảnh hưởng hệ thống vận hành:</strong> truy vấn phân tích nặng chạy trên kho, không làm chậm hệ thống bán hàng {{cite:msOLAP}}.</li>
    <li><strong>Phân tích xu hướng lịch sử:</strong> so sánh cùng kỳ, theo mùa, theo nhiều năm.</li>
    <li><strong>Chất lượng dữ liệu tốt hơn:</strong> dữ liệu được kiểm tra, chuẩn hóa trước khi dùng.</li>
    <li><strong>Nền tảng cho BI, AI/ML:</strong> dữ liệu sạch, có cấu trúc là đầu vào cho dashboard và mô hình dự báo.</li>
  </ul>
</section>

<section id="lich-su">
  <h2>Lịch sử phát triển của Data Warehouse</h2>
  <div class="table-wrap">
  <table>
    <caption>Các mốc quan trọng</caption>
    <thead><tr><th scope="col">Năm</th><th scope="col">Sự kiện</th></tr></thead>
    <tbody>
      <tr><td>1988</td><td>Barry Devlin và Paul Murphy (IBM) công bố kiến trúc “business data warehouse” trên IBM Systems Journal {{cite:devlin1988}}.</td></tr>
      <tr><td>1992</td><td>Bill Inmon xuất bản <cite>Building the Data Warehouse</cite>, đưa ra định nghĩa 4 đặc tính {{cite:inmon1992}}.</td></tr>
      <tr><td>1996</td><td>Ralph Kimball xuất bản <cite>The Data Warehouse Toolkit</cite>, phổ biến mô hình hóa chiều (star schema) {{cite:wikiDW}}.</td></tr>
      <tr><td>2010s</td><td>Kho dữ liệu trên cloud (Redshift, BigQuery, Snowflake) và khái niệm data lake trở nên phổ biến {{cite:wikiDL}}.</td></tr>
      <tr><td>2021</td><td>Bài báo CIDR đề xuất kiến trúc Lakehouse, hợp nhất data lake và data warehouse {{cite:armbrust2021}}.</td></tr>
    </tbody>
  </table>
  </div>
</section>

<section id="khi-nao-can">
  <h2>Khi nào doanh nghiệp cần xây dựng Data Warehouse?</h2>
  <p>Các dấu hiệu thường gặp:</p>
  <ul>
    <li>Dữ liệu nằm rải rác ở nhiều hệ thống, phải ghép tay bằng Excel mỗi kỳ báo cáo.</li>
    <li>Số liệu giữa các phòng ban không khớp nhau.</li>
    <li>Chạy báo cáo trực tiếp trên hệ thống giao dịch làm hệ thống chậm.</li>
    <li>Cần phân tích lịch sử nhiều năm mà hệ thống nguồn không lưu giữ.</li>
    <li>Muốn triển khai dashboard tự phục vụ hoặc mô hình AI/ML trên dữ liệu doanh nghiệp.</li>
  </ul>
</section>

<section id="cac-buoc">
  <h2>Các bước xây dựng Data Warehouse</h2>
  <ol>
    <li><strong>Xác định mục tiêu kinh doanh và KPI</strong> cần đo lường.</li>
    <li><strong>Khảo sát hệ thống nguồn:</strong> dữ liệu nằm ở đâu, chất lượng ra sao, tần suất cập nhật.</li>
    <li><strong>Chọn kiến trúc và phương pháp:</strong> <a href="/kimball-vs-inmon/">Kimball, Inmon hay Data Vault</a>; data warehouse hay <a href="/data-warehouse-vs-data-lake-vs-lakehouse/">lakehouse</a>.</li>
    <li><strong>Thiết kế mô hình dữ liệu</strong> theo quy trình 4 bước của Kimball: chọn quy trình nghiệp vụ → xác định grain (mức chi tiết) → xác định dimension → xác định fact {{cite:kimballTechniques}}. Xem <a href="/star-schema-snowflake-schema/">Star schema và Snowflake schema</a>.</li>
    <li><strong>Xây dựng pipeline ETL/ELT</strong> và lịch chạy.</li>
    <li><strong>Kiểm thử chất lượng dữ liệu</strong> (đối soát số liệu với nguồn).</li>
    <li><strong>Xây dựng semantic layer và báo cáo BI.</strong></li>
    <li><strong>Quản trị dữ liệu (data governance):</strong> phân quyền, từ điển dữ liệu, giám sát.</li>
  </ol>
</section>
`,
  faqs: [
    {
      q: 'Data Warehouse tiếng Việt là gì?',
      a: 'Data Warehouse trong tiếng Việt là “kho dữ liệu”: hệ thống lưu trữ tập trung dữ liệu đã tích hợp từ nhiều nguồn, dùng cho phân tích và báo cáo.',
    },
    {
      q: 'Data Warehouse có phải là cơ sở dữ liệu không?',
      a: 'Có, về kỹ thuật kho dữ liệu thường chạy trên một hệ quản trị cơ sở dữ liệu, nhưng được thiết kế cho truy vấn phân tích (OLAP) với dữ liệu lịch sử, khác với cơ sở dữ liệu giao dịch (OLTP) tối ưu cho ghi từng bản ghi.',
    },
    {
      q: 'Ai là người đặt nền móng cho Data Warehouse?',
      a: 'Barry Devlin và Paul Murphy (IBM) công bố kiến trúc “business data warehouse” năm 1988; Bill Inmon đưa ra định nghĩa kinh điển năm 1992; Ralph Kimball phổ biến phương pháp mô hình hóa chiều năm 1996.',
    },
    {
      q: 'Doanh nghiệp nhỏ có cần Data Warehouse không?',
      a: 'Không bắt buộc. Doanh nghiệp nhỏ có ít nguồn dữ liệu có thể bắt đầu bằng báo cáo trực tiếp hoặc một data mart nhỏ trên cloud; kho dữ liệu trở nên cần thiết khi có nhiều nguồn, số liệu không khớp hoặc cần phân tích lịch sử dài.',
    },
    {
      q: 'Công cụ Data Warehouse phổ biến hiện nay là gì?',
      a: 'Các nền tảng phổ biến gồm Amazon Redshift, Google BigQuery, Snowflake, Microsoft Fabric Data Warehouse, Azure Synapse Analytics và Databricks SQL.',
    },
  ],
  related: ['data-warehouse-vs-data-lake-vs-lakehouse/', 'kimball-vs-inmon/', 'etl-vs-elt/', 'data-mart-la-gi/'],
};
