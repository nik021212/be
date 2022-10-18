#!/bin/bash
[ $# -gt 1 ] || (echo "Usage <scope> <"; exit 1;)
scope=$1
npmRepository=$2
for apifile in api/*.yml 
do
    filename=$(basename -- "$apifile")
    extension="${filename##*.}"
    filename="${filename%.*}"
    apiname=$filename-api-client
    echo "Generating API $apiname from $apifile"
    npx openapi-generator-cli generate -i $apifile -o target/typescript-api-clients/$apiname -g typescript-fetch --additional-properties=npmName="@$scope/$apiname",npmRepository=${npmRepository}
done

for apipackage in target/typescript-api-clients/*-client
do
    echo "Building Package $apiname in folder $apipackage"
    pushd $apipackage
    npm install
    npm run build
    popd
done