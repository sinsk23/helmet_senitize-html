# helmet_senitize-html

연습

- Helmet은 Express의 미들웨어 모듈
- Helmet 또한 여러 미들웨어 모듈을 합쳐 놓은 미들웨어 패키지 모듈
  (익스프레스 기반 어플리케이션에서 HTTP response header를 설정하는 여러개의 작은 미들웨어 함수 유형 모음)

...
// 기본 설정 기능 사용
app.use(helmet());

// or

// 특정 세부 기능 하나하나 설정할때 사용
app.use(helmet.contentSecurityPolicy());
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

https://inpa.tistory.com/entry/NODE-%EB%B3%B4%EC%95%88-%F0%9F%93%9A-helmet-%EB%AA%A8%EB%93%88-%EC%82%AC%EC%9A%A9%EB%B2%95-%EC%9B%B9-%EB%B3%B4%EC%95%88%EC%9D%80-%EB%82%B4%EA%B0%80-%F0%9F%91%AE

- sanitize-html은 기본적으로 대부분의 태그 문자열을 비허용하여 필터링시키지만, 사용자 지정으로 특정한 태그를 지정해 허용
- 만약, allowedTags: false, allowedAttributes: false 와 같은 옵션을 주면, 모든 태그와 속성을 허용
- 반대로 allowedTags: [], allowedAttributes: [] 와 같은 옵션은 모든 태그를 금지
- 본인이 구현하는 웹 서비스에 맞게 허용/허용하지 않는 태그 및 속성들을 설정할 수 있음

https://inpa.tistory.com/entry/NODE-%EB%B3%B4%EC%95%88-%F0%9F%93%9A-sanitize-html-%EB%AA%A8%EB%93%88-%EC%82%AC%EC%9A%A9%EB%B2%95
