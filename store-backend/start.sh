#!/bin/bash
npm run db:migrate
npm run build
node dist/server.js
