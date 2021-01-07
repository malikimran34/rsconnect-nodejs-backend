# RSConnect NodeJS Backend API

> RSConnect NodeJS Backend Test Api with datastore mongo db

# Description

> RSConnect NodeJS API offers 3 main end points to add, delete and find image details

## Quick Start

```bash
# Run in Docker
docker-compose up
# use -d flag to run in background

# Tear down
docker-compose down

# To re-build
docker-compose build
```

## Test

Use postman to test end point. once you have run the "docker-compose up" both Backend Node server and mongo db with be running with docker. Make sure docker is installed on your sysmtem. Docker maps Node server port 5000 to 80 so you could easily test in Postman client using link below

> Get all images
> http://localhost:80/api/v1/images

## Datastore

Mongodb is used as a main datastore as an api database. Node service will connect to mongodb using mongodb://mongo:27017/rsconnect-nodejs-backend, where mongo:27017 is equal to docker service name and port

## Licence

This api is created using MIT Licence
