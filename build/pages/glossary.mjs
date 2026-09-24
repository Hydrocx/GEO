// Mỗi thuật ngữ được xuất thành DefinedTerm trong schema DefinedTermSet.
export const TERMS = [
  { id: 'data-warehouse', term: 'Data Warehouse (DW, DWH)', def: 'Kho dữ liệu: hệ thống lưu trữ tập trung dữ liệu đã tích hợp, có lịch sử, phục vụ phân tích và báo cáo.', link: '/' },
  { id: 'data-mart', term: 'Data Mart', def: 'Kho dữ liệu phạm vi hẹp, phục vụ một phòng ban hoặc một chủ đề nghiệp vụ.', link: '/data-mart-la-gi/' },
  { id: 'data-lake', term: 'Data Lake', def: 'Hồ dữ liệu: kho lưu trữ dữ liệu thô mọi định dạng ở quy mô lớn, áp schema khi đọc.', link: '/data-warehouse-vs-data-lake-vs-lakehouse/' },
  { id: 'data-lakehouse', term: 'Data Lakehouse', def: 'Kiến trúc kết hợp lưu trữ mở chi phí thấp của data lake với giao dịch ACID và quản trị dữ liệu của data warehouse.', link: '/data-warehouse-vs-data-lake-vs-lakehouse/' },
  { id: 'edw', term: 'Enterprise Data Warehouse (EDW)', def: 'Kho dữ liệu doanh nghiệp, tích hợp dữ liệu toàn tổ chức; trung tâm của phương pháp Inmon.', link: '/kimball-vs-inmon/' },
  { id: 'oltp', term: 'OLTP', def: 'Online Transaction Processing: hệ thống xử lý giao dịch, tối ưu cho đọc/ghi từng bản ghi.', link: '/#oltp-olap' },
  { id: 'olap', term: 'OLAP', def: 'Online Analytical Processing: xử lý phân tích, tối ưu cho truy vấn đọc nhiều và tổng hợp dữ liệu lớn.', link: '/#oltp-olap' },
  { id: 'etl', term: 'ETL', def: 'Extract – Transform – Load: trích xuất, biến đổi trên engine riêng, rồi nạp vào kho.', link: '/etl-vs-elt/' },
  { id: 'elt', term: 'ELT', def: 'Extract – Load – Transform: nạp dữ liệu thô vào kho trước, biến đổi ngay trong kho.', link: '/etl-vs-elt/' },
  { id: 'reverse-etl', term: 'Reverse ETL', def: 'Đưa dữ liệu đã mô hình hóa từ kho dữ liệu ngược về các hệ thống vận hành như CRM.', link: '/etl-vs-elt/#reverse-etl' },
  { id: 'staging', term: 'Staging area', def: 'Vùng lưu tạm dữ liệu trích xuất từ nguồn trước khi làm sạch và nạp vào kho.', link: '/#kien-truc' },
  { id: 'fact-table', term: 'Fact table (bảng fact)', def: 'Bảng chứa số đo định lượng của sự kiện nghiệp vụ và khóa ngoại tới các dimension.', link: '/star-schema-snowflake-schema/' },
  { id: 'dimension-table', term: 'Dimension table (bảng dimension)', def: 'Bảng chứa thuộc tính mô tả dùng để lọc, nhóm và gắn nhãn số đo.', link: '/star-schema-snowflake-schema/' },
  { id: 'grain', term: 'Grain', def: 'Mức chi tiết mà một dòng trong bảng fact biểu diễn.', link: '/star-schema-snowflake-schema/#fact-dimension' },
  { id: 'star-schema', term: 'Star schema', def: 'Lược đồ hình sao: bảng fact ở trung tâm nối trực tiếp với các dimension phi chuẩn hóa.', link: '/star-schema-snowflake-schema/' },
  { id: 'snowflake-schema', term: 'Snowflake schema', def: 'Lược đồ bông tuyết: dimension được chuẩn hóa thành nhiều bảng phân cấp.', link: '/star-schema-snowflake-schema/#snowflake-schema' },
  { id: 'conformed-dimension', term: 'Conformed dimension', def: 'Dimension dùng chung với cùng khóa và cùng ý nghĩa giữa nhiều bảng fact.', link: '/kimball-vs-inmon/#kimball' },
  { id: 'scd', term: 'Slowly Changing Dimension (SCD)', def: 'Kỹ thuật xử lý thay đổi thuộc tính dimension theo thời gian; có 8 loại từ Type 0 đến Type 7.', link: '/star-schema-snowflake-schema/#scd' },
  { id: 'surrogate-key', term: 'Surrogate key', def: 'Khóa thay thế do kho dữ liệu tự sinh, không phụ thuộc khóa của hệ thống nguồn.', link: '/star-schema-snowflake-schema/#fact-dimension' },
  { id: 'data-vault', term: 'Data Vault', def: 'Phương pháp mô hình hóa gồm Hub, Link, Satellite, tối ưu cho tích hợp nhiều nguồn và lưu vết.', link: '/kimball-vs-inmon/#data-vault' },
  { id: 'medallion', term: 'Medallion architecture', def: 'Mẫu tổ chức dữ liệu lakehouse theo 3 tầng Bronze (thô), Silver (đã làm sạch), Gold (đã tổng hợp).', link: '/#kien-truc' },
  { id: 'semantic-layer', term: 'Semantic layer', def: 'Lớp ngữ nghĩa đặt trên kho dữ liệu, định nghĩa số đo, quan hệ và tên thân thiện cho người dùng BI.', link: '/#kien-truc' },
];

export default {
  slug: 'thuat-ngu/',
  type: 'Glossary',
  title: 'Thuật ngữ Data Warehouse: Từ điển Anh – Việt',
  description:
    'Từ điển thuật ngữ Data Warehouse Anh – Việt: OLAP, OLTP, ETL, ELT, fact, dimension, grain, star schema, SCD, Data Vault, lakehouse, medallion. Giải thích ngắn gọn.',
  h1: 'Thuật ngữ Data Warehouse (Anh – Việt)',
  about: ['dw'],
  mentions: ['dl', 'lakehouse', 'dm', 'etl', 'elt', 'olap', 'oltp', 'star', 'snowflake', 'scd', 'dataVault'],
  summary: [
    `${TERMS.length} thuật ngữ cốt lõi về kho dữ liệu, mỗi thuật ngữ có định nghĩa một câu và liên kết tới bài viết chi tiết.`,
  ],
  body: `
<section id="danh-sach">
  <h2>Danh sách thuật ngữ</h2>
  <dl class="defs glossary">
    ${TERMS.map((t) => `<dt id="${t.id}"><dfn>${t.term}</dfn></dt>\n    <dd>${t.def} <a href="${t.link}">Xem thêm</a></dd>`).join('\n    ')}
  </dl>
</section>
`,
  faqs: [],
  related: ['', 'faq/'],
};
