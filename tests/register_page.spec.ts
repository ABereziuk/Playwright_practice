import { test, expect } from '@playwright/test'
import { LoginPage, Buttons, Alerts, Errors } from './page_objects/objects.js'
import { testUser } from './test_data.js'
let loginPage: LoginPage
let button: Buttons
let alerts: Alerts
let errors: Errors
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
    await loginPage.passwordField ({password: testUser.password})
    await loginPage.confirmPasswordField ({confirmedPassword: testUser.password})
    await button.registerBtn()

    await expect(page).toHaveURL('https://practice.expandtesting.com/login')
    await expect(alerts.registrationAlert()).toHaveText('Successfully registered, you can log in now.')

})

test ('Empty required fields', async({page}) => {
    await button.registerBtn()

    await expect(page).toHaveURL('https://practice.expandtesting.com/register')
    await expect(alerts.registrationAlert()).toHaveText('All fields are required.')
})

test ('Empty user name', async ({page}) =>{
    await loginPage.passwordField ({password: testUser.password})
    await loginPage.confirmPasswordField ({confirmedPassword: testUser.password})
    await button.registerBtn()

    await expect(page).toHaveURL('https://practice.expandtesting.com/register')
    await expect(alerts.registrationAlert()).toHaveText('All fields are required.')
})

test ('Empty password', async ({page}) => {
    await loginPage.userNameField ({userName:generateUniqueUsername()})
    await button.registerBtn()

    await expect(page).toHaveURL('https://practice.expandtesting.com/register')
    await expect(alerts.registrationAlert()).toHaveText('All fields are required.')
})

test ('Use short username', async ({page}) => {
    await loginPage.userNameField ({userName: testUser.shortName})
    await loginPage.passwordField ({password: testUser.password})
    await loginPage.confirmPasswordField ({confirmedPassword: testUser.password})
    await button.registerBtn()

    await expect(page).toHaveURL('https://practice.expandtesting.com/register')
    await expect(alerts.registrationAlert()).toHaveText('Username must be at least 3 characters long.')
})

test ('Use too long username', async ({page}) => {
    await loginPage.userNameField ({userName: testUser.longName})
    await loginPage.passwordField ({password: testUser.password})
    await loginPage.confirmPasswordField ({confirmedPassword: testUser.password})
    await button.registerBtn()

    await expect(page).toHaveURL('https://practice.expandtesting.com/register')
    await expect(alerts.registrationAlert()).toHaveText('Invalid username. Usernames can only contain lowercase letters, numbers, and single hyphens, must be between 3 and 39 characters, and cannot start or end with a hyphen.')
})

test ('Use short password', async ({page}) =>{
    await loginPage.userNameField ({userName:generateUniqueUsername()})
    await loginPage.passwordField ({password: testUser.shortPassword})
    await loginPage.confirmPasswordField ({confirmedPassword: testUser.shortPassword})
    await button.registerBtn()

    await expect(page).toHaveURL('https://practice.expandtesting.com/register')
    await expect(alerts.registrationAlert()).toHaveText('Password must be at least 4 characters long.')
})

test ('Invalid username', async ({page}) =>{
    await loginPage.userNameField ({userName: testUser.invalidName})
    await loginPage.passwordField ({password: testUser.password})
    await loginPage.confirmPasswordField ({confirmedPassword: testUser.password})
    await button.registerBtn()

    await expect(page).toHaveURL('https://practice.expandtesting.com/register')
    await expect(alerts.registrationAlert()).toHaveText('Invalid username. Usernames can only contain lowercase letters, numbers, and single hyphens, must be between 3 and 39 characters, and cannot start or end with a hyphen.')
})

test ('Password missmatch', async ({page}) => {
    await loginPage.userNameField ({userName:generateUniqueUsername()})
    await loginPage.passwordField ({password: testUser.password})
    await loginPage.confirmPasswordField ({confirmedPassword: testUser.missmatchedPassword})
    await button.registerBtn()

    await expect(page).toHaveURL('https://practice.expandtesting.com/register')
    await expect(alerts.registrationAlert()).toHaveText('Passwords do not match.')
})