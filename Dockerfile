FROM openjdk:17-alpine

ADD  target/fruits_in_choco-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app.jar"]