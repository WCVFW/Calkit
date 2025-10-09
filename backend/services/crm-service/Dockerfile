# multi-stage build for crm-service
FROM maven:3.9.4-eclipse-temurin-17 as build
WORKDIR /src
COPY pom.xml .
COPY src ./src
RUN mvn -B -DskipTests clean package

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /src/target/crm-service-0.0.1-SNAPSHOT.jar ./crm-service.jar
EXPOSE 8082
ENTRYPOINT ["java","-jar","/app/crm-service.jar"]
