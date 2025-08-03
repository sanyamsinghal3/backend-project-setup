* create all folder and files for project setup
* install packages commands "npm i dotenv mongoose express"
* Mongo DB connection two way 1st  
* setup .env file in es6 format
* listen on port if connected
* cookie-parser and cors package
* create async handler function for common use error and success response handler into utils folder.
* create apiError handle class into utils folder
* create data model for User and viede
* add pacakge npm "i mongoose-aggregate-paginate-v2" reated code in Video model
* install pacakege bcrypt, jsonwebtoken
* monoogse pre and post hook used insert user data to bcrypt password.


mongoose.connect('mongodb://127*.0.0.1:27017/node-crud').then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});