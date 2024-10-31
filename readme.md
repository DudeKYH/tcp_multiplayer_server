## TCP Multiplayer Server 구현

### 게임 플레이 방법

- 게임 접속 후, 방향키 or WASD 키보드 입력으로 이동하는 간단한 게임입니다.
- 여러 플레이어(최대 10명)가 함께 게임을 플레이한다.

### TIL 링크

- [[TIL : Part 1]](https://velog.io/@kyheon/TIL241024-%EB%A9%80%ED%8B%B0-%ED%94%8C%EB%A0%88%EC%9D%B4%EC%96%B4-%EA%B2%8C%EC%9E%84-%EC%84%9C%EB%B2%84-Part.1)
- [[TIL : Part 2]](https://velog.io/@kyheon/TIL241025-%EB%A9%80%ED%8B%B0%ED%94%8C%EB%A0%88%EC%9D%B4%EC%96%B4-%EA%B2%8C%EC%9E%84-%EC%84%9C%EB%B2%84-Part.2)
- [[TIL : Part 3]](https://velog.io/@kyheon/TIL241028241029-%EB%8D%B0%EB%93%9C-%EB%A0%88%EC%BB%A4%EB%8B%9D-%EB%A9%80%ED%8B%B0%ED%94%8C%EB%A0%88%EC%9D%B4%EC%96%B4-%EA%B2%8C%EC%9E%84-%EC%84%9C%EB%B2%84-Part.3)
- [[TIL : Part 4]](https://velog.io/@kyheon/TIL241030241031-DB-%EC%97%B0%EB%8F%99-%EB%A9%80%ED%8B%B0%ED%94%8C%EB%A0%88%EC%9D%B4%EC%96%B4-%EA%B2%8C%EC%9E%84-%EC%84%9C%EB%B2%84-Part.Final)

### 도전 구현 사항

- 1: DB 연동

  - AWS RDS의 Mysql 인스턴스로 USER 정보 관리
  - 서버는 클라이언트가 입력한 deviceId로 user의 유무를 판별한다.
    - 있다면 => DB에 저장된 유저의 가장 최근 위치로 플레이어가 스폰된다.
    - 없다면 => 새로운 유저 정보를 만들어 DB에 저장 후, (0, 0)에서 플레이어가 스폰된다.

- 2: Latency를 이용한 추측항법

  - 서버는 게임에 참가 중인 유저 중 가장 느린 latency로 추측항법을 적용한 위치를 계산한다.
  - 그리고 클라이언트는 모든 유저의 위치를 받아 그 위치로 이동한다.
    - 이 때, 선형보간을 사용하여 순간이동하는 현상 없이 매끄럽게 이동하게끔 구현했다.

- 3: 추가 구현 기능) 간단한 게임 모니터링하는 기능을 추가해보았다.
  - 게임에 참가한 유저들의 `deviceId, x, y, latency`를 1초마다 출력해준다.
