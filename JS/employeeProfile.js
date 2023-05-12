let userEmp;
window.addEventListener('load', function () {
  let employee=localStorage.getItem("employee");
  user=employee.split(',')[0].split(':')[1];
  display(user);
  
  
});//end load

async function display(name){

  let userData= await fetch(`http://localhost:3000/employee?firstName=${name}`);
  userDataObject= await userData.json();
  userEmp=userDataObject[0].userName;
  console.log(userDataObject[0]);
  $('#name').html(userDataObject[0].fname);
  $('#userName').html(userDataObject[0].userName);
  $('#email').html(userDataObject[0].email);
  $('#address').html(userDataObject[0].address);
}
async function dailyRep(){
  let name =localStorage.getItem('employee').split(',')[0].split(':')[1];
  let userData= await fetch(`http://localhost:3000/employee?firstName=${name}`);
  // console.log(userData)
  let userDataObject= await userData.json();
  console.log(userDataObject[0].attend);
  let currentdate=new Date();
  let dateNow=  currentdate.getFullYear() +"-"+ currentdate.getMonth() + 1+"-" +currentdate.getDate()
  $('#profile').hide();
 
  let input=`<input class="mt-5 ms-3" type="date" id="date-input" min="${userDataObject[0].registerDay}" max="${dateNow}"onchange="handler(event);" required />`
  $('#report').empty();
  $('#report').append(input);
 

}
function handler(e){
//  console.log(e.target.value , userDataObject[0]);
 let header = ` <p class="text-center">Simple table for day:${e.target.value}</p>
 <table id="employeeTable" width="100%" border="2px solid black;" class="mt-3 table ">
               <thead>
                   
                   <th>User Name</th>
                   <th>late days</th>
                   <th>Excuses Days</th>
                   <th>Attend Days</th>
               </thead>
               <tr>
               <td>${userDataObject[0].userName}</td>
               <td>${userDataObject[0].late}</td>
               <td>${userDataObject[0].excuse}</td>
               <td>${userDataObject[0].attend}</td>
               </tr>
           </table>`;
           $('#report').empty();
           $('#report').append(header);
 }
function manth(e){
//  console.log(e.target.value , userDataObject[0]);
 let header = ` <p class="text-center">Simple table for day:${e.target.value}</p>
 <table id="employeeTable" width="100%" border="2px solid black;" class="mt-3 table ">
               <thead>
                   
                   <th>User Name</th>
                   <th>late days</th>
                   <th>Excuses Days</th>
                   <th>Attend Days</th>
               </thead>
               <tr>
               <td>${userDataObject[0].userName}</td>
               <td>${userDataObject[0].late}</td>
               <td>${userDataObject[0].excuse}</td>
               <td>${userDataObject[0].attend}</td>
               </tr>
           </table>`;
           $('#report').empty();
           $('#report').append(header);
 }