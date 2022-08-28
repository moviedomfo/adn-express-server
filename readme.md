
# ADN Mutations
 API to validate ADN strings mutations
## Table of Contents

- [Intro](#Intro)
- [Validate ADN](#Validate-ADN)
- [Database](#mongodb-hosted)
- [Run locally](#Run-locally)
- [Dockerize](#Dockerize)

## Intro

This API provide two principal enpoints, one for vheck ADN one for statistical purposes.

   
 - %URL_BASE%/api/mutations
 - %URL_BASE%/api/stats

## Validate ADN 

Path /api/adn/mutation

This POST enpoint recive an input with this format:
```
    {
        "dna" :["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
    }
```

Returns true if has mutations or false if not

```
    curl --location --request POST '%URL_BASE%/api/adn/mutation' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "dna" :["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]

    }'
```

## Get verification stats 

Path:  /api/mutations/stats

Return jsocn with results:

```
    {
         "count_mutations":40, 
        "count_no_mutation":100: 
        "ratio":0.4
    }
```

 curl --location --request GET '%URL_BASE%/api/adn/stats'

## Run locally
  [1] Firs clone the repo locally
  [2] run npm install or yarn install
  [3] run dev command 

    ```
        npm run dev
    ```
  [4] Additionally if you have dockerhub installed. We leave you a dockerfil ready!! 
       pleasse ref to [Dockerize](#Dockerize)

 
## mongodb hosted

I allocate cloud mongodb as stotrage on Mongo de Atlas
     [link](https://cloud.mongodb.com/v2/630a921cca5d9915ccb37d0a#security/database/users)

## regExp 

 We use this regular exprssion to validate if an string contains 4 continuos characters
    [regex101](https://regex101.com/r/qA0aS0/1) with this expression:  *\b(?=[a-z\d]*([a-z\d])\1{3}|\d+\b)[a-z\d]+

# Microservices

## Dockerize

You can use docker to deploy the api server. In this releasse we leave a dockerfile and a docker compose ready to use


 * generate image
 
```
    docker image build -t moviedomfo/express_adn .
```

 * run container
 
```
docker run -d -p 3008:80 --name express_adn moviedomfo/express_adn  
```

 * Navigate to this url to check the if correctly docker container is running 
    
        http://localhost:3008/index.html
        