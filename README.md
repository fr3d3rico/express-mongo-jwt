# express-mongo-jwt
Project for BossaBox Interview.

## How to test?

1 - First, download MongoDB (https://www.mongodb.com/community)

2 - Download Robo 3T formerly know as Robomongo (https://robomongo.org/): This tool allow you access and interact with all mongo collections.

3 - Clone project: 

> git clone https://github.com/fr3d3rico/express-mongo-jwt.git

4 - Getting inside "express-mongo-jwt" directory.

5 - Run "npm install" to download all project dependencies.

6 - Start mongo server with "mongod" command.

7 - Test app with "npm test". This command will perform all test/*.js tests cases.

8 - Finally, start the server: "npm start"

## Swagger API Documentation

Access http://localhost:3000/api-docs  to access swagger docs.

This docs follow Swagger documentantion OAS 2.0 (https://swagger.io/docs/specification/2-0/basic-structure/)

## How this project was built?

Please, check the follow link (https://github.com/fr3d3rico/express-mongo-jwt/projects/1) to see how this project was built.

Here you can access issues (https://github.com/fr3d3rico/express-mongo-jwt/issues)

## Which IDE do you recommend?

I prefer use VS Code.
How configure debug mode? When you hit "f5", vscode will automatically start server. You should set initial file in launch.js config. Please check link: https://github.com/Microsoft/nodejstools/wiki/Debugging

## To test Docker, follow steps:

1 - Change DB_HOST value on ".env"

Ps.: To see docker container IP, execute: "docker inspect <container-id> | grep "IPAdress""

2 -  The "Dockerfile" is set to download 2 images(node and mongo, please see "FROM").
Execute command "docker build -t <your username>/node-app ."

This command will perform docker tasks to create mongo and node images.

3 - Execute "docker images" to see the images.

4 - Run mongo container: "docker run -p 27017:27017 -d mongo"

5 - And run app container: "docker run -p 3000:3000 -d <your username>/node-app"

6 - Now, you can access "http://localhost:3000/api-docs"



Feel free to comment.
@fr3d3rico