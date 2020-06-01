# API Monorepo

## Software requirements

In order to do this workshop, you need the following:

- Linux or MacOS with shell access, and the following installed:
  - `git` [Git install for MacOs](https://medium.com/@GalarnykMichael/install-git-on-mac-a884f0c9d32c)
  - `docker` [Docker installation page](https://docs.docker.com/install/)
  - ``npm i -g @nestjs/cli`



## Install project from repository:

```
git@github.com:Myolnir/nestjs-mongo-monorepo-scafold.git
```

## Install project dependencies

```
npm install
```

## Build at least one time

```shell script
docker-compose up --build
```

## Daily bases

Use on the root on your repository `$ docker-compose up` to properly setup and get running all the 
containers and `$ docker-compose down` to stop them.

Also you can select a specific modude with  `$ docker-compose up {module-name}`

If you need remove orphans modules exec: `docker-compose up --build --remove-orphans`

- [IntelliJ idea](https://www.jetbrains.com/es-es/idea/) is recommended for an easy project navigation and development

## OpenApi view

All microservices included have Api project specification is served via Swagger views.

## Services included

| Service        | Description                      | Port | Documentation             | Handle Events |
| -------------- | -------------------------------- | ---- | ------------------------- | ------------- |
| Fizz           | Module to manage fizz           | 3001 | http://localhost:3001/doc | true - redis  |
