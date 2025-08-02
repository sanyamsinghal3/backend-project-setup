* create all folder and files for project setup
* install packages commands "npm i dotenv mongoose express"
* Mongo DB connection two way 1st  
* setup .env file in es6 format


mongoose.connect('mongodb://127.0.0.1:27017/node-crud').then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});