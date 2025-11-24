# Stage 1: Build
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /build

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:17-jre

WORKDIR /app

# Recibe el JAR desde docker-compose
ARG JAR_FILE
COPY --from=builder /build/${JAR_FILE} app.jar

# Puerto dinámico
ARG EXPOSE_PORT
EXPOSE ${EXPOSE_PORT}

ENTRYPOINT ["java", "-jar", "app.jar"]