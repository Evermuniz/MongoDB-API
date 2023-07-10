# MongoDB-API
 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This application is only a back-end server and uses a NoSQL database, specifically MongoDB. I learned how to create models and schemas and how collections interact with each other. I also learned about virtuals, aggregates, and CRUD operations. 


## Table of Contents (Optional)

- [Usage](#usage)
- [Credits](#credits)
- [License](#license)


## Usage
This application is fairly simple in that it primarily uses express and mongoose dependencies. After seeding the data, using MongoDB Compass is very helpful to view your collections and documents. Since there is no front-end, testing the API routes requires the usage of an application such as Insomnia. The routes you can test are:
- GET 
    - All users
    - Single user by Id
    - All thoughts
    - Single thought by Id
- POST 
    - New user
    - New friend
    - New thought
    - New reaction
- PUT 
    - Existing user
    - Existing thought
- DEL 
    - User
    - Friend from user's friend list
    - Thought from user's thought list
    - Reaction from a thought belonging to a user

Click on this [link](https://drive.google.com/file/d/153npURE5PKgOx_At23k67AS_lbiU6Qh3/view) to view a video walkthrough of the routes mentioned above. 

![Screenshot of the application recording](./Assets/screenshot.jpeg)]

## Credits
- Express.js
- Mongoose
- ChatGPT for help with the getter method to format dates 
- References provided by the University of Utah Coding Bootcamp, in particular code under config, utils, and server.js



## License
This project is licensed under the MIT license.

## How to Contribute

Please visit the [Contributor Covenant](https://www.contributor-covenant.org/)

  ## Questions

  If you have any questions, please contact me at evermuniz@outlook.com.
  You can also visit my GitHub profile [here](https://github.com/evermuniz/)