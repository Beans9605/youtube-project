# Node, Express.js

node는 엔진이라고 보면, 자동차를 만드는게 Express.js임

Express.js는 프레임워크라고 보면 됨





## shell command

```shell
npm init
npm install express --save

```

index.js 생성



```json
"scripts" : {
    "start" : "node index.js"
}
```



## MongoDB 사용

1. MongoDB Cluster 생성 이후, cluster의 url 저장해놓기

2. DB access를 위한 계정 생성
3. Network IP 등록
4. mongoose 패키지 다운 받아서 적용 후 MongoDB URL 사용





## 개발할때 환경

1. local development 환경
2. Deploy를 한 후 (production)





## Token?

쿠키에다가도 토큰을 넣어주고, 서버에서는 user db에 넣어서 저장시켰는데

이유?

1. server와 client는 해당 token을 계속해서 확인
2. client에서 쿠키에 담겨져 있는 cookie를 서버에 전달, encode되어있는 token을 decode하면 user_id가 나옴
3. 즉 secretToken을 넣어서 userID를 확인해서 해당 권한을 서버에서 확인해주는 방법으로 토큰을 사용함



로그아웃을 하게 되면 cookie의 토큰도 지우고, db에 있는 해당 user의 token도 지워야함

이유?

1. 토큰은 로그인 할때마다 새로 생성됨 (보안 문제)
2. 보안 정책상 안전함



## NPM?

node package manager





## React Router DM

커다란 DOM 내에 여러 컴포넌트를 작성해서 사용







## CORS 정책

Cross-Origin Resource Sharing

Origin ==> Port

즉 서로 포트가 다른데 자원을 공유하는 경우에는 특정한 데이터를 등록하지 않는 이상 사용 할 수 없음

도메인이 서로 다른 곳에서 같은 자원을 다룬다하면 CORS정책상 사용할 수 없음

- 어떻게 사용?
  - Proxy로 해결 -> 아래 방법으로 해결이 어려울때
  - 만약 back과 front를 모두 컨트롤 할 수 있다면?
    - 서버에서 오는걸 모두 받을 수 있게 해주고, 서버에서 클라이언트로 자원을 보낼때 받을 수 있게 하면 됨





프록시를 임의로 설정하려면 모듈을 다운 받아야함

```shell
$ npm install http-proxy-middleware --save
```







## CSS FrameWork

1. Matreial UI
2. React Bootstrap
3. Semantic UI
4. Ant Design (이걸 사용할꺼임, 쓰기 편함, 스펙트럼이 넓음)

```shell
$ npm install antd --save
```





## Props

1. 부모 컴포넌트에서 자식 컴포넌트로 데이터를 내려 줬을때 해당 데이터는 변화하지 않음 (튜플)
2. 부모 컴포넌트에서 자식컴포넌트로 데이터를 내려주는 방식

```javascript
<ChatMessages 
	message={messages}
	currentMember = {member}
/>
```



## State

1. 부모 컴포넌트에서 자식 컴포넌트로 넘겨주는게 아님
2. 자기 자신이 가져온 데이터를 그대로 사용하고 언제든지 데이터를 변화시킬 수 있음
3. state 자체도 변화시킬 수 있음

redux가 state 사용을 보완해주는 툴임

```js
state = {
    message : '',
    attachFile : undefined,
    openMenu : false
};
```

가장 상위 컴포넌트에 comment에 대한 정보를 보관하고 있다고 하자

comment가 있고 그 comment에 대한 comment가 있음

부모도 comment를 관리하고, 자식 컴포넌트에서도 comment를 관리함



모든 comment의 state는 최상위 component에서 관리함

자식 component에서 comment가 줄거나 생겼을 때 최상위 컴포넌트에게 알려줘야하는데.

redux가 없으면 한단계씩 데이터를 타고 올라가서 전달해야함

-> redux store에 저장하면 데이터의 전달을 한번만 하면 됨

-> state 관리에 용이함





## Redux Flow

![React-Redux Flow, Terminologies, and Example - DEV](https://res.cloudinary.com/practicaldev/image/fetch/s--VtRaY29J--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/fewc8ez6r2e2agah717y.png)

이전 state와 action object를 받은 후에 데이터를 return하는게 reducers





## Redux 사용법

다운받아야하는 목록

1. redux
2. react-redux
3. redux-promis
4. redux-thunk



3, 4 번은 redux를 잘 쓸 수 있게 함



dispatch를 이용해서 store 안에 있는 state를 action으로 넘길 수 있음

store에서 언제나 객체 형식으로 받는건 아님, promise 형식으로 된걸 받을 수도 있음 혹은 function 형태도 받음

- 그러나 redux store는 무조건 객체 형식으로 받음
- 따라서 redux store가 function이나 promise로 받아진 데이터를 dispatch한테 function과 promise를 객체형식으로 보내달라고 말해주는 것 => redux-promise, redux-thunk





Reducer가 여러 개 일 수 있음

각각의 reducer가 가르키고 있는 state이 있을 수 있음, 따라서 reducer가 나눠져 있음

combineReducers라는 걸 사용해서 rootReducer에서 하나로 합쳐주는 역할

- 흩어져 있는 reducer를 하나로 합쳐줘서 식별 및 사용하기 편하게 함







## Class component & function component

### Class component

1. 더 많은 기능을 사용할 수 있음
2. 그러나 더 길어짐
3. 더 복잡함
4. 속도가 느림

생성 -> 업데이트 / 지우기

- 해당 경우는 functional에서 사용하지 못함
- but hook의 등장으로 사용가능





constructer

render

componentDidMount()



순서로 사용 할 수 있었음





### Functional component

1. 적은 기능 제공
2. 짧은 코드길이
3. 덜 복잡함
4. 속도가 빠름

- hook을 통해 lifecycle을 구현할 수 있게 됐음
- 즉, class component에서 제공하는 기능을 사용할 수 있게됨

Hook으로 위에 사용하던 수명주기를 사용 가능하게 됨



constructor(props) {this.state => useState로 대체

componentDidMount() => useEffect()로 대체





## Authentication

접근 관리

페이지 중에서 아무나 진입이 가능한 페이지,

로그인 한 회원만 가능한 페이지,

로그인 한 회원은 진입하지 못하는 페이지,

로그인 했는데 또 로그인 하려는 경우, 회원가입 동



## HOC (Higher Order Component)

1. function 임, 다른 컴포넌트를 받은다음에 새로운 컴포넌트를 return하는 function
2. Auth(HOC)라는 커다란 컴포넌트를 만들고, 그에 따른 여러 컴포넌트를 넣어서 return



1. backend에 request를 보냄 => 현재 접근 권한 상태 확인
2. 즉, 페이지에 접근할 때마다 관리 권한을 확인하고 페이지를 보여주거나 block 시킴