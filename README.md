### Setup

```
export ENDPOINT_URL="http://localhost:4566"
export BUCKET_NAME=application-shell-bucket

# Create bucket
aws s3api create-bucket --bucket $BUCKET_NAME --endpoint-url $ENDPOINT_URL

# Upload assets
# make sure to run build dist directory before running the below commands
aws s3 --recursive cp app1/dist/ s3://${BUCKET_NAME}/app1 --endpoint-url $ENDPOINT_URL
aws s3 --recursive cp app2/ s3://${BUCKET_NAME}/app2/ --endpoint-url $ENDPOINT_URL
```
