let fieldes = document.querySelectorAll("#form-user-create [name]");
let enviar = document.querySelector("#form-user-create");
let user ={};

function addLine(dataUser){

  var tr = document.createElement("tr")

  tr.innerHTML = `
      <tr>
          <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.admin}</td>
          <td>${user.birth}</td>
          <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
          </td>
      </tr> 
  `;
      document.querySelector("#table-users").appendChild(tr);
}

enviar.addEventListener("submit", event=>{

  event.preventDefault();

    fieldes.forEach((fild, index) =>{

        if (fild.name == "gender"){
          
          if (fild.checked) {
              user[fild.name] = fild.value;
          }
        } else {
            user[fild.name] = fild.value;
        
        }
    });

      addLine(user);

});