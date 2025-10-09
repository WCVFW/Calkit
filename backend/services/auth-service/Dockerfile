# multi-stage build for auth-service
FROM maven:3.9.4-eclipse-temurin-17 as build
WORKDIR /src
COPY pom.xml .
COPY src ./src
RUN mvn -B -DskipTests clean package

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /src/target/auth-service-0.0.1-SNAPSHOT.jar ./auth-service.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","/app/auth-service.jar"]
