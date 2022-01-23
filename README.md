# Snooker Scoreboard
full stack app to handle snooker scoreboards

## Docker Compose 101
For development, use the following command: `docker-compose --env-file ./config/.env.dev up`

After installing a new npm package, use the following command `docker-compose up --build --force-recreate ${serviceName}`

Sometimes, `docker-compose` can have some internal conflicts due to us using it for dev, in which case the fatest solution is to simply do a clean restart by deleting everything:

1. `docker-compose down`
2. `docker rm -f $(docker ps -a -q)`
3. `docker volume rm $(docker volume ls -q)`
4. `docker-compose up`