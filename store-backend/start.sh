#!/bin/bash
npm install
npm install -g db-migrate
npm i --save-dev @types/jest
npm i --save-dev @types/mocha
npm run build
npm run db:migrate

