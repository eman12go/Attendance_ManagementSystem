window.addEventListener('load', function () {
    let friday=new Date().getDay();
    let endOFmounth=new Date().getDate();
    let startOFDay=new Date().getHours();
    let endOFDay=new Date().getHours();
    if(friday==5){
        // holiday();
    }
    if(startOFDay==8){
        emptyToday();
    }
    if(endOFDay>19){
        absentEmployee();
    }
    $('#empdata').on('click', () => {
        
    let header = ` <table id="employeeTable" width="100%" border="2px solid black;" class="table text-white">
        <thead>
            <th>Frist Name</th>
            <th>Last Name</th>
            <th>E-mail</th>
            <th>Address</th>
            <th>Age</th>
            <th>User Name</th>
        </thead>
    </table>`;

    $('#cardBody').empty();
    $('#cardBody').append(header);
    $("#employeeTable").DataTable({
        ajax: {
            url: "http://localhost:3000/employee",
            type: "get",
            error: function (e) { },
            dataSrc: function (d) {
                return d;
            }
        },
        columns: [
            { data: "fname" },
            { data: "lname" },
            { data: "address" },
            { data: "email" },
            { data: "age" },
            { data: "userName" }
        ]
    });
});
    $('#addendance').on('click', () => {
        
    let header = `<label class="li col-2">user name of employee</label>
    <input type="text" class="col-3" id="username"/>
    <div class="btn-group col row  mx-auto" role="group" aria-label="Basic example">
      <button type="button"id="join" class="col-2 btn btn-primary">join</button>
      <button type="button"id="leave" class="col-2 btn btn-outline-primary">leave</button>
    </div> `;

    $('#cardBody').empty();
    $('#cardBody').append(header);
    $('#join').on('click', () => {
        let usernamejoin= $('#username');
        // console.log(usernamejoin[0]);
        getemployee(usernamejoin[0].value);
    });
    $('#leave').on('click', () => {
        let usernamejoin= $('#username');
        // console.log(usernamejoin[0]);
        leaveEmployee(usernamejoin[0].value);
    });
});


$('#lateRep').on('click', () => {
    let header = ` <table id="employeeTable" width="100%" border="2px solid black;" class="table text-white">
        <thead>
            <th>Frist Name</th>
            <th>user Name</th>
            <th>Late Days</th>
            <th>Attend Days</th>
        </thead>
    </table>`;

    $('#cardBody').empty();
    $('#cardBody').append(header);
    $("#employeeTable").DataTable({
        ajax: {
            url: "http://localhost:3000/employee",
            type: "GET",
            error: function (e) { },
            dataSrc: function (d) {
                return d;
            }
        },
        columns: [
            { data: "fname" },
            { data: "userName" },
            { data: "late" },
            { data: "attend" }

        ]
    });
});

$('#repexc').on('click', () => {
    var header = ` <table id="employeeTable" width="100%" border="2px solid black;" class="table text-white">
        <thead>
            <th>Frist Name</th>
            <th>user Name</th>
            <th>Absent Days</th>
            <th>Late Days</th>
            <th>Excuses</th>
        </thead>
    </table>`;

    $('#cardBody').empty();
    $('#cardBody').append(header);
    $("#employeeTable").DataTable({
        ajax: {
            url: "http://localhost:3000/employee",
            type: "GET",
            error: function (e) { },
            dataSrc: function (d) {
                return d;
            }
        },
        columns: [
            { data: "fname" },
            { data: "userName" },
            { data: "absent" },
            { data: "late" },
            { data: "excuse" }
        ]
    });
});
});//end load

async function absentEmployee(){
    let userData= await fetch(`http://localhost:3000/employee`, {   method:'GET'});
    let userDataObject= await userData.json();
    
    let getdateNow =  new Date().toDateString().split(" ").join('/') ;
    for(let i=0;i<userDataObject.length;i++){
        let dataOfUser=userDataObject[i];
        let attendDays=dataOfUser.dayAttend; 
        let flag=0;
        for(let i=0;i<attendDays.length;i++){
            let dataOfUser=userDataObject[i];
            attendDays= dataOfUser.dayAttend;      
            if(attendDays[i]== getdateNow){
                break;
            }
            if(flag==0){
                    dataOfUser.absent.push(getdateNow);
            }
            fetch(`http://localhost:3000/employee/${userDataObject[i].id}`, {
                    method:'PUT',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(dataOfUser),  
                })
        }
    }
        
            }
   
