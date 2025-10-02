import{test, expect} from '@playwright/test'

test.beforeEach(async ({page}) => {
    page.goto('https://practice.expandtesting.com/forgot-password')
})

test ('forgot password successful', async ({page}) =>{
    await page.locator('#email').fill('test@test.com')
    await page.getByRole('button', {name:"Retrieve password"}).click()

    await expect(page.locator('#confirmation-alert')).toHaveText('An e-mail has been sent to you which explains how to reset your password.')
})

test ('empty email', async ({page}) => {
    await page.getByRole('button', {name:"Retrieve password"}).click()

    await expect(page.locator('.ms-1 invalid-feedback')).toHaveText('Please enter a valid email address.')
})