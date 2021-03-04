const fs=require('fs')
const importfile=require('./userdetails.json')
const readlinesync=require('readline-sync')
const checkpasswordstrength=require('check-password-strength')

// i made function for writing a file
var writefilesync=(filename,data)=>{
  //this promise is used for write a file
  //in  promise resolve and reject are callback function
  return new Promise((resolve,reject)=>{
    // JSON.stringify is used to convert a data from jsObject to json string
    // null,2 it will maintain proper indetation
    let datastring=JSON.stringify(data,null,2)
    fs.writeFileSync(filename,datastring,'utf8')
    resolve(data)
  })
}


// readfilesync is a function for reading a json file
let readfilesync=(Filename)=>{
  //used here a promise to return the data of a file if data is there,
  //other wise it will throw error
  return new Promise((resolve,reject)=>{
    var content =fs.readFileSync(Filename,'utf8');
    // JSON.parse it will convert the data to json string to js object
    userContent=JSON.parse(content)
    resolve(userContent)
  })
}
// user will choose what he/she want log in or sign up
const userchoose=readlinesync.question("what you want login/sign up: ")
// if user will choose sign up it will go through this 
if(userchoose==="s" || userchoose=="S"){
  Name=readlinesync.question("enter the name: ")
// calling the readfilesync function and passing the file name as a argument
//this function will return a data if data is in file 
// other wise it will give undefined
  readfilesync('./userdetails.json')
  .then((usersContents)=>{
    userDatas=usersContents['user']
    if(userDatas===undefined){
      passWord=readlinesync.question("enter your password: ")
      passWord1=readlinesync.question("confirm your password: ")
      if(passWord===passWord1){
        // here i am checking password is strong or not using the function check-password-strength
        passwordValue=checkpasswordstrength(passWord).value
        if(passwordValue==="Strong"){
          // here creating a object
          firstUserData={
            user:[{
              userName:Name,
              userpassword:passWord
            }]
          }
          console.log(`${Name} ,you signed up sucessfully`)
          // taking user input for description,dob,hooby,gender
          description=readlinesync.question("about your self: ")
          dob=readlinesync.question("your DOB: ")
          hobby=readlinesync.question("your hobby: ")
          gender=readlinesync.question("gender: ")
          //here in this object again creating a new key profile
          firstUserData["user"][0]["profile"]={
                                        Description:description,
                                        DOB:dob,
                                        HOBBY:hobby,
                                        Gender:gender
                                          }
          //here calling the writefilesync function 
          //it will return a promise
          writefilesync('./userdetails.json',firstUserData)
          // when promise will be return if its resolve it will return filedata
          .then((firstData)=>{
            console.log(firstData)
            console.log("singed up succesfully!")
          })
        }
        else{
          console.log("password should be strong")
        }
      }
      else{
        console.log("both password are not strong")
      }
    }else{
      //here checking usename is exits is in json file or not,
      //if username is exits it will give true nigther will give false
      let flag=false
      for(let i=0;i<userDatas.length;i++){
        if(userDatas[i]['userName']===Name){
          console.log(userDatas[i]['userName'])
          flag=true;
          break
        }
      }
      console.log(flag)
      if(flag){
        console.log("user is already exits!")
      }
      //if user name is not exits again will ask for password,description etc.
      else{
        password=readlinesync.question("enter the password: ")
        confirmPassword=readlinesync.question("re enter your password: ")

        let userData={
              userName:Name,
              userpassword:password
            }
        if(password===confirmPassword){
          passwordvalue=checkpasswordstrength(password).value
          if(passwordvalue==="Strong"){
              console.log("you are succesfully signed up!","*************")
              description=readlinesync.question("about yourself: ")
              dob=readlinesync.question("DB: ")
              hobby=readlinesync.question("your hobby: ")
              gender=readlinesync.question("gender: ")
              userData["Profile"]={
                Description:description,
                DOB:dob,
                HOBBY:hobby,
                Gender:gender
              }
              usersContents['user'].push(userData)
              writefilesync('./userdetails.json',usersContents)
              .then((userData)=>{
                console.log(userData)
              })
          }
          else{
            console.log("password should be strong password")
          }
        }else{
          console.log("both password are not equal");
        }
      }
    }
  })
// this is for login 
}else if(userchoose==="l" || userchoose==="L"){
  Uname=readlinesync.question("enter your name: ")
  readfilesync('./userdetails.json',)
  .then((uData)=>{
    jsObject=uData["user"]
    let jsIndex=0;
    findUser=0
    //here checking user name is exits or not for log in. 
    //if exits then will return bio,gender,hobby,dob etc.
    while(jsIndex<jsObject.length){
      if(jsObject[jsIndex]["userName"]===Uname){
        usersprofile=jsObject[jsIndex]["profile"]
        userbio=jsObject[jsIndex]["profile"]["Description"]
        userdob=jsObject[jsIndex]["profile"]["DOB"]
        usergender=jsObject[jsIndex]["profile"]["Gender"]
        userhobby=jsObject[jsIndex]["profile"]["HOBBY"]
        findUser=1
        break
      }
      jsIndex++;
    }
    if(findUser===0){
      console.log("you can't log in first you have to do sign up")
    }
    // if user is exits will check for password,passwordvalidation.
    else if(findUser===1){
      Upassword=readlinesync.question("enter user password: ")
      confirmPassword=readlinesync.question("confirm your password: ")
      passwordValidation=checkpasswordstrength(Upassword).value
      if(Upassword===confirmPassword){
        if(passwordValidation==="Strong"){
          console.log(`${Uname}, you logged in succesfully!`)
          console.log(`username: ${Uname} `)
          console.log(`bio: ${userbio}`)
          console.log(`hobbies: ${userhobby}`)
          console.log(`dob: ${userdob}`)
          console.log(`gender: ${usergender}`)
        }
        else{
          console.log("password should contain special character,number,capitalL,small letter and length shold be 8")
        }
      }
      else{
        console.log("both password are not same")
      }
    }
  })
}

