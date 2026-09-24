// Trang FAQ tổng hợp: nội dung được builder gom từ trường `faqs` của các trang khác.
export default {
  slug: 'faq/',
  type: 'FAQPage',
  title: 'Câu hỏi thường gặp về Data Warehouse (FAQ)',
  description:
    'Tổng hợp câu hỏi thường gặp về Data Warehouse, Data Lake, Lakehouse, Data Mart, ETL/ELT, Kimball, Inmon, star schema và SCD — câu trả lời ngắn gọn, có dẫn nguồn.',
  h1: 'Câu hỏi thường gặp về Data Warehouse',
  about: ['dw'],
  mentions: ['dl', 'lakehouse', 'dm', 'etl', 'elt', 'star', 'scd'],
  summary: [
    'Câu trả lời ngắn cho các câu hỏi phổ biến nhất; mỗi nhóm câu hỏi liên kết tới bài viết chi tiết.',
  ],
  body: '',
  faqs: [],
  aggregateFaqs: true,
  related: ['', 'thuat-ngu/'],
};
