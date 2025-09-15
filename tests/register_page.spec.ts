import{test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto ('https://practice.expandtesting.com/register')
})

test ('valid registration', async ({page}) => {
    
})