```shell
docker compose -f dev.docker-compose.yaml up -d
docker compose -f dev.docker-compose.yaml exec -it backend npx prisma migrate dev --name init
```

```shell
docker compose -f prod.docker-compose.yaml up -d
docker compose -f dev.docker-compose.yaml exec -it backend npx prisma migrate dev --name init
```
