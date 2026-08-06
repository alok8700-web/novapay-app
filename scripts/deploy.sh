#!/bin/bash

set -e

echo "======================================="
echo "NovaPay Deployment Started"
echo "======================================="

echo "Started at: $(date)"

cd /home/ec2-user/novapay-app

echo "Pulling latest code..."
git pull origin main

echo "Stopping old containers..."
docker compose down

echo "Building and starting application..."
docker compose up --build -d

echo "Removing unused Docker images..."
docker image prune -f

echo "Deployment completed successfully!"
docker compose ps

echo "Finished at: $(date)"
