const pup = require('puppeteer')

const url = 'https://tipmanager.net/en'

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

const main = async () => {
  while(true) {
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
  
      //const values = [await page.$eval('.css-181wc2h > .css-dvxtzn > div > h6', el => el.innerText), await page.$eval('.css-181wc2h :nth-child(2) > div > h6', el => el.innerText)]
      
      
      const values = await page.$$eval('.css-181wc2h > .css-dvxtzn > div > h6', (el) => el.map(values => values.innerText))
      console.log(values)
      sleep(15 * 1000)
      

      
      
  
      await browser.close()
      sleep(15 * 1000)
    } catch (error) {
      console.error(error)
    }
  }
}



main();

