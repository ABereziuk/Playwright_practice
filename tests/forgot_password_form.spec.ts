import { test, expect } from '@playwright/test'
import { LoginPage, Buttons, Alerts, Errors } from './page_objects/objects.js'
import { testUser } from './test_data.js'
let loginPage: LoginPage
let button: Buttons
let alerts: Alerts
let errors: Errors

test.beforeEach(async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/forgot-password')
    loginPage = new LoginPage(page)
    button = new Buttons(page)
    alerts = new Alerts (page)
    errors = new Errors (page)
});

test ('forgot password successful', async ({page}) =>{
    await loginPage.emailField({email: testUser.email})
    await button.retrievePasswordBtn()

    await expect(alerts.retrieveAlert()).toHaveText('An e-mail has been sent to you which explains how to reset your password.')

})

test ('empty email', async ({page}) => {
    await button.retrievePasswordBtn()

    await expect(errors.inavalidEmailError()).toHaveText('Please enter a valid email address.')
})

test ('invalid email', async ({page}) => {
    await loginPage.emailField({email: testUser.email})
    await button.retrievePasswordBtn()

    await expect(errors.inavalidEmailError()).toHaveText('Please enter a valid email address.')
})
