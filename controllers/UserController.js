class UserController {

    constructor(formID, tableId){

        this._formEl = document.getElementById(formID);
        this._tableEl = document.getElementById(tableId);

        this.onSubmit();

        console.log("construtor");

    }

    onSubmit(){

       this._formEl.addEventListener("submit", event=>{

            event.preventDefault();

            this.addLine(this.getValues());

            console.log("submit");

          });
    }

    getValues(){

        let user = {};

        [...this._formEl.elements].forEach((field, index) => {

            if (field.name == "gender"){
              
              if (field.checked) {
                  user[field.name] = field.value;
              }
            } else {
                user[field.name] = field.value;
            
            }

        });

          return new User(
            user.name, 
            user.gender, 
            user.birth, 
            user.country, 
            user.email,   
            user.password, 
            user.admin
          );
    }

    addLine(dataUser){

        this._tableEl.innerHTML= `
            <tr>
                <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${dataUser.admin}</td>
                <td>${dataUser.birth}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
            </tr>   
        `;
    }   

}