#!/bin/bash
set -e

echo "Removing node_modules and package-lock.json..."
rm -rf node_modules package-lock.json

echo "Running npm install to rebuild dependencies..."
npm install

echo "Dependencies rebuilt successfully!"
