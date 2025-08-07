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
* create account on cloudinary, install packege of cloudinary and multer
* create fiel code in uthil folder for image uplaod in cloudinary.js\
* create middlewre to upload file using multer.
* create user controller for register user and user routes in routes folder.
* all the routes call from app.js file so that related controller can called.
# register user
* get user details form frontend or from respose.
* form validation
* check user exist or not.
* check imgaes exsit or not for avatar 
* upload on cloudinary.
* data insert into DB.
    -> Set middleware to file upload in user routes file.
    -> Add validation in user controller file
    -> Check User exit or not, import user model
    -> Upload coverImage and Avatar
    -> Inser User datra into DB


mongoose.connect('mongodb://127*.0.0.1:27017/node-crud').then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});