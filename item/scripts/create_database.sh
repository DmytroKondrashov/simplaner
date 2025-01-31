#!/bin/bash

DB_NAME="simplaner_item"
DB_USER="dmitrykondar"
DB_PASSWORD="postgres"
DB_HOST="127.0.0.1"
DB_PORT="5432"

create_database() {
  echo "Attempting to create database '$DB_NAME'..."

  PGPASSWORD=$DB_PASSWORD psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d postgres -tc "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1
  if [ $? -eq 0 ]; then
    echo "Database '$DB_NAME' already exists."
  else
    PGPASSWORD=$DB_PASSWORD psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d postgres -c "CREATE DATABASE $DB_NAME;"
    if [ $? -eq 0 ]; then
      echo "Database '$DB_NAME' created successfully."
    else
      echo "Error: Failed to create database '$DB_NAME'."
      exit 1
    fi
  fi
}

create_database
