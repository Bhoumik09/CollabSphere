const User = require("./models/User")

let data=[{
    name:"ANINASH",
    linkedin:"www.linkedin.com/in/bhoumik-chopra-7999a6250",
    github:"https://github.com/Bhoumik09",
    email:"ANIshchopra2022@vitbhopal.ac.in",
    coins:10,
    skills:["AIML"],
    yog:
}]
async function seedDB(){
        await User.insertMany(data);
}
module.exports=seedDB;