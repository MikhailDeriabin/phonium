FROM debian:stable-backports

RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    maven \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

ENV JAVA_OPTS="-Xmx512m"
ENV SPRING_PROFILES_ACTIVE=prod

EXPOSE 8080
CMD ["sh", "-c", "java $JAVA_OPTS -Dspring.profiles.active=prod -jar target/*.jar"]