/*****************************   SecureToken 2   ***********************/ 

let patternEmail = /^[a-zA-Z0-9]+@[a-zA-Z]{3,8}.[a-zA-Z]{3,5}/;

window.addEventListener('load', function () {
let  form = document.querySelector(".needs-validation");
let  email = document.querySelector("#exampleInputEmail1");
$(email).keyup(function() {
  if(email.value.trim().length>0){
    isValidEmail(email);
  }
});
form.addEventListener('submit', function (e) {
  if (!isDaplicateEmail(email)) {
    let randomCode=Math.ceil(Math.random(200) *90000000)+""+Math.floor(Math.random(200) *90000);
Email.send({
  // SecureToken : "199b08aa-fdaf-4d00-b970-cdbfa2906273",
  SecureToken : "da6f5013-13a9-4bdd-ab05-849ae55d8f0c",
  To : email.value,
  From : "emandev2023@gmail.com",
  Subject : "your code ",
  Body : "This is  your new pass  "+randomCode
  }).then(

    (message) =>{ alert(message+ " الحمدلله تم .....");
    
      updatePass(randomCode);
  });
  }

})//end submit
});//end load

function isValidEmail(email) {
  let  text=email.value.trim();
  let result = patternEmail.test(text);
  valid =email.parentElement.getElementsByClassName('valid-feedback')[0];
  invalid =document.getElementById('spanemail');
  if(isDaplicateEmail(email)){
    console.log(isDaplicateEmail(email));      
      if(result){
      email.style.borderColor="green";
      // document.getElementById('main').getElementsByClassName('myclass')[0]
      valid.style.display = "block";
      invalid.style.display = "none";
    
      return true;
    }
    else{
      valid.style.display = "none ";
      invalid.style.display = "block"; 
      email.style.borderColor="red";
    
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
          xhr.open("GET"," http://localhost:3000/security",true);
          xhr.send("");
          xhr.onreadystatechange=function(){
          if(xhr.status==200 && xhr.readyState==4){
                  let x= JSON.parse(xhr.responseText);
                  for (let i = 0; i <x.length; i++) {
                    // console.log(x[i].email==email.value);
  
                    if(x[i].email==email.value){
                      alert(" mail found الحمدلله......");
                      valid.style.display = "block ";
                      invalid.style.display = "none ";
                      email.style.borderColor="green";
                      // flag=1;
                      console.log("emp "+flag)
                      return true;
                    }
                    
                  }
                }
              //   if(flag==0){
              //     let xhr = new XMLHttpRequest();
              //     xhr.open("GET"," http://localhost:3000/security",true);
              //     xhr.send("");
              //     xhr.onreadystatechange=function(){
              //     if(xhr.status==200 && xhr.readyState==4){
              //     let x= JSON.parse(xhr.responseText);
              //     for (let i = 0; i <x.length; i++) {
              //       // console.log(x[i].email==email.value);
  
              //       if(x[i].email==email.value){
              //         alert(" mail found الحمدلله......");
              //         valid.style.display = "block ";
              //         invalid.style.display = "none ";
              //         email.style.borderColor="green";
              //         flag=1;
              //         console.log("sec"+flag)
              //         return i;
              //       }
                    
              //     }
              //   }
              //   if(flag==0){
              //     valid.style.display = "none ";
              //     invalid.style.display = "block ";
              //     email.style.borderColor="red";
              //   }
              //     }
              // }
            }
           
           
            
        }
async function updatePass(randomCode){
  let userData= await fetch(`http://localhost:3000/security`, {   method:'GET'});
    let userDataObject= await userData.json();
      fetch(`http://localhost:3000/security/${userDataObject[0].id}`, {
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(dataOfUser),  
            })
        
}