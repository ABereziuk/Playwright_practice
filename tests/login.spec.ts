import{test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto ('https://practice.expandtesting.com/login')
})

test ('successful login', async ({page}) => {
    const username = await page.locator('#username')
    const password = await page.locator('#password')
    await username.fill('practice')
    await password.fill('SuperSecretPassword!')
    await page.getByRole('button', {name:"Login"}).click()

    await expect(page).toHaveURL('https://practice.expandtesting.com/secure')
    await expect(page.locator('#flash')).toHaveText('You logged into a secure area!')
    await expect(page.getByRole('link', {name:"Logout"})).toBeVisible    
})

test ('empty credentials', async ({page}) => {
    await page.getByRole('button', {name:"Login"}).click()

    await expect (page.getByRole('alert')).toHaveText('Your username is invalid!')
    await expect(page).toHaveURL('https://practice.expandtesting.com/login')
})

test ('empty username', async ({page}) => {
    const password = await page.locator('#password')
    await password.fill('SuperSecretPassword!')
    await page.getByRole('button', {name:"Login"}).click()

    await expect (page.getByRole('alert')).toHaveText('Your username is invalid!')
    await expect(page).toHaveURL('https://practice.expandtesting.com/login')
})

test ('empty password', async ({page}) => {
    const username = await page.locator('#username')
    await username.fill('practice')
    await page.getByRole('button', {name:"Login"}).click()

    await expect(page.getByRole('alert')).toHaveText('Your password is invalid!')
    await expect(page).toHaveURL('https://practice.expandtesting.com/login')
})

test ('invalid username', async ({page}) => {
    const username = await page.locator('#username')
    const password = await page.locator('#password')
    await username.fill('wrong-user-name')
    await password.fill('SuperSecretPassword!')
    await page.getByRole('button', {name:"Login"}).click()

    await expect (page.getByRole('alert')).toHaveText('Your username is invalid!')
    await expect(page).toHaveURL('https://practice.expandtesting.com/login')
})

test ('invalid password', async ({page}) => {
    const username = await page.locator('#username')
    const password = await page.locator('#password')
    await username.fill('practice')
    await password.fill('Wrongpassword!')
    await page.getByRole('button', {name:"Login"}).click()

    await expect (page.getByRole('alert')).toHaveText('Your password is invalid!')
    await expect(page).toHaveURL('https://practice.expandtesting.com/login')
})