import { test, expect } from '@playwright/test'
import { LoginPage, Buttons, Alerts, Errors } from './page_objects/objects.js'
let loginPage
let button
let alerts
let errors
//function to generate unique user name
function generateUniqueUsername(base: string = 'user') {
    const timestamp = Date.now();
    return `${base}${timestamp}`
}

test.beforeEach(async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/register')
    loginPage = new LoginPage(page)
    button = new Buttons(page)
    alerts = new Alerts (page)
    errors = new Errors (page)
});

test ('Valid registration', async ({page}) => {
    await loginPage.userNameField ({userName:generateUniqueUsername()})
    await loginPage.passwordField ({password: 'Qual1ty!!!'})
    await loginPage.confirmPasswordField ({confirmedPassword: 'Qual1ty!!!'})
    await button.registerBtn()

    await expect(page).toHaveURL('https://practice.expandtesting.com/login')
    await expect(alerts.RegistrationAlert()).toHaveText('Successfully registered, you can log in now.')

})

test ('Empty required fields', async({page}) => {
    await button.registerBtn()

    await expect(page).toHaveURL('https://practice.expandtesting.com/register')
    await expect(alerts.RegistrationAlert()).toHaveText('All fields are required.')
})

test ('Empty user name', async ({page}) =>{
    await loginPage.passwordField ({password: 'Qual1ty!!!'})
    await loginPage.confirmPasswordField ({confirmedPassword: 'Qual1ty!!!'})
    await button.registerBtn()

    await expect(page).toHaveURL('https://practice.expandtesting.com/register')
    await expect(alerts.RegistrationAlert()).toHaveText('All fields are required.')
})

test ('Empty password', async ({page}) => {
    await loginPage.userNameField ({userName:generateUniqueUsername()})
    await button.registerBtn()

    await expect(page).toHaveURL('https://practice.expandtesting.com/register')
    await expect(alerts.RegistrationAlert()).toHaveText('All fields are required.')
})

test ('Use short username', async ({page}) => {
    await loginPage.userNameField ({userName: 'Aa'})
    await loginPage.passwordField ({password: 'Qual1ty!!!'})
    await loginPage.confirmPasswordField ({confirmedPassword: 'Qual1ty!!!'})
    await button.registerBtn()

    await expect(page).toHaveURL('https://practice.expandtesting.com/register')
    await expect(alerts.RegistrationAlert()).toHaveText('Username must be at least 3 characters long.')
})

test ('Use too long username', async ({page}) => {
    await loginPage.userNameField ({userName: '0123456789012345678901234567890123456789'})
    await loginPage.passwordField ({password: 'Qual1ty!!!'})
    await loginPage.confirmPasswordField ({confirmedPassword: 'Qual1ty!!!'})
    await button.registerBtn()

    await expect(page).toHaveURL('https://practice.expandtesting.com/register')
    await expect(alerts.RegistrationAlert()).toHaveText('Invalid username. Usernames can only contain lowercase letters, numbers, and single hyphens, must be between 3 and 39 characters, and cannot start or end with a hyphen.')
})

test ('Use short password', async ({page}) =>{
    await loginPage.userNameField ({userName:generateUniqueUsername()})
    await loginPage.passwordField ({password: '12'})
    await loginPage.confirmPasswordField ({confirmedPassword: '12'})
    await button.registerBtn()

    await expect(page).toHaveURL('https://practice.expandtesting.com/register')
    await expect(alerts.RegistrationAlert()).toHaveText('Password must be at least 4 characters long.')
})

test ('Invalid username', async ({page}) =>{
    await loginPage.userNameField ({userName: "Aaaa__@!#$"})
    await loginPage.passwordField ({password: 'Qual1ty!!!'})
    await loginPage.confirmPasswordField ({confirmedPassword: 'Qual1ty!!!'})
    await button.registerBtn()

    await expect(page).toHaveURL('https://practice.expandtesting.com/register')
    await expect(alerts.RegistrationAlert()).toHaveText('Invalid username. Usernames can only contain lowercase letters, numbers, and single hyphens, must be between 3 and 39 characters, and cannot start or end with a hyphen.')
})

test ('Password missmatch', async ({page}) => {
    await loginPage.userNameField ({userName:generateUniqueUsername()})
    await loginPage.passwordField ({password: 'Qual1ty!!!'})
    await loginPage.confirmPasswordField ({confirmedPassword: 'Qual1ty!!!wrong'})
    await button.registerBtn()

    await expect(page).toHaveURL('https://practice.expandtesting.com/register')
    await expect(alerts.RegistrationAlert()).toHaveText('Passwords do not match.')
})