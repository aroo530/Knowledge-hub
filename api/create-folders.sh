#!/bin/bash

# Create project directories
mkdir -p src/{app/{use-cases,services},domain/{entities,repositories},infra/{database,http/{controllers,routes,middlewares}},config,shared/{errors,utils}}

echo "✅ DDD folder structure created successfully!"

