const pup = require('puppeteer')

const url = 'https://tipmanager.net/en'

const main = async () => {
    try {
      
      const browser = await pup.launch();
      const page = await browser.newPage()
      console.log('  iniciei')
  
      await page.setDefaultNavigationTimeout(0);
      
      await page.goto(url)
      console.log('  fui p url')
  
      await page.waitForSelector('div.css-1yep5kg')
  
      await page.click('div.css-1yep5kg')
      await page.click('ul.css-r8u8y9 :nth-child(7)')
  
      await page.waitForSelector('.css-181wc2h > .css-dvxtzn > div > h6')
      
      while (true) {
         setTimeout(async() => {
            const values = [await page.$eval('.css-181wc2h > .css-dvxtzn > div > h6', el => el.innerText), await page.$eval('.css-181wc2h :nth-child(2) > div > h6', el => el.innerText)]
  
            console.log(values)
         }, 1000 * 20)
      }
  
      await browser.close()
    } catch (error) {
      console.error(error)
    }
}

main()

