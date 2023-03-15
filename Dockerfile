FROM openjdk:11
WORKDIR /server
COPY target/fruits_in_choco-0.0.1-SNAPSHOT.jar /server
ENTRYPOINT ["java", "-Djasypt.encryptor.password=secretkey", "-jar", "./fruits_in_choco-0.0.1-SNAPSHOT.jar"]