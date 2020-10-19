module.exports = async() => {

    //const Sequelize = require("sequelize");
    const posts = require("./models/posts.js");
    const users = require("./models/users.js");

    const errHandler = (err) => {
        console.error("Error: ", err);
    }

    try{

        setTimeout(()=>{
            users.create({id : 3,username: "hamouda" ,email: 'aymen@gmail.com', password: "123456",age: "17"}).catch(errHandler);
            posts.create({content: "hna rani nkteb fi status" , description: "fhfghfgh",userId: users.id}).catch(errHandler);
            
          },2000);

    }catch(err){
        console.log(err);
    }
}