async function getemployee(name){
    let userData= await fetch(`http://localhost:3000/employee?userName=${name}`);
    let userDataObject= await userData.json();
    // console.log(userDataObject);
    if(userDataObject.length==0){
        let notValid="<h2 class='text-danger'id='invalid'>this user name not found</h2>";
        $('#cardBody').append(notValid);
    }
    else{
        $('#invalid').hide();
        $('#invalidj').hide();
        $('#invalidl').hide();
        let dataOfUser=userDataObject[0];
        let  arrayAttend=dataOfUser.Today;
        let date= new Date();
        let attendDays=dataOfUser.dayAttend;      
        let day=date.toDateString().split(" ").join('/')+ " - "+ date.getHours()+":"+date.getMinutes();
        let flag=0;

        for(let i=0;i<arrayAttend.length;i++){
            // console.log(arrayAttend.length)
            if(date.getDate()== arrayAttend[i].split('/')[2]){ // date of day 
                let notValid="<h2 class='text-danger'id='invalidj'>this user name join before</h2>";
                flag=1;
            $('#cardBody').append(notValid);
            }
        }
        if(flag==0){
            $('#invalidj').hide();
            arrayAttend.push(day);
            attendDays.push(date.toDateString().split(" ").join('/'));// attend in celender
            // alert(attendDays.length);
            if(date.getHours()>9){
                dataOfUser.late.push(day);
            }
            fetch(`http://localhost:3000/employee/${userDataObject[0].id}`, {
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(dataOfUser),  
            })
            // alert(dataOfUser)
            }
        }
  }
async function leaveEmployee(name){
    let userData= await fetch(`http://localhost:3000/employee?userName=${name}`);
    let userDataObject= await userData.json();
    
    if(userDataObject.length==0){
        let notValid="<h2 class='text-danger'id='invalid'>this user name not found</h2>";
        $('#cardBody').append(notValid);
    }
    else{
        $('#invalid').hide();
        $('#invalidj').hide();
        $('#invalidl').hide();
        let dataOfUser=userDataObject[0];
        let  arrayAttend=dataOfUser.Today;
        let date= new Date();      
        let day=date.toDateString().split(" ").join('/')+ " - "+ date.getHours()+":"+date.getMinutes();
        let flag=0;
        for(let i=0;i<dataOfUser.attend.length;i++){
            if(date.getDate()== dataOfUser.attend[i].split('/')[2]){
                let notValid="<h2 class='text-danger'id='invalidl'>this user name leave before</h2>";
                flag=1;
            $('#cardBody').append(notValid);
        }
    }
    if(flag==0){
        $('#invalidl').hide();
        $('#invalidj').hide();
        $('#invalidl').hide();
        arrayAttend.push(day);
        let attendDays=dataOfUser.attend;
        attendDays.push(day.split('-')[0])
        if(date.getHours()<15){
            let excuse=confirm("Are you need to excuse???");
            if(excuse){
                dataOfUser.excuse.push(day);
            }
        }
        fetch(`http://localhost:3000/employee/${userDataObject[0].id}`, {
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(dataOfUser),  
        })
        // alert(dataOfUser)
        }
    }
  }
async function  holiday(){
    let userData= await fetch(`http://localhost:3000/employee`, {   method:'GET'});
    let userDataObject= await userData.json();
        let date= new Date();
        
        for(let i=0;i<userDataObject.length;i++){
            let dataOfUser=userDataObject[i];
            let attendDays=dataOfUser.dayAttend;      
          attendDays.push(date.toDateString().split(" ").join('/'));
            fetch(`http://localhost:3000/employee/${userDataObject[i].id}`, {
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(dataOfUser),  
            })
        }
        // alert(dataOfUser)

  }
async function   emptyToday(){
    let userData= await fetch(`http://localhost:3000/employee`, {   method:'GET'});
    let userDataObject= await userData.json();
        
        for(let i=0;i<userDataObject.length;i++){
            let dataOfUser=userDataObject[i];
            let attendDays=dataOfUser.Today;      
            if(date.getDate()=! attendDays.split('/')[2]){
                // console.log('here not =')
                attendDays.pop();
                attendDays.pop();
            }else{  // if emp come early !!
                break;
            }
            fetch(`http://localhost:3000/employee/${userDataObject[i].id}`, {
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(dataOfUser),  
            })
        }
        
}
