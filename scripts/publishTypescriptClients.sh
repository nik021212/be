#!/bin/bash
for apipackage in target/typescript-api-clients/*-client
do
    echo "Publishing Package $apiname in folder $apipackage"
    pushd $apipackage
    npm publish
    popd
done