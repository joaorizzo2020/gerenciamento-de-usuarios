class UserController {

    constructor(formIdCreate,formIdUpdate, tableId){

        this._formEl = document.getElementById(formIdCreate);
        this._formUpdateEl = document.getElementById(formIdUpdate);
        this._tableEl = document.getElementById(tableId);

        this.onSubmit();
        this.onEdit();

    }

    onEdit(){

        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e=>{

            this.showPanelCreate();

        });

        this._formUpdateEl.addEventListener("submit", event =>{

            event.preventDefault();

            let btn = this._formUpdateEl.querySelector("[type=submit]");

            btn.disabled = true;

            let values = this.getValues(this._formUpdateEl);
          
            let index = this._formUpdateEl.dataset.trIndex;

            let tr = this._tableEl.rows[index];

            let userOld = JSON.parse(tr.dataset.user);
            
            let result = Object.assign({}, userOld, values);

            this.getPhoto(this._formUpdateEl).then(

                (content)=>{ 
          
                    if (!values.photo) {
                        result._photo = userOld._photo;
                    } else { 
                        result._photo = content;
                    }    

                    tr.dataset.user = JSON.stringify(result);
                    
                    tr.innerHTML= `
                        <td><img src="${result._photo}" alt="User Image" class="img-circle img-sm"></td>
                        <td>${result._name}</td>
                        <td>${result._email}</td>
                        <td>${(result._admin) ? "Sim" : "Não" }</td>
                        <td>${Utils.dateFormat(result._register)}</td>
                        <td>
                            <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                            <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
                        </td>  
                    `;
                    
                    this.addEventsTr(tr);
                    this.updateCount();

                    this._formUpdateEl.reset();
                    btn.disabled = false;
                    this.showPanelCreate();

                },
                (e)=>{ 
                    console.error(e)
                }
            );

            
        });

    }

    onSubmit(){

        this._formEl.addEventListener("submit", event=>{

            event.preventDefault();

            let btn = this._formEl.querySelector("[type=submit]");

            btn.disabled = true;

            let values = this.getValues(this._formEl);

            if (!values ) {
                return false;
            }

            this.getPhoto(this._formEl).then(
                (content)=>{ 
                    values._photo = content;
                    this.addLine(values);
                    this._formEl.reset();
                    btn.disabled = false;
                },
                (e)=>{ 
                    console.error(e)
                }
            );
        });
    }

    getPhoto(formEl){

        return new Promise((resolve, reject)=>{

            let fileReader = new FileReader();

            let elements = [...formEl.elements].filter(item=>{
    
                if (item.name === 'photo'){
                    return item;
                }
            });
    
            let file = elements[0].files[0];
    
            fileReader.onload = ()=>{
    
                resolve(fileReader.result);
            };

            fileReader.onerror = (e)=>{
                reject(e);
            }

            if (file) {
                fileReader.readAsDataURL(file);
            }else {
                resolve('dist/img/boxed-bg.jpg');
            }
        });

       
    }

    getValues(formEl){

        let user = {};
        let isValid = true;

        [...formEl.elements].forEach((field, index) => {
          
            if (['name','email','password'].indexOf(field.name) > -1 && !field.value ) {

               field.parentElement.classList.add('has-error')
               isValid = false;
            }

            if (field.name == "gender"){
              
                if (field.checked) {

                  user[field.name] = field.value;
                }

            } else if (field.name == "admin") {
                
                 user[field.name] = field.checked;

            } else {
                
                user[field.name] = field.value;  
            }

        });

        if (!isValid) {
            return false;
        }

          return new User(  
            user.name, 
            user.gender, 
            user.birth, 
            user.country, 
            user.email,   
            user.password, 
            user.photo,
            user.admin
          );
             
    }

    addLine(dataUser){

        let tr = document.createElement('tr');

        tr.dataset.user = JSON.stringify(dataUser);

        tr.innerHTML= `
                <td><img src="${dataUser._photo}" alt="User Image" class="img-circle img-sm"></td>
                <td>${dataUser._name}</td>
                <td>${dataUser._email}</td>
                <td>${(dataUser._admin) ? "Sim" : "Não" }</td>
                <td>${Utils.dateFormat(dataUser._register)}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
                </td>  
        `;
    
        this.addEventsTr(tr);

        this._tableEl.appendChild(tr);

        this.updateCount();

    }

    addEventsTr(tr){

        tr.querySelector(".btn-delete").addEventListener("click", e=>{

            if (confirm("Deseja realmente excluir?")) {

                tr.remove();
                this.updateCount();         
            }
        });
         
        tr.querySelector(".btn-edit").addEventListener("click", e=>{

            let json = JSON.parse(tr.dataset.user);

            this._formUpdateEl.dataset.trIndex = tr.sectionRowIndex;
                
            for (let name in json) {
                    
                let field = this._formUpdateEl.querySelector("[name=" + name.replace("_","")+"]");
                    
                if (field) {

                     switch (field.type) {
                        case 'file':
                        continue;
                        break;    

                        case 'radio':
                            field = this._formUpdateEl.querySelector("[name=" + name.replace("_","")+"][value="+ json[name]+"]");
                            field.checked = true;
                        break;

                        case 'checkbox':
                            field.checked = json[name];
                        break;

                        default:
                            field.value = json[name];

                    }
                }
            }
            this._formUpdateEl.querySelector(".photo").src = json._photo;
            this.showPanelUpdate();

        });

    }

    showPanelCreate(){

        document.querySelector("#box-user-create").style.display ="block";
        document.querySelector("#box-user-update").style.display ="none";
    }

    showPanelUpdate(){

        document.querySelector("#box-user-create").style.display ="none";
        document.querySelector("#box-user-update").style.display ="block";
    }

    updateCount(){
        
        let numberUsers =0;
        let numberAdmin =0;
        
        [...this._tableEl.children].forEach((tr,index)=>{

            numberUsers++;

            let user = JSON.parse(tr.dataset.user);

            if (user._admin) {
                numberAdmin++;
            };
            
        });

        document.querySelector("#number-users").innerHTML = numberUsers;
        document.querySelector("#number-users-admin").innerHTML = numberAdmin;

    }

}