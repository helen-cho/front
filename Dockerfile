# 베이스 이미지 설정
FROM node:16.17.1

# /app 을 기본 디렉터리로 설정
WORKDIR /front

#현재 dockerfile 있는 경로의 모든 파일을 /app에 복사
COPY . /front

# npm install 실행
RUN npm install

# 실행할 명령어 작성
CMD ["npm", "start"]
