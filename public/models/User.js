class User {

    constructor(name, gender, birth, country, email, password, photo, admin){

        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();

    }

    get id() {
        return this._id;
    }
    
    get register() {
        return this._register;
    }

    get name() {
        return this._name;
    }

    get gender() {
        return this._gender;
    }

    get birth() {
        return this._birth;
    }

    get country() {
        return this._country;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }
    get photo (){
        return this._photo;
    }

    get admin() {
        return this._admin;
    }

    loadFromJASON(json){

        for (let name in json) {

            switch(name){
                case '_register':
                    new Date(json[name]);
                break;
                
                default:
                if (name.substring(0,1) === '_') {
                    this[name] = json[name];   
                }   
            }     
        }
    }

    // Check if there are already registered users in the Storage session and create an array of users.
   static getUsersStorage(){

       return HttpRequest.get('/users/');

    }

    toJSON(){

        let json = {};

        Object.keys(this).forEach(key=>{

            if (this[key] !== undefined) {

                json[key] = this[key]
            }
        });

        return json;
    }

    // Save user NeDB
    save(){

        return new Promise((resolve,reject)=>{

        
            let promise;

            if (this.id) {

            promise = HttpRequest.put(`/users/${this.id}`, this.toJSON());

            } else {

                promise = HttpRequest.post('/users', this.toJSON());
            }

            promise.then(data => {

                this.loadFromJASON(data);

                resolve(this);

            }).catch(e=>{

                reject(e);
            });

        });


    }

    // Delete users from the localStorage
    remove(){

        return HttpRequest.delete(`/users/${this.id}`);

    }
}