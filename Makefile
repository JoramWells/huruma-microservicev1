build:
	sudo docker-compose -f docker-compose.prod.yml build

push:
	sudo docker compose -f docker-compose.yml push

up-dev:
	docker compose up

up-dev-ldap:
	docker compose -f docker-compose.dev.yml --profile ldap up --build


up-prod:
	sudo docker compose -f docker-compose.prod.yml build --no-cache && sudo docker compose -f docker-compose.prod.yml up --remove-orphans

down:
	docker compose -f docker-compose.dev.yml down --build