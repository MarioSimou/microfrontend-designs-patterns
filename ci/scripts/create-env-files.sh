#!/bin/bash

# posts app
export GENERATE_ENV_PATH="./apps/posts/.env.production"
./ci/scripts/create-env-file.sh \
    "WEB_APP_BASE_URL=$POSTS_WEB_APP_BASE_URL" \
    "ENV_CONFIG=production" \
    "FIREBASE_API_KEY=$FIREBASE_API_KEY" \
    "FIREBASE_AUTH_DOMAIN=$FIREBASE_AUTH_DOMAIN" \
    "FIREBASE_PROJECT_ID=$FIREBASE_PROJECT_ID" \
    "FIREBASE_STORAGE_BUCKET=$FIREBASE_STORAGE_BUCKET" \
    "FIREBASE_MESSAGING_SENDER_ID=$FIREBASE_MESSAGING_SENDER_ID" \
    "FIREBASE_APP_ID=$FIREBASE_APP_ID"

export GENERATE_ENV_PATH="./apps/auth/.env.production"
./ci/scripts/create-env-file.sh \
    "WEB_APP_BASE_URL=$AUTH_WEB_APP_BASE_URL" \
    "ENV_CONFIG=production" \
    "FIREBASE_API_KEY=$FIREBASE_API_KEY" \
    "FIREBASE_AUTH_DOMAIN=$FIREBASE_AUTH_DOMAIN" \
    "FIREBASE_PROJECT_ID=$FIREBASE_PROJECT_ID" \
    "FIREBASE_STORAGE_BUCKET=$FIREBASE_STORAGE_BUCKET" \
    "FIREBASE_MESSAGING_SENDER_ID=$FIREBASE_MESSAGING_SENDER_ID" \
    "FIREBASE_APP_ID=$FIREBASE_APP_ID" \
    "FIREBASE_ADMIN_CLIENT_EMAIL=$FIREBASE_ADMIN_CLIENT_EMAIL"

# private key contains empty spaces which introduced a few issues in the for loop 
echo "FIREBASE_ADMIN_PRIVATE_KEY=\"${FIREBASE_ADMIN_PRIVATE_KEY}\"" >> $GENERATE_ENV_PATH

# shell app
export GENERATE_ENV_PATH="./apps/shell/.env.production"
./ci/scripts/create-env-file.sh \
    "APPLICATION_AUTH_BASE_URL=$AUTH_WEB_APP_BASE_URL" \
    "APPLICATION_POSTS_BASE_URL=$POSTS_WEB_APP_BASE_URL" \
    "APPLICATION_BASE_URL=$SHELL_APPLICATION_BASE_URL"
