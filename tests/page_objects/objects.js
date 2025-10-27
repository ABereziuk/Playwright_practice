//export {Buttons, LoginPage}

export class Buttons {
    constructor(page) {
    this.page=page
    }
//login button
async loginBtn() {
    await this.page.getByRole('button', {name:"Login"}).scrollIntoViewIfNeeded()
    await this.page.getByRole('button', {name:"Login"}).click()
};
//logout button
async logoutBtn() {
    await this.page.getByRole('button', {name:"Logout"}).scrollIntoViewIfNeeded()
};
//register button
async registerBtn() {
    await this.page.getByRole('button', {name:"Register"}).scrollIntoViewIfNeeded()
    await this.page.getByRole('button', {name:"Register"}).waitFor({state:'visible'})
    await this.page.getByRole('button', {name:"Register"}).click()
};
//retrieve password button
async retrievePasswordBtn() {
    await this.page.getByRole('button', {name:"Retrieve password"}).scrollIntoViewIfNeeded()
    await this.page.getByRole('button', {name:"Retrieve password"}).click()
}
}

export class LoginPage {
    constructor(page) {
        this.page=page
        }
//user name field
userNameField = async({userName}) =>{
    await this.page.getByRole('textbox', {name: "Username"}).fill(userName)
};
//password field
async passwordField ({password}) {
    await this.page.getByRole('textbox', {name:"Password"}).nth(0).scrollIntoViewIfNeeded()
    //await this.page.getByRole('textbox', {name:"Password"}).waitFor({state:'visible'})
    await this.page.getByRole('textbox', {name:"Password"}).nth(0).fill(password)
};
//confirm password field
 async confirmPasswordField ({confirmedPassword}) {
    await this.page.getByRole('textbox', {name:"Confirm Password"}).waitFor({state:'visible'})
    await this.page.getByRole('textbox', {name:"Confirm Password"}).fill(confirmedPassword)
};
//email field
async emailField  ({email}) {
    await this.page.getByRole('textbox', {name:"E-mail"}).waitFor({state:'visible'})
    await this.page.getByRole('textbox', {name:"E-mail"}).fill(email)
}
}

export class Alerts {
    constructor(page) {
        this.page=page
    }
//Retrieve email
retrieveAlert = () =>{
    return this.page.locator('#confirmation-alert')
}
//Successful registration
registrationAlert = () => {
    return this.page.locator('#flash')
}

}
export class Errors {
    constructor(page) {
        this.page = page
    }
//Please enter a valid email
inavalidEmailError = () =>{
    return this.page.locator('.invalid-feedback')
}
}