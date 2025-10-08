import{test, expect} from '@playwright/test'

const clickLogin = async (page) =>{
    await page.getByRole('button', {name:"Login"}).scrollIntoViewIfNeeded()
    await page.getByRole('button', {name:"Login"}).click()
}

test.beforeEach(async({page}) => {
    await page.goto ('https://practice.expandtesting.com/login')
    await page.waitForTimeout(1000)
})

const userNameInput = async ({page, userNameTxt}) => {
    await page.locator('#username').fill(userNameTxt)
}

const passwordInput = async ({page, passwordTxt}) => {
    await page.locator ('#password').fill(passwordTxt)

}

test ('successful login', async ({page}) => {
    await userNameInput ({page:page, userNameTxt: "practice"})
    await passwordInput ({page:page, passwordTxt: "SuperSecretPassword!"})
    await clickLogin(page)

    await expect(page).toHaveURL('https://practice.expandtesting.com/secure')
    await expect(page.locator('#flash')).toHaveText('You logged into a secure area!')
    await expect(page.getByRole('link', {name:"Logout"})).toBeVisible    
})

test ('empty credentials', async ({page}) => {
    await clickLogin(page)
    await expect (page.getByRole('alert')).toHaveText('Your username is invalid!')
    await expect(page).toHaveURL('https://practice.expandtesting.com/login')
})

test ('empty username', async ({page}) => {
    await passwordInput ({page:page, passwordTxt: "SuperSecretPassword!"})
    await clickLogin(page)

    await expect (page.getByRole('alert')).toHaveText('Your username is invalid!')
    await expect(page).toHaveURL('https://practice.expandtesting.com/login')
})

test ('empty password', async ({page}) => {
    await userNameInput ({page:page, userNameTxt: "practice"})
    await clickLogin(page)

    await expect(page.getByRole('alert')).toHaveText('Your password is invalid!')
    await expect(page).toHaveURL('https://practice.expandtesting.com/login')
})

test ('invalid username', async ({page}) => {
    await userNameInput ({page:page, userNameTxt: "ivalidusername"})
    await passwordInput ({page:page, passwordTxt: "SuperSecretPassword!"})
    await clickLogin(page)

    await expect (page.getByRole('alert')).toHaveText('Your username is invalid!')
    await expect(page).toHaveURL('https://practice.expandtesting.com/login')
})

test ('invalid password', async ({page}) => {
    await userNameInput ({page:page, userNameTxt: "practice"})
    await passwordInput ({page:page, passwordTxt: "invalidpassword"})
    await clickLogin(page)

    await expect (page.getByRole('alert')).toHaveText('Your password is invalid!')
    await expect(page).toHaveURL('https://practice.expandtesting.com/login')
})

//test branch