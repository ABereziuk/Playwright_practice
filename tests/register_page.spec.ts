import{test, expect} from '@playwright/test'
//function to generate unique user name
function generateUniqueUsername(base: string = 'user') {
    const timestamp = Date.now();
    return `${base}${timestamp}`
}
const uniqueUser = generateUniqueUsername()


test.beforeEach(async({page}) => {
    await page.goto ('https://practice.expandtesting.com/register')
    await page.locator('#username').scrollIntoViewIfNeeded
    
})

test ('valid registration', async ({page}) => {
    await page.locator('#username').fill(uniqueUser)
    await page.locator('#password').fill('Qual1ty!!!')
    await page.locator('#confirmPassword').fill('Qual1ty!!!')
    await page.getByRole('button', {name:"Register"}).scrollIntoViewIfNeeded
    await page.getByRole('button', {name:"Register"}).click()

    await expect(page).toHaveURL('https://practice.expandtesting.com/login')
    await expect(page.getByRole('alert')).toHaveText('Successfully registered, you can log in now.')

})

test ('empty required fields', async({page}) => {
    await page.getByRole('button', {name:"Register"}).scrollIntoViewIfNeeded
    await page.getByRole('button', {name:"Register"}).click()

    await expect(page).toHaveURL('https://practice.expandtesting.com/register')
    await expect(page.getByRole('alert')).toHaveText('All fields are required.')
})

test ('emty user name', async ({page}) =>{
    await page.locator('#password').fill('Qual1ty!!!')
    await page.locator('#confirmPassword').fill('Qual1ty!!!')
    await page.getByRole('button', {name:"Register"}).scrollIntoViewIfNeeded
    await page.getByRole('button', {name:"Register"}).click()

    await expect(page).toHaveURL('https://practice.expandtesting.com/register')
    await expect(page.getByRole('alert')).toHaveText('All fields are required.')
})

test ('empty password', async ({page}) => {
    await page.locator('#username').fill(uniqueUser)
    await page.getByRole('button', {name:"Register"}).scrollIntoViewIfNeeded
    await page.getByRole('button', {name:"Register"}).click()

    await expect(page).toHaveURL('https://practice.expandtesting.com/register')
    await expect(page.getByRole('alert')).toHaveText('All fields are required.')
})

test ('use short username', async ({page}) => {
    await page.locator('#username').fill('Aa')
    await page.locator('#password').fill('Qual1ty!!!')
    await page.locator('#confirmPassword').fill('Qual1ty!!!')
    await page.getByRole('button', {name:"Register"}).scrollIntoViewIfNeeded
    await page.getByRole('button', {name:"Register"}).click()

    await expect(page).toHaveURL('https://practice.expandtesting.com/register')
    await expect(page.getByRole('alert')).toHaveText('Username must be at least 3 characters long.')
})

test ('use too long username', async ({page}) => {
    await page.locator('#username').fill('0123456789012345678901234567890123456789')
    await page.locator('#password').fill('Qual1ty!!!')
    await page.locator('#confirmPassword').fill('Qual1ty!!!')
    await page.getByRole('button', {name:"Register"}).scrollIntoViewIfNeeded
    await page.getByRole('button', {name:"Register"}).click()

    await expect(page).toHaveURL('https://practice.expandtesting.com/register')
    await expect(page.getByRole('alert')).toHaveText('Invalid username. Usernames can only contain lowercase letters, numbers, and single hyphens, must be between 3 and 39 characters, and cannot start or end with a hyphen.')
})

test ('use short password', async ({page}) =>{
    await page.locator('#username').fill(uniqueUser)
    await page.locator('#password').fill('12')
    await page.locator('#confirmPassword').fill('12')
    await page.getByRole('button', {name:"Register"}).scrollIntoViewIfNeeded
    await page.getByRole('button', {name:"Register"}).click()

    await expect(page).toHaveURL('https://practice.expandtesting.com/register')
    await expect(page.getByRole('alert')).toHaveText('Password must be at least 4 characters long.')
})

test ('invalid username', async ({page}) =>{
    await page.locator('#username').fill('Aaaa__@!#$')
    await page.locator('#password').fill('Qual1ty!!!')
    await page.locator('#confirmPassword').fill('Qual1ty!!!')
    await page.getByRole('button', {name:"Register"}).scrollIntoViewIfNeeded
    await page.getByRole('button', {name:"Register"}).click()

    await expect(page).toHaveURL('https://practice.expandtesting.com/register')
    await expect(page.getByRole('alert')).toHaveText('Invalid username. Usernames can only contain lowercase letters, numbers, and single hyphens, must be between 3 and 39 characters, and cannot start or end with a hyphen.')
})

test ('password missmatch', async ({page}) => {
    await page.locator('#username').fill(uniqueUser)
    await page.locator('#password').fill('Qual1ty!!!')
    await page.locator('#confirmPassword').fill('Qual1ty!!!wrong')
    await page.getByRole('button', {name:"Register"}).scrollIntoViewIfNeeded
    await page.getByRole('button', {name:"Register"}).click()

    await expect(page).toHaveURL('https://practice.expandtesting.com/register')
    await expect(page.getByRole('alert')).toHaveText('Passwords do not match.')
})