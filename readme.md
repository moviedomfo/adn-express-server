
# ADN Mutations
 API to validate ADN strings mutations
## Table of Contents

- [Intro ](#Intro)
- [Validate ADN](#Getting-started)
- [Run locally](#Run-locally)
- [Deployd](#Deployd )
- [What do we need in build root folder](#What-do-we-need-in-build-root-folder)
- [Posible ERRORS](#Posible-ERRORS)

## Intro

This API provide two enpoints, one for vheck ADN one for statistical purposes.

  [1]  %URL_BASE%/api/mutations
  [1]  %URL_BASE%/api/stats
    
## Run locally

## Validate ADN /api/adn/mutation

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

## Get verification stats /api/adn/stats

URL  http://URL_BASE/api/mutations/stats

Return jsocn with results:

{“count_mutations”:40, “count_no_mutation”:100: “ratio”:0.4}


 curl --location --request GET '%URL_BASE%/api/adn/stats'


# Microservices

## Dockerfile

 Se utiliza multi stage build con dos imagenes una con el SDK AS build y otra optimizada
 
 * generate image
 
```
    docker image build -t moviedomfo/express_auth .
```

 * run container
 
```
docker run -d -p 3008:80 --name express_auth moviedomfo/express_auth  
```

 * Navigate to this url to check the if correctly docker container is running 
    
        %URL_BASE%/api/menu/items
        

## Docker Composer : Alternatly, you can use compose. Just run these two commands consecutively


```
docker image build -t moviedomfo/express_auth 
**wait**  for image creation and next run..

docker-compose up -d
```

# Dockerizing a Node.js app with NGINX using Docker-Compose

 ### References 
    https://ashwin9798.medium.com/nginx-with-docker-and-node-js-a-beginners-guide-434fe1216b6b
    https://www.youtube.com/watch?v=4zUQEkDdNR0
    
### Steps
    1 - Ceate our own Nginx server configuration
     An instance of Nginx will be running inside the container. 

     

     The one thing to point out is the proxy_pass directive. We are proxying requests to 
     “http://nodeserver:5000” instead of localhost:5000. 



    2 - create a Dockerfile inside the nginx folder
        2.1 Inside the nging/Dockerfile we copy our nginx.conf file to NIGINX folder 
        called conf.d which stores all custom configurations

        2.1 Create a file called default.conf inside the nginx folder to store the configuration for the proxy. 
        
         COPY default.conf /etc/nginx/conf.d/default.conf
         
### docker-compose
    
    Using docker-compose to coordinate the containers

    Inside the docker-cpompose.yaml file we´ll to set 3 containers, tho for our Express servers and
    another for aur reverse proxy, NGINX.

    Execute this command to run these containers 
    
    docker-compose up --build

