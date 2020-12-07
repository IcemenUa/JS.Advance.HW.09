let userArr = [];
const loginValidator = /^[a-zA-Z]{4,16}$/;
const eMailValidator = /^\w\D+(\.\w\D+)?@(\w+\.\w+|net.ua|org.ua|gmail.com)$/;
const passwordValidator = /\w{4,16}/;
const deleteBtns = document.getElementsByClassName('delete');
const editBtns = document.getElementsByClassName('edit');
const saveBtns = document.getElementsByClassName('save');
class UserEdit {
    constructor(userLogin, userPassword, userEmail) {
        this.userObj = () => {
            let user = {
                userlogin: this.login,
                userPassword: this.password,
                userEmail: this.email
            };
            return user;
        };
        this.login = userLogin;
        this.password = userPassword;
        this.email = userEmail;
    }
    ;
}
;
const GetById = (id) => {
    return document.getElementById(id);
};
const addUser = (login, password, email) => {
    let User = {
        userlogin: String(login),
        userPassword: String(password),
        userEmail: String(email)
    };
    userArr.push(User);
    GetById('login').value = '';
    GetById('password').value = '';
    GetById('email').value = '';
    tableConstuctor();
};
const deleteUser = (index) => {
    userArr.splice(index, 1);
    tableConstuctor();
};
const editUser = (id, name) => {
    let element = userArr[name];
    GetById(id).style.display = 'none';
    document.getElementById('save' + name).style.display = 'block';
    let userlogin = element['userlogin'];
    let userPassword = element['userPassword'];
    let userEmail = element['userEmail'];
    GetById('login').value = userlogin;
    GetById('password').value = userPassword;
    GetById('email').value = userEmail;
};
const saveChanges = (index) => {
    let login = GetById('login').value;
    let password = GetById('password').value;
    let email = GetById('email').value;
    let editUser = new UserEdit(login, password, email);
    let editedUser = editUser.userObj();
    userArr.splice(index, 1, editedUser);
    GetById('login').value = '';
    GetById('password').value = '';
    GetById('email').value = '';
    tableConstuctor();
};
const tableConstuctor = () => {
    GetById('table').innerHTML = '';
    userArr.forEach((value, index) => {
        GetById('table').innerHTML += `<tr>
        <td class="tableColumName">${index + 1}</td>
    <td class= "tableColumName"> ${value['userlogin']}</td>
    <td class= "tableColumName"> ${value['userPassword']}</td>
    <td class= "tableColumName"> ${value['userEmail']}</td>
    <td class="tableColumName"><input type="button" value="Edit"class="deleteEdit edit" name="${index}" style="background-color: yellow;"id ="edit${index}">
    <input type="button" value="Save"class="save" name="${index}" style= "display: none; background-color: yellow;"id ="save${index}" ></td>
    <td class="tableColumName"><input type="button" value="Delete"  class="deleteEdit delete"style="background-color: red;" id ="delete${index}"></td>
    </tr>`;
    });
    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener('click', (click) => {
            let element = click.target;
            deleteUser(element.id);
            tableConstuctor();
        });
    }
    ;
    for (let i = 0; i < editBtns.length; i++) {
        editBtns[i].addEventListener('click', (click) => {
            let element = click.target;
            let elementIndex = click.target;
            editUser(element.id, elementIndex.name);
            GetById('addUser').style.display = 'none';
        });
    }
    ;
    for (let i = 0; i < saveBtns.length; i++) {
        saveBtns[i].addEventListener('click', (click) => {
            let element = click.target;
            if (loginValidator.test(GetById('login').value) && eMailValidator.test(GetById('email').value) && passwordValidator.test(GetById('password').value)) {
                saveChanges(element.name);
                GetById('addUser').style.display = 'block';
                GetById('login').style.border = '';
                GetById('password').style.border = '';
                GetById('email').style.border = '';
            }
            else {
                GetById('login').style.border = '2px solid red';
                GetById('password').style.border = '2px solid red';
                GetById('email').style.border = '2px solid red';
            }
        });
    }
};
GetById('addUser').onclick = () => {
    if (loginValidator.test(GetById('login').value) && eMailValidator.test(GetById('email').value) && passwordValidator.test(GetById('password').value)) {
        const login = GetById('login').value;
        const password = GetById('password').value;
        const email = GetById('email').value;
        addUser(login, password, email);
        GetById('login').style.border = '';
        GetById('password').style.border = '';
        GetById('email').style.border = '';
    }
    else {
        GetById('login').style.border = '2px solid red';
        GetById('password').style.border = '2px solid red';
        GetById('email').style.border = '2px solid red';
    }
};
//# sourceMappingURL=main.js.map