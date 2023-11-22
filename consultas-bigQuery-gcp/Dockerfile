# Dockerfile para Spring Boot
FROM openjdk:17

COPY target/bigquery-back.jar bigquery-back.jar

ENTRYPOINT ["java", "-jar", "bigquery-back.jar"]
