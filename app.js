require("dotenv").config;
const express = require("express");
const port = 3444;
const helmet = require("helmet");
const sanitizeHtml = require("sanitize-html");
const { sanitizer } = require("./sanitizer");
const { Posts } = require("./models");
const app = express();
const morgan = require("morgan");
// 기본 설정 기능 사용
app.use(helmet());
/*HELMET*/
// helmet은 개발환경에서는 필요없는 모듈이니 배포환경에서만 활성
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(helmet({ contentSecurityPolicy: false })); // contentSecurityPolicy는 꽤 복잡한 설정이기 때문에 일단 꺼둔다.
} else {
  app.use(morgan("dev"));
}
app.use(express.json());
/*Sanitize-HTML*/
//사용자가 업로드한 HTML을 sanitize-html 함수로 감싸면 허용하지 않는 태그나 스크립트는 제거
const html = "<script>location.href = 'https://gilbut.co.kr'</script>";
console.log(sanitizeHtml(html)); // ''

// const dirty = `스크립트는 과연 <script>some really tacky HTML</script> 무시될까? h1태그는 <h1>링크</h1> 무시가 될까?`;

// const clean = sanitizeHtml(dirty);

// console.log(clean);

// const dirty = `h1태그는 <h1>링크</h1> 무시가 될까?`;

// const sanitizedDescription = sanitizeHtml(dirty, {
//   allowedTags: ["a"], // a 태그 허용
//   allowedAttributes: { a: ["href"] }, // a 태그의 href 속성 허용
//   allowedFrameHostnames: ["www.youtube.com"], // iframe 허용하되 유튜브 사이트만 허용
// });

// console.log(sanitizedDescription); // 출력 : h1태그는 <h1>링크</h1> 무시가 될까?

// article/post 로 POST 요청이 오면, 사용자 미들웨어 sanitezer에서 req.content 문자열값을 소독하고 다음 미들웨어로 넘긴다
app.post("/article/post", sanitizer, async (req, res, next) => {
  const { content } = req.body;
  const { title } = req.filtered;
  // console.log(typeof req.body.title);
  // console.log(typeof req.filtered);

  const post = await Posts.create({
    title, // 게시글 제목
    content, // sanitizer 사용자 미들웨어에서 req.content를 필터링해서 만든 게시글 내용 객체
  });
  return res.status(201).json({ post });
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
module.exports = app;
