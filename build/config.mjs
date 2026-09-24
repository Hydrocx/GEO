// Cấu hình chung của website. Sửa 2 giá trị SITE.url và AUTHOR trước khi deploy
// hoặc truyền qua biến môi trường: SITE_URL, AUTHOR_NAME, AUTHOR_URL.
export const SITE = {
  url: (process.env.SITE_URL || 'https://example.com').replace(/\/$/, ''),
  name: 'Kho Dữ Liệu Việt',
  tagline: 'Kiến thức Data Warehouse, Data Mart, Data Lakehouse bằng tiếng Việt',
  lang: 'vi',
  locale: 'vi_VN',
  published: '2026-09-24',
  modified: '2026-09-24',
};

export const AUTHOR = {
  name: process.env.AUTHOR_NAME || 'Nguyễn Anh Quân',
  url: process.env.AUTHOR_URL || '', // ví dụ: link LinkedIn / GitHub của tác giả
  jobTitle: 'Sinh viên / Data Engineer',
};
