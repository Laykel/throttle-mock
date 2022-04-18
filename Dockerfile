FROM denoland/deno:alpine-1.20.6

USER deno
WORKDIR /app

COPY src/deps.ts .
RUN deno cache deps.ts

ADD src/ .
RUN deno cache app.ts

EXPOSE 8080

CMD ["run", "--allow-env", "--allow-net", "app.ts"]
