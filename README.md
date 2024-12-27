### test

### Generate OpenAPI typescript

npm install @openapitools/openapi-generator-cli -g

openapi-generator-cli version

openapi-generator-cli generate -g typescript-axios \
-i http://localhost:8080/v3/api-docs \
-o ./src/api