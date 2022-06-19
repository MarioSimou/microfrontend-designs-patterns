#!/bin/bash

services=("shell" "posts" "auth")
org=$1

if [[ ! org ]]; then
    printf "Please provide a valid organisation name '${org}'\n"
    exit 1
fi

bucket_name="${org}-services-bucket"

for service in ${services[@]}; do
    environment_file="./apps/${service}/.env.production"
    aws s3 cp "${environment_file}" "s3://${bucket_name}/${service}/production.env"
done

echo "Uploading completed..."