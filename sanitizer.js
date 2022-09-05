const sanitizeHtml = require("sanitize-html");

const sanitizeOption = {
  allowedTags: [
    "h1",
    "h2",
    "b",
    "i",
    "u",
    "s",
    "p",
    "ul",
    "ol",
    "li",
    "blockquote",
    "a",
    "img",
  ],
  allowedAttributes: {
    a: ["href", "name", "target"],
    img: ["src"],
    li: ["class"],
  },
  allowedSchemes: ["data", "http"],
};

exports.sanitizer = (req, res, next) => {
  const filtered = sanitizeHtml(req.body.title, sanitizeOption); // 게시글 내용 req.body.content를 sanitize하여 결과 문자열을 변수에 저장
  console.log(req.body);
  console.log(filtered);
  filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`; // 게시글 내용은 200자 제한이 있다면
  req.filtered = filtered; // 새로만든 req.filtered 객체에 소독한 문자열을 저장
  next(); // 다음 미들웨어로
};
