require("dotenv").config;
const express = require("express");
const helmet = require("helmet");
const sanitizeHtml = require("sanitize-html");
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

/*Sanitize-HTML*/
const dirty = `스크립트는 과연 <script>some really tacky HTML</script> 무시될까? h1태그는 <h1>링크</h1> 무시가 될까?`;

const clean = sanitizeHtml(dirty);

console.log(clean);

// const dirty = `h1태그는 <h1>링크</h1> 무시가 될까?`;

// const sanitizedDescription = sanitizeHtml(dirty, {
//   allowedTags: ["h1", "a"], // h1 , a 태그 허용
//   allowedAttributes: { a: ["href"] }, // a 태그의 href 속성 허용
//   allowedFrameHostnames: ["www.youtube.com"], // iframe 허용하되 유튜브 사이트만 허용
// });

// console.log(sanitizedDescription); // 출력 : h1태그는 <h1>링크</h1> 무시가 될까?
