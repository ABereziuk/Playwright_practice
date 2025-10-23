import { test, expect } from '@playwright/test'
import { LoginPage, Buttons } from './page_objects/objects.js'
import { testUser } from './test_data.js'
let loginPage: LoginPage
let button: Buttons

test.beforeEach(async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login')
    loginPage = new LoginPage(page)
    button = new Buttons(page)
});

test('Successful login', async ({ page }) => {
    await loginPage.userNameField({ userName: testUser.name })
    await loginPage.passwordField({ password: testUser.password })
    await button.loginBtn()
  
    await expect(page).toHaveURL('https://practice.expandtesting.com/secure')
    await expect(page.locator('#flash')).toHaveText('You logged into a secure area!')
    await expect(page.getByRole('link', {name:"Logout"})).toBeVisible()  
})

test ('Empty credentials login', async ({page}) => {
    await button.loginBtn()
    await expect (page.getByRole('alert')).toHaveText('Your username is invalid!')
    await expect(page).toHaveURL('https://practice.expandtesting.com/login')
})

test ('Empty username login', async ({page}) => {
    await loginPage.passwordField({ password: testUser.password})
    await button.loginBtn()

    await expect (page.getByRole('alert')).toHaveText('Your username is invalid!')
    await expect(page).toHaveURL('https://practice.expandtesting.com/login')
})

test ('Empty password login', async ({page}) => {
    await loginPage.userNameField({ userName: testUser.name })
    await button.loginBtn()

    await expect(page.getByRole('alert')).toHaveText('Your password is invalid!')
    await expect(page).toHaveURL('https://practice.expandtesting.com/login')
})

test ('Invalid username login', async ({page}) => {
    await loginPage.userNameField({ userName: testUser.invalidName })
    await loginPage.passwordField({ password: 'SuperSecretPassword!' })
    await button.loginBtn()

    await expect (page.getByRole('alert')).toHaveText('Your username is invalid!')
    await expect(page).toHaveURL('https://practice.expandtesting.com/login')
})

test ('Invalid password', async ({page}) => {
    await loginPage.userNameField({ userName: testUser.name })
    await loginPage.passwordField({ password: testUser.invalidPassword })
    await button.loginBtn()

    await expect (page.getByRole('alert')).toHaveText('Your password is invalid!')
    await expect(page).toHaveURL('https://practice.expandtesting.com/login')
})