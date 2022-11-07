const { User } = require("../../../db");

const createUser = async(username, email, password)=>{
        User.findOrCreate({
            where:{
                username, email, password
            },
            // defaults:{
            //     username, email, password
            // }
        });
}

const noDobleSpaces = (string)=>{
    const stringToValidate = string.split("");
    let s = 0;
    let cut;
    let nextChar=" ";
    while(s<stringToValidate.length&&!cut){
      if(stringToValidate[s+1]=== " " && nextChar===stringToValidate[s]){
        cut=true;
      }
      s++
    }
    if(cut)return true;
  }

const isValidUsername = (username)=>{

    if (!username || username==="") {
        return {status:400, message:"Username is needed."};
    }
    else if(username.length>20||username.length<1){
        return {status:400, message:"Username must containt between 1 and 20 characters."};
    }
    else if(noDobleSpaces(username)){
        return {status:400, message:"Username can't contain doble spaces."};
    }
    else if(username.split("").includes(" ")){
        return {status:400, message:"Username can't containt spaces."};
    }
}

const isValidEmail = (email)=>{
    if(!email || email==="") {
        return {status:400, message:"Email is needed."};
    }
    else if(email.split("").includes(" ")){
        return {status:400, message:"Email can't contain spaces."};
    }
}

const isValidPassword = (password)=>{
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!password || password==="") {
        return {status:400, message:"Password is needed."};
    }
    else if(password.split("").includes(" ")){
        return {status:400, message:"Password can't contain spaces."};
    }
    else if(!validPassword.test(password) || password.length>15){
        return{status:400, message:`The password must contain:\rBetween 8 and 15 characters\rOne or multiple numbers and special characters (@, $, !, %, *, ?, &)\rAt least a capital letter".`};
    }
}

module.exports={
    createUser,
    isValidUsername,
    isValidEmail,
    isValidPassword,

}
