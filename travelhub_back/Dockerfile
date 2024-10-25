# Backend Dockerfile
# 1. OpenJDK 17을 베이스로 사용
FROM openjdk:17-jdk-alpine

# 2. 빌드된 JAR 파일을 컨테이너로 복사
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

# 3. 포트 노출
EXPOSE 9826

# 4. Spring Boot 실행
ENTRYPOINT ["java", "-jar", "/app.jar"]
