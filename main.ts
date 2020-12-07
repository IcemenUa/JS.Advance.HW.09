let userArr: Object[] = [];
const loginValidator = /^[a-zA-Z]{4,16}$/;
const eMailValidator = /^\w\D+(\.\w\D+)?@(\w+\.\w+|net.ua|org.ua|gmail.com)$/;
const passwordValidator = /\w{4,16}/;
const deleteBtns: HTMLCollection = document.getElementsByClassName('delete');
const editBtns: HTMLCollection = document.getElementsByClassName('edit');
const saveBtns: HTMLCollection = document.getElementsByClassName('save');
class UserEdit {
    login: string;
    password: string;
    email: string;
    constructor(userLogin: string, userPassword: string, userEmail: string) {
        this.login = userLogin;
        this.password = userPassword;
        this.email = userEmail;
    };
    userObj: Function = () => {
        let user: object = {
            userlogin: this.login,
            userPassword: this.password,
            userEmail: this.email
        }
        return user
    }
};
const GetById: Function = (id): any => {
    return document.getElementById(id);
};

const addUser: Function = (login, password, email): void => {
    let User: Object = {
        userlogin: String(login),
        userPassword: String(password),
        userEmail: String(email)
    };
    userArr.push(User);
    GetById('login').value = '';
    GetById('password').value = '';
    GetById('email').value = '';
    tableConstuctor()
};
const deleteUser: Function = (index): void => {
    userArr.splice(index, 1)
    tableConstuctor()
};
const editUser: Function = (id, name): void => {
    let element: Object = userArr[name];
    GetById(id).style.display = 'none'
    document.getElementById('save' + name).style.display = 'block'
    let userlogin: string = element['userlogin'];
    let userPassword: string = element['userPassword'];
    let userEmail: string = element['userEmail'];
    GetById('login').value = userlogin;
    GetById('password').value = userPassword;
    GetById('email').value = userEmail;
};

const saveChanges: Function = (index): void => {
    let login: string = GetById('login').value
    let password: string = GetById('password').value
    let email: string = GetById('email').value
    let editUser = new UserEdit(login, password, email);
    let editedUser = editUser.userObj()
    userArr.splice(index, 1, editedUser);
    GetById('login').value = '';
    GetById('password').value = '';
    GetById('email').value = '';
    tableConstuctor()
}

const tableConstuctor: Function = (): void => {
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
    </tr>`
    });
    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener('click', (click) => {
            let element: any = click.target;
            deleteUser(element.id);
            tableConstuctor();
        });
    };
    for (let i = 0; i < editBtns.length; i++) {
        editBtns[i].addEventListener('click', (click) => {
            let element: any = click.target;
            let elementIndex: any = click.target
            editUser(element.id, elementIndex.name);
            GetById('addUser').style.display = 'none'
        });
    };

    for (let i = 0; i < saveBtns.length; i++) {
        saveBtns[i].addEventListener('click', (click) => {
            let element: any = click.target;
            if (loginValidator.test(GetById('login').value) && eMailValidator.test(GetById('email').value) && passwordValidator.test(GetById('password').value)) {
                saveChanges(element.name);
                GetById('addUser').style.display = 'block'
                GetById('login').style.border = ''
                GetById('password').style.border = ''
                GetById('email').style.border = ''
            }
            else {
                GetById('login').style.border = '2px solid red'
                GetById('password').style.border = '2px solid red'
                GetById('email').style.border = '2px solid red'
            }
        })
    }


};
GetById('addUser').onclick = () => {
    if (loginValidator.test(GetById('login').value) && eMailValidator.test(GetById('email').value) && passwordValidator.test(GetById('password').value)) {
        const login: string = GetById('login').value;
        const password: string = GetById('password').value;
        const email: string = GetById('email').value;
        addUser(login, password, email);
        GetById('login').style.border = ''
        GetById('password').style.border = ''
        GetById('email').style.border = ''
    }
    else {
        GetById('login').style.border = '2px solid red'
        GetById('password').style.border = '2px solid red'
        GetById('email').style.border = '2px solid red'
    }
};

