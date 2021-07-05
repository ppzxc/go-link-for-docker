# go-link

## chat server
1. websocket connection url
```
ws://localhost:8081/api/v1/ws
```

## up usage

1. create docker network
```
docker network create link
```

2. up docker-compose
```
docker-compose up --build -d
```

## down usage

```
docker-compose down -v
```

## etc
1. deprecated
 - localhost test page