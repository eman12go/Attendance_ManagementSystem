let form =document.getElementsByTagName('form')[0];
window.addEventListener('load', function () {

    let logBtn= document.querySelector(".log");
    let userName= document.getElementById("validationCustomUsername");
    let password=document.getElementById('exampleInputPassword1');
    let  secuirtyBtn = document.querySelector("#chBtnSucirty");
    let  employeeBtn = document.querySelector("#chBtnEmployee");
    let form =document.getElementsByTagName('form')[0];
    form.addEventListener('submit',(e)=>{
      if(userName.value.trim().length>0 && password.value.trim().length >0){
        // console.log(userName.value)
          if(userName.value=="emanAdmin"&& password.value =="123456"){
            console.log("hello admin :)");
            form.setAttribute("action", "./../HTml/Admin.html");
          }
          else if(secuirtyBtn.checked){
            secuirtyfun(userName.value.trim(),password.value.trim() );
            if(localStorage.getItem("security")!=null){

              form.setAttribute("action", "./../HTml/SecurityProfile.html");
            }
          }             
          else if(employeeBtn.checked){ 
            employeefun(userName.value.trim(),password.value.trim() );
            if(localStorage.getItem("employee")!=null){
              form.setAttribute("action", "./../HTml/EmployeeProfile.html");
            }

            
          }
    }
  else{
      e.preventDefault();
      alert('no data');
      if(userName.trim().length==0){

          document.querySelector(".invalid-feedback").style.display="block";
        }
        if(password.trim().length==0){
        
          document.querySelector("#invalid_pass").style.display="block";
        
        }
        
      }
    });// end form
  });//end load


async function secuirtyfun(name,password){
      let userData= await fetch(`http://localhost:3000/security?userName=${name}`);
      let userDataObject= await userData.json();
      
      if(userDataObject.length==0){
        $('.invalid-feedback').show(); 
        return false
      }
      if(userDataObject[0].password ==password){
        // alert("local "+localStorage.getItem("security"));
        if(localStorage.getItem("security")==null){

          localStorage.setItem("security", JSON.stringify({
              userName: name,
              password: password,
              
          }));
        }
        alert(`hello ${name}`);
        loginSecurity(name);
        window.open("./../HTml/SecurityProfile.html", "_self");
        
      }
      else{
        // alert('not valid pass');
        $('.invalid-feedback').show(); 
      
      }
    }

async function employeefun(name,password){
      let userData= await fetch(`http://localhost:3000/employee?userName=${name}`);
      let userDataObject= await userData.json();
      
      if(userDataObject.length==0){
        $('.invalid-feedback').show(); 
        return false
      }
      if(userDataObject[0].password ==password){
        // alert("local "+localStorage.getItem("employee"));
        if(localStorage.getItem("employee")==null){

          localStorage.setItem("employee", JSON.stringify({
              userName: name,
              password: password,
              
          }));
        }
        alert(`hello ${name}`);
        window.open("./../HTml/EmployeeProfile.html", "_self");
        
      }
      else{
        alert('not valid pass');
        $('.invalid-feedback').show(); 
      
      }
    }


async function loginSecurity(name){
  let userData= await fetch(`http://localhost:3000/security?userName=${name}`);
  let userDataObject= await userData.json();
  let dataOfUser=userDataObject[0];
  let  arrayAttend=dataOfUser.Today;
  let date= new Date();
  let attendDays=dataOfUser.dayAttend;      
  let day=date.toDateString().split(" ").join('/')+ " - "+ date.getHours()+":"+date.getMinutes();
  
    arrayAttend.push(day);
    attendDays.push(date.toDateString().split(" ").join('/'));// attend in celender
    alert(attendDays.length);
    if(date.getHours()>9){
        dataOfUser.late.push(day);
    }
    fetch(`http://localhost:3000/security/${userDataObject[0].id}`, {
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(dataOfUser),  
    })
    
    }