
## 프로젝트 설명
Dev Record - 줄여서 데레 입니다. 
개인적인 개발 블로그로도 싶어서 과제로 끝나더라도 이어서 개발해 나갈 예정입니다. 

<br/>

## 실행 및 접속 방법
Vecel의 배포 자동화를 이용했습니다. 밑의 링크로 바로 접속 가능합니다.
[Derre 접속 링크](http://derre.vercel.app/)

<br/>

## 구현한 기능 목록
1. 로그인
Next.js 미들웨어를 사용한 토큰 검증(access, refesh)

3. 블로그 목록 조회
tanstack-query를 사용한 클라이언트단 데이터 fetch
카테고리, 검색어 별 필터링 기능
페이지네이션
SSR fetching data dehydrate 처리(시도)

4. 블로그 글 생성/수정
Form, FormAction 공통 모듈화
뒤로가기, 페이지 이탈, router 사용 감지 후 컨펌창 출력
작성/수정 후 페이지 히스토리 삭제

5. 블로그 상세화면 조회

6. 공통
Composition 패턴/Create Portal을  활용한 공통 모달
전체 화면 모달이 아닌 miniModal을 위한 useModal 커스텀 훅

<br/>


## 사용한 기술 스택 및 라이브러리
- Next.js 15 app router, React, TypeScript
- tanstackQuery
- tailwindCSS, clsx, react-hot-toast
  
<br/>


## 개발하면서 고려한 부분 혹은 어려웠던 점
### 기록해놓은 트러블 슈팅
[문제]
폼 작성 중 이탈 시도 시 모달을 띄우는 기능을 구현함.
popState는 실행 후에 이벤트를 발동할 수 있기에 history에 같은 url을 하나 더 쌓아놓고 popState 발동 시 모달을 띄우는 방식으로 이탈을 막았음.
폼 작성 완료 시 replace하여 blog 상세로 가야하는데, history에 같은 url이 두 개가 있어서 replace해도 뒤로가기를 하면 create페이지로 이동함.
[과정]
1.cloneElement로 wrapper에서 prop으로 children에게 allow 변경 함수를 전달.
폼 작성 성공 시 allow를 변경하여 evnetListner를 무효화 시키고자 하였으나 이미 histroy는 쌓여있어서 실패.
2.비동기 처리로 router.back을 감싸서 router.back 실행 후 replace하는 방식 시도. 하지만 브라우저 api 설계 상 뒤로가기가 끝나기 전에 replace가 선입력되어 무용지물.
[해결]
popStateEventListener를 활용.
popStateEvent에 router.replace를 걸어두고 router.back으로 history를 하나 지우면서 이벤트 리스너를 통해 replace 발동시켜 해결함.

### 생각했던 것들
캐싱에 대한 것.
SSR로 서버에서 fetch한 데이터를 initailData로 useQuery에 넘길지.. fetch하고 queryKey를 기록할지.. tanstack-query의 preFetch를 사용할지..
옵션이 많으니 고민이 늘어남. 다만 Next.js의 부족한 부분과 CSR로는 얻을 수 없는 이점을 함께 얻을 수 있다는 점을 알게되어 Next.js + tanstack-query 함께 사용했을 때의 효용성을 보게됨.
