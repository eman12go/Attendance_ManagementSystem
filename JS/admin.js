window.addEventListener('load', function () {
        // $('#empdata').on('click', () => {
        //     allEmployee()
        // });//end btn1
// });//end load

// function allEmployee(){
//     let header = ` <table id="employeeTable" width="100%" border="2px solid black;" class="table text-white">
//     <thead>
//         <th>Frist Name</th>
//         <th>Last Name</th>
//         <th>Address</th>
//         <th>E-mail</th>
//         <th>Age</th>
//         <th>User Name</th>
//     </thead>
// </table>`;

// $('#cardBody').empty();
// $('#cardBody').append(header);
// fetch("http://localhost:3000/employee",{
//     method:'get',
//     // body:JSON.stringify(employee),
//     columns: [
//         { data: "fname" },
//         { data: "lname" },
//         { data: "address" },
//         { data: "email" },
//         { data: "age" },
//         { data: "userName" }
//     ]
    
// }).then(res=>res.json())
// .then(data=>data.forEach(element => {
//     // for(var pro in x[i]){
//         // }
//         // table.appendChild(tr);
//     for(let i in element){
//         let tr=document.createElement("tr");
//         if(i=="id"){continue}
//         else if(i=="fname"||i=="lname"||i=="address"||i=="email"||i=="age"||i=="userName"){

//             // console.log(element[i])
//         let td=document.createElement("td");
//         td.innerText=element[i];
//         tr.appendChild(td);
//     }
//     }
//     $('#cardBody').appendChild(tr);
// }
// )
// // $('#cardBody').append(header);
// )
// .catch(error =>console.log(error));
// }
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
        $('#securitydata').on('click', () => {
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
                    url: "http://localhost:3000/security",
                    type: "get",
                    // success: function (data) {
                //         $(data).each((i)=> {
                //             let tr=` <tr>
                //             <td>${data[i].fname}</td>
                //             <td>${data[i].lname}</td>
                //             <td>${data[i].email}</td>
                //             <td>${data[i].address}</td>
                //             <td>${data[i].age}</td>
                //             <td>${data[i].userName}</td>
                //         </tr>`;
                //             console.log(tr)
                //             $('#employeeTable').append(tr);
                //         })
                //     },
                //     error: function (err) { console.log(err); }
                
                // },
                
            
                
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
                    <th>userName</th>
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

        $('#breif').on('click', () => {
            var header = ` <table id="employeeTable"  border="2px solid black;" class="table text-white">
                <thead>
                    <th>Frist Name</th>
                    <th>Last Name</th> 
                    <th>E-mail</th>
                    <th>Address</th>                  
                    <th>User Name</th>
                    <th>Password</th>
                    <th>Age</th>
                    <th>Role</th>
                    <th>New User</th>
                </thead>
            </table>`;
            $('#cardBody').empty();
            $('#cardBody').append(header);


            //console.log(userData);
            // arr = [];
            // arrExist = [];
            $("#employeeTable").DataTable({

                ajax: {
                    url: "http://localhost:3000/pending",
                    type: "GET",
                    // error: function (e) { },
                    // dataSrc: function (d) {
                    //     arr = d;
                    //     console.log(arr);
                    //     for (i = 0; i < arr.length; i++) {
                    //         console.log("السلام عليكم");
                    //         if (arr[i].reallyEmp == 0) {
                    //             arrExist.push(arr[i]);
                    //             console.log(arrExist);
                    //         }

                    //     }
                    //     console.log(arrExist[0].reallyEmp);
                    //     console.log(arrExist);
                    //     return arrExist;

                    // }
                    error: function (e) { },
                    dataSrc: function (d) {
                        return d;
                    }
                },
                columns: [
                    { data: "fname" },
                    { data: "lname" },
                    { data: "email" },
                    { data: "address" },
                    { data: "userName" },
                    { data: "password" },
                    { data: "age" },
                    { data: "role" },
                    {
                        defaultContent: `<button id="add" class="btn btn-success text-white">Add</button>\
                        <button id="reject" class="btn btn-danger text-white">Reject</button>`
                    }
                ]

            });
            var table = $('#employeeTable').DataTable();
            // console.log(table)
            // $('#cardBody').on('click', 'tr', function () {
            //     let test = $(this).children().last();
            //     let nnnnn = $(this).children().last().prev().html();

            //     console.log(test);
            //     console.log(nnnnn);
            //     if ($(this).hasClass('selected')) {
            //         $(this).removeClass('selected');
            //     } else {
            //         table.$('tr.selected').removeClass('selected');
            //         $(this).addClass('selected');

            //     }
            // });


            $('#cardBody').on('click', '#reject', function (e) {
                console.log("hi need remove :)");
                let name=e.target.parentElement.parentElement;
                // alert(name);
                ignoreRequest(name);
                
                // table.row('.selected').remove().draw(false);
            
            });
            $('#cardBody').on('click', '#add', function (e) {
                console.log("hi need add :)");
                let name=e.target.parentElement.parentElement;
                console.log(name);
                acceptRequest(name);
            });
        });


});//end load


async function ignoreRequest(name){
    let userData= await fetch(`http://localhost:3000/pending?firstName=${name}`);
    console.log(userData)
    let userDataObject= await userData.json();
    fetch(`http://localhost:3000/pending/${userDataObject[0].id}`, {method: 'DELETE',})
    
  }
async function acceptRequest(name){
    let userData= await fetch(`http://localhost:3000/pending?firstName=${name}`);
    // console.log(userData)
    let userDataObject= await userData.json();
    // fetch(`http://localhost:3000/pending/${userDataObject[0].id}`, {method: 'DELETE',})
    let userAdd=userDataObject[0];
    fetch(`http://localhost:3000/pending/${userDataObject[0].id}`,{method:'DELETE'})
    userAdd.id="";
    console.log(userAdd);
    if(userDataObject[0].role=='security')
    {
        fetch(`http://localhost:3000/security`,{
         method:'POST',
         headers:{'Content-Type':'application/json'},
         body: JSON.stringify(userDataObject[0])  
        })
    }else{
        fetch(`http://localhost:3000/employee`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(userDataObject[0])  
        })
    }
   

  }