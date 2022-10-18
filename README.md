# API First Code Generator
based on https://openapi-generator.tech/

This project generates, starting from swaggers
* server side RestControllers for Spring applications as library
* client side java client as library
* client side libraries for Typescript React applications

## Usage
1. Branch your feature off master branch
2. Edit / create swagger files in **api** folder
3. Edit / create json schemas for payloads in **schemas** folder
4. **Test if your mods build** (e.g. issuing ./mvnw clean compile)
4. Push to origin
5. Issue a merge request to master
6. Once merged, CI/CD will take care of deploying server side library (with all APIs) and multiple client side packages on private repo.

## locally generates spring server side and installs in .m2
```
mvn clean install
```

## locally generates java client side and install in .m2
```
mvn -P java-client clean install
```

## usage example for Java Client library
```
package com.soprasteria.myproject;

import com.soprasteria.myproject.myclient.users.api.ApiClient;
import com.soprasteria.myproject.myclient.users.api.DefaultApi;
import com.soprasteria.myproject.myclient.users.api.model.UserDto;

public class App 
{
    static final String SERVICE_BASE_PATH = "https://localhost:8080";
    public static void main( String[] args ) throws com.soprasteria.myproject.myclient.users.api.ApiException
    {  
        ApiClient apiClient = new ApiClient();
        apiClient.setBasePath(SERVICE_BASE_PATH+apiClient.getBasePath());
        DefaultApi usersApi = new DefaultApi(apiClient);
        UserDto user = usersApi.getUserById(123);
        System.out.println(user.getEmail());
    }
}
```

## generate typescript client side
```
npm install
npm run genTypescriptClients -- <scope> dummy.com
```
generates clients packages

## usage example for typescript client side

```
import { DefaultApi, UserDto, Configuration, ConfigurationParameters} from '@met/users-api-client'
import * as fetch from 'node-fetch'
(async () => {
    try {
        const configParams: ConfigurationParameters = {
            basePath: 'https://met-dev-api-java.azurewebsites.net/users/v1/',
            middleware: [],
            fetchApi: fetch
        };
        const apiConfig = new Configuration(configParams);
        const apiClient = new DefaultApi(apiConfig)
        let myUser: UserDto = await apiClient.getUserById({id: 12})
        console.log(myUser.email)
    }
    catch (err) {
        console.log(err)
    }
})()
```

- - - -
- - - -

## Warning: start of old docs - read and use at your own risk!
## Node utils

- `npm run-script genJsonExamples` generates examples for the existing json schemas
- `npm run-script genOpenApiModel api/<some.yml>` generates model java classes for the existing OpenAPI definitions

## Notes for command liners

Definitions tested against OpenAPI Codegen 

Complete server or just models can be generated:
```bash
wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/5.3.0/openapi-generator-cli-5.3.0.jar -O openapi-generator-cli.jar

java -jar openapi-generator-cli.jar generate -i <api.yml> -g spring --generate-alias-as-model -o generated
```

## Schemas
Json Schemas for all entities, can be turned into POJOS with well known utils