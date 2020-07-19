let fieldes = document.querySelectorAll("#form-user-create [name]");
let enviar = document.querySelector("#form-user-create");
let user ={};

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
    console.log(user);
 });