
//*************************************global variable */
// let daysOfyear = new Array(12);
// for (let i = 0; i < daysOfyear.length; i++) {
//   daysOfyear[i] = new Array(30);
// }

//********************************  pattern   ******************************//
let patternName = /^[a-zA-z]{3}/;
let patternEmail = /^[a-zA-Z0-9]+@[a-zA-Z]{3,8}.[a-zA-Z]{3,5}/;
// let patternUser = /^[a-zA-z1-9]{3,8}/;
let patternAddress = /^[a-zA-z1-9]{3,18}/;
let patternPass = /^[A-Za-z0-9]{8,}/;
let patternAge = /^2[0-9]|3[0-9]|4[0-9]|5[00]$/;

window.addEventListener('load', function () {
  // ************************** get method from form   *****************************
    let  firstName = document.querySelector("#validationCustom01");
    let  lastName = document.querySelector("#validationCustom02");
    let  address = document.querySelector("#validationCustom03");
    // let  userName = document.querySelector("#validationCustomUsername");
    let  email = document.querySelector("#exampleInputEmail1");
    // let  password = document.querySelector("#exampleInputPassword1");
    let  age = document.querySelector("#exampleInputAge");
    let  form = document.querySelector("#form");
    let  secuirtyBtn = document.querySelector("#chBtnSucirty");
    let  employeeBtn = document.querySelector("#chBtnEmployee");
    let  mailnotValid = document.querySelector("#mailNotValid");
    let  userNotValid = document.querySelector("#userNotValid");
    
   
    // let  buttonRegister = document.querySelector("#form");
  //**************************** submit function  *******************************//
    form.addEventListener('submit', function (e) {
      // buttonRegister.addEventListener('click', function (event) {
      if (!(isValidName(firstName)&&isDaplicateEmail(email)&& isValidName(lastName)   && isValidEmail(email)  && isValidAge(age)&& isValidAddress(address))) {
                    e.preventDefault();
      }
                if (!isValidName(firstName)) {
                    firstname.focus();
                }
                if (!isValidName(lastName)) {
                    lastname.focus();
                }
                // if (!isValidName(userName)) {
                //     userName.focus();
                // }
                if (!isValidEmail(email)) {
                    email.focus();
                }
                
                if (!isValidAge(age)) {
                    age.focus();
                  }
                // if (!isValidPass(password)) {
                //       password.focus();
                //   }
                if (!isValidAddress(address)) {
                    address.focus();
                }
        if ( isValidEmail(email)&&isValidAge(age) && isValidAddress(address) && isValidName(lastName) && isValidName(firstName)) {
             
                // open new window to get code 
                // openchildfun();
                let randomCode=Math.ceil(Math.random(200) *900000);
                let randomCode2=Math.floor(Math.random(200) *90000000);
                let userName= firstName.value+""+randomCode;
                let  Randpassword=randomCode+""+randomCode2;
                Email.send({
                  // SecureToken : "199b08aa-fdaf-4d00-b970-cdbfa2906273",
                  SecureToken : "da6f5013-13a9-4bdd-ab05-849ae55d8f0c",
                  To : email.value,
                  From : "emandev2023@gmail.com",
                  Subject : "your Information for login  ",
                  Body : "This is code  to verfiy your account "+randomCode+"  && inf to login  username "+userName+"\n & your pass is "+Randpassword +" Adim will accept your request sooon.."
                  }).then(

                    (message) =>{ alert(message+ "  الحمدلله تم .....");
                    let success= prompt("please check your mail & enter your code here: ");
                    if(success==randomCode){
                      if(chBtnEmployee.checked)
                      {
                      addEmployee(randomCode,userName,Randpassword)
                      }else{
                        addSecuirty(randomCode,userName,Randpassword)
                      }
                    }else{
                      alert("Sorry ,not valid number I can`t save your data before verify")
                    }
                  }
                );
            
              }
              

    });//end submit function

// *************************  keyup functions ************************************
    $(firstName).keyup(function() {
      if(firstName.value.trim().length>0){
        isValidName(firstName);
        // console.log(isValidName(firstName));
      }
    }); // end firstname vaild
    $(lastName).keyup(function() {
      if(lastName.value.trim().length>0){
        isValidName(lastName);
      }
    });// end lastname vaild
    // $(userName).keyup(function() {
    //   if(userName.value.trim().length>0){
    //     if(!isDaplicateUser(userName))
    //     {
    //       document.querySelector("#userNotValid").style.display = "none"; 
                    
    //       isValidName(userName);
    //     }
    //   }
    // });// end lastname vaild
    $(address).keyup(function() {
      if(address.value.trim().length>0){
        isValidAddress(address);
      }
    });// end address vaild
    $(email).keyup(function() {
      if(email.value.trim().length>0){
        isValidEmail(email);
      }
    });// end address vaild
    $(age).keyup(function() {
      if(age.value.trim().length>0){
        isValidAge(age);
      }
    });// end address vaild
    // $(password).keyup(function() {
    //   if(password.value.trim().length>0){
    //     isValidPass(password);
    //   }
    // });// end address vaild

   
// *******-  add data in register  ********************************/

         // Add  employee
        function addEmployee(randomCode,userName,Randpassword) {
          let currentdate = new Date();
          let getdateNow = currentdate.getFullYear() +"-"+ currentdate.getMonth() + 1+"-" +currentdate.getDate() ;

          let xhr = new XMLHttpRequest();
          let employee = {
              "id":"",
              "fname": firstName.value,
              "lname": lastName.value,
              "email": email.value,
              "address": address.value,
              "age": age.value,
              "userName": userName,
              "password": Randpassword,
              "randomCode": randomCode,
              "registerDay": getdateNow, 
              "role":"employee",
              "dayAttend": [],
              "Today": [],
              "excuse": [],
              "absent": [],
              "attend": [],
              "late": []
          };
          xhr.open("POST"," http://localhost:3000/pending",true);
          xhr.setRequestHeader("content-type","Application/json"); // type of send ....important..!!!
          xhr.send(JSON.stringify(employee));
          xhr.onreadystatechange=function(){
              //4=>done 200 =>Done
              if(xhr.status==200 && xhr.readyState==4){
          
              
                  }
              
              }
          
      }//end  json add employee
      
      //  add secuirty
      function addSecuirty(randomCode,userName,Randpassword) {
        let xhr = new XMLHttpRequest();
        let currentdate = new Date();
        let getdateNow = currentdate.getFullYear() +"-"+ currentdate.getMonth() + 1+"-" +currentdate.getDate() ;

        let secuirty = {
            "id":"",
            "fname": firstName.value,
            "lname": lastName.value,
            "email": email.value,
            "address": address.value,
            "age": age.value,
            "userName": userName,
            "password": Randpassword,
            "randomCode": randomCode,
            "registerDay": getdateNow,
            "role":"security", 
            "dayAttend": [],
            "Today": [],
            "excuse": [],
            "absent": [],
            "attend": [],
            "late": []
        };
        xhr.open("POST"," http://localhost:3000/pending",true);
        xhr.setRequestHeader("content-type","Application/json"); // type of send ....important..!!!
        xhr.send(JSON.stringify(secuirty));
        xhr.onreadystatechange=function(){
            //4=>done 200 =>Done
            if(xhr.status==200 && xhr.readyState==4){
        
            
                }
            
            }
        
    }//end  json add security

});// end load func

    //*************************   function valid      ****************************************//
    function isValidName(name) {
      let  text=name.value.trim();
      let result = patternName.test(text);
      valid =name.parentElement.getElementsByClassName('valid-feedback')[0];
      invalid =name.parentElement.getElementsByClassName('spanftxt')[0];
      // invalid =document.querySelector('.spanftxt');
      if(result){
        name.style.borderColor="green";
        // document.getElementById('main').getElementsByClassName('myclass')[0]
        valid.style.display = "block";
        invalid.style.display = "none";
        return true;
      }
      else{
        valid.style.display = "none ";
        invalid.style.display = "block"; 
        name.style.borderColor="red";
        name.focus();
        return false;
      }
      }

    function isValidEmail(email) {
          let  text=email.value.trim();
          let result = patternEmail.test(text);
          valid =email.parentElement.getElementsByClassName('valid-feedback')[0];
          invalid =document.getElementById('spanemail');
          if(isDaplicateEmail(email)){
            console.log(isDaplicateEmail(email));
          }
            
            else {
              document.querySelector("#mailNotValid").style.display = "none"; 
                    
              if(result){
              email.style.borderColor="green";
              // document.getElementById('main').getElementsByClassName('myclass')[0]
              valid.style.display = "block";
              invalid.style.display = "none";
              document.querySelector("#mailNotValid").style.display = "none"; 
          
              return true;
            }
            else{
              valid.style.display = "none ";
              invalid.style.display = "block"; 
              email.style.borderColor="red";
              document.querySelector("#mailNotValid").style.display = "none"; 
          
              return false;
            }
          }
        }
        
    function isDaplicateEmail(email) {
          let  text=email.value.trim();
          let result = patternEmail.test(text);
          valid =email.parentElement.getElementsByClassName('valid-feedback')[0];
          invalid =document.getElementById('spanemail');
          let xhr = new XMLHttpRequest();
          let flag=0;
          if(document.querySelector("#chBtnEmployee").checked){
            xhr.open("GET"," http://localhost:3000/employee",true);
            }
            else {
            xhr.open("GET"," http://localhost:3000/security",true);
            }
            xhr.send("");
          xhr.onreadystatechange=function(){
              //4=>done 200 =>Done
              if(xhr.status==200 && xhr.readyState==4){
                let x= JSON.parse(xhr.responseText);
                for (let i = 0; i <x.length; i++) {
                  // console.log(x[i].email==email.value);

                  if(x[i].email==email.value){
                    console.log("duplicated mail");
                    valid.style.display = "none ";
                    document.querySelector("#mailNotValid").style.display = "block"; 
                    email.style.borderColor="red";
                    flag=1;
                    console.log(flag)
                    return true;
                  }
                  
                }
              }
            }
            
        }
    function isDaplicateUser(userName) {
          let  text=userName.value.trim();
          let result = patternName.test(text);
          valid =userName.parentElement.getElementsByClassName('valid-feedback')[0];
          invalid =userName.parentElement.getElementsByClassName('spanftxt')[0];
          let xhr = new XMLHttpRequest();
          let flag=0;
          if(document.querySelector("#chBtnEmployee").checked){
          xhr.open("GET"," http://localhost:3000/employee",true);
          }
          else {
          xhr.open("GET"," http://localhost:3000/security",true);
          }
          xhr.send("");
          xhr.onreadystatechange=function(){
              //4=>done 200 =>Done
              if(xhr.status==200 && xhr.readyState==4){
                let x= JSON.parse(xhr.responseText);
                for (let i = 0; i <x.length; i++) {
                  // console.log(x[i].userName);
                  
                  if(x[i].userName==userName.value){
                    console.log("duplicated user");
                    valid.style.display = "none ";
                    document.querySelector("#userNotValid").style.display = "block"; 
                    userName.style.borderColor="red";
                    flag=1;
                    console.log(flag)
                    return true;
                  }
                }
                }
              }
            }
            
        
    function isValidAddress(address) {
      let  text=address.value.trim();
      let result = patternAddress.test(text);
      valid =address.parentElement.getElementsByClassName('valid-feedback')[0];
      invalid =address.parentElement.getElementsByClassName('spanaddress')[0];
    
      if(result){
        address.style.borderColor="green";
        // document.getElementById('main').getElementsByClassName('myclass')[0]
        valid.style.display = "block";
        invalid.style.display = "none";
        return true;
      }
      else{
        valid.style.display = "none ";
        invalid.style.display = "block"; 
        address.style.borderColor="red";
        return false;
      }
}
    function isValidAge(age) {
      let  ageNum=age.value.trim();
          let result = patternAge.test(ageNum);
          valid =age.parentElement.getElementsByClassName('valid-feedback')[0];
          invalid =age.parentElement.getElementsByClassName('span_age')[0];
        
          if(result){
            age.style.borderColor="green";
            // document.getElementById('main').getElementsByClassName('myclass')[0]
            valid.style.display = "block";
            invalid.style.display = "none";
            return true;
          }
          else{
            valid.style.display = "none ";
            invalid.style.display = "block"; 
            age.style.borderColor="red";
            return false;
          }

        }
    function isValidPass(password) {
      let  passNum=password.value.trim();
          let result = patternPass.test(passNum);
          valid =password.parentElement.getElementsByClassName('valid-feedback')[0];
          invalid =password.parentElement.getElementsByClassName('spanpass')[0];
        
          if(result && passNum.length>5&& passNum.length<9){
            password.style.borderColor="green";
            // document.getElementById('main').getElementsByClassName('myclass')[0]
            valid.style.display = "block";
            invalid.style.display = "none";
            return true;
          }
          else{
            valid.style.display = "none ";
            invalid.style.display = "block"; 
            password.style.borderColor="red";
            return false;
          }
        }



//*******     other functions  ****************************** */
function openchildfun() {
  targetwindow= open("childvalidCodeAfterRegister.html", "", "width=400,height=400");
}