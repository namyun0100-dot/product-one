# Weekly Content Workflow

이 문서는 `weekly-keywords`와 `weekly-money-zodiac` 작업 시 따라야 하는 **실무용 체크리스트**입니다.
`AGENTS.md`가 상위 규칙이라면, 이 문서는 실제 작업 절차입니다.

## 1. 작업 범위 결정
주간 작업을 시작하면 먼저 아래를 구분한다.

### A. 이번 주 운세 키워드
- **같은 파일 교체**
- 대상 파일
  - `blog_posts/weekly-keywords.html`
  - `blog_posts/weekly-keywords-en.html`

### B. 주간 금전운
- **새 파일 발행**
- 대상 파일
  - `blog_posts/weekly-money-zodiac-MM-DD-MM-DD.html`
  - `blog_posts/weekly-money-zodiac-MM-DD-MM-DD-en.html`

## 2. 검색 먼저 하기
주간 글은 감으로 바로 쓰지 않는다.
먼저 다음 항목을 검색으로 확인한다.

### 필수 확인 항목
- 다음 주 정확한 날짜 범위
- 새달/보름달/상현달/하현달 등 주간 천문 이벤트
- 시즌 전환 포인트
  - 예: 황소자리 시즌 시작, 월말/월초 전환, 분기감 등
- 본문 톤을 잡아줄 수 있는 공통 흐름 1~2개

### 검색 결과 사용법
- 확인된 사실
  - 날짜
  - 이벤트 시점
  - 시즌 전환 시점
- 편집 해석
  - 각 별자리별 한 줄 운세
  - 금전운 체크리스트
  - 주간 행동 포인트

## 3. 본문 작성 원칙

### 공통
- 날짜만 바꾸지 말고 본문 전체를 새로 쓴다.
- 직전 주차 문장을 가능한 그대로 복사하지 않는다.
- 독자가 봤을 때 “이번 주 새 글”처럼 느껴져야 한다.

### 이번 주 운세 키워드
최소한 아래를 매주 새로 작성한다.
- 요약 박스
- 12별자리 한 줄 운세
- 공통 키워드 7개
- 이번 주 한 줄 행동
- 피하면 좋은 것
- 관련 글 링크

### 주간 금전운
최소한 아래를 매주 새로 작성한다.
- 요약 박스
- 이번 주 흐름 한 줄 정리
- 12별자리 금전운 한 줄 요약
- 주간 실천 체크리스트
- 돈 흐름이 좋아지는 신호
- 마무리 리듬 정리
- 관련 글 링크

## 4. 메타데이터 체크
각 문서마다 아래를 확인한다.
- `<title>`
- `<meta name="description">`
- `<meta name="keywords">`
- `canonical`
- `hreflang`
- `og:title`
- `og:description`
- `og:url`
- `twitter:title`
- `twitter:description`
- `twitter:url`
- `ld+json`
- `datePublished`
- `dateModified`

### 중요
- KO 문서는 KO URL
- EN 문서는 EN URL
- `mainEntityOfPage`도 현재 문서 URL과 일치해야 한다.

## 5. 연결 파일 업데이트
주간 글 작업 후 아래 파일을 같이 확인한다.

### 항상 확인
- `blog.html`
- `sitemap.xml`

### 필요 시 함께 수정
- `index.html`
- `main.v4.js`
- `blog_posts/money-zodiac.html`
- `blog_posts/money-zodiac-en.html`
- `blog_posts/weekly-money-zodiac.html`
- `blog_posts/weekly-money-zodiac-en.html`

## 6. 링크 정책

### weekly-keywords
- 링크는 같은 파일 유지
- 단, 내부 제목/날짜/본문은 최신 주차로 모두 교체

### weekly-money-zodiac
- 최신 글은 새 파일 링크로 연결
- 허브/아카이브에는 최신 글을 맨 위에 추가
- 이전 최신 글은 아카이브로 한 단계 내려 보낸다

## 7. 최종 검수 체크리스트
발행 전 아래를 다시 본다.

- [ ] 다음 주 날짜 범위가 맞는가
- [ ] KO/EN 둘 다 수정됐는가
- [ ] `weekly-keywords`는 같은 파일을 갱신했는가
- [ ] `weekly-money-zodiac`는 새 파일로 만들었는가
- [ ] 본문 전체를 새 주차 기준으로 다시 썼는가
- [ ] `blog.html`이 최신 글을 가리키는가
- [ ] `index.html` 최신 카드가 맞는가
- [ ] `main.v4.js` 링크/문구/배지가 최신인가
- [ ] 금전운 허브/아카이브가 최신 글을 맨 위에 보여주는가
- [ ] `sitemap.xml`에 새 URL과 수정일이 들어갔는가
- [ ] canonical / og:url / twitter:url / JSON-LD URL이 모두 맞는가

## 8. 권장 작성 톤
- 주간 운세: 예약 발행 느낌, 다음 주를 미리 정리해주는 톤
- 주간 금전운: 소비·저축·결제 리듬을 실전적으로 정리하는 톤
- 둘 다 과장된 단정 대신 방향 제시형 문장 사용

## 9. 금지 사항
- 검색 없이 감으로만 작성
- 날짜만 바꾸고 본문 재사용
- KO만 수정하고 EN 누락
- 새 금전운 글 만들고 허브/사이트맵 미반영
- 메타 URL을 이전 주차 파일로 남겨두기
