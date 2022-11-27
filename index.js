/*
const pup = require('puppeteer')

const url = 'https://tipmanager.net/en'

const main = async () => {
  try {
    const browser = await pup.launch()
    const page = await browser.newPage()
    console.log('  iniciei')

    await page.goto(url)
    console.log('  fui p url')

    await page.waitForSelector('div.css-1yep5kg')

    await page.click('div.css-1yep5kg')
    await page.click('ul.css-r8u8y9 :nth-child(7)')

    await page.waitForSelector('.css-181wc2h > .css-dvxtzn > div > h6')

    const values = await page.$$eval('.css-181wc2h > .css-dvxtzn > div > h6',(el) => el.map((values) => values.innerText))


    console.log(values)

    await browser.close()
  } catch (error) {
    console.error(error)
  }
}*/

const pup = require('puppeteer')

const url = 'https://tipmanager.net/en'

const results = []
const timeTaken = []

const main = async () => {
  try {
    console.log(`run #${results.length}:`)

    const then = Date.now()

    const browser = await pup.launch()
    const page = await browser.newPage()
    console.log('  iniciei')

    await page.goto(url)
    console.log('  fui p url')

    await page.waitForSelector('div.css-1yep5kg')

    await page.click('div.css-1yep5kg')
    await page.click('ul.css-r8u8y9 :nth-child(7)')

    await page.waitForSelector('.css-181wc2h > .css-dvxtzn > div > h6')

    const values = await page.$$eval(
      '.css-181wc2h > .css-dvxtzn > div > h6',
      (el) => el.map((values) => values.innerText)
    )

    const now = Date.now()
    const elapsed = now - then

    timeTaken.push(elapsed)

    if (typeof values === 'object') {
      results.push(values)
    }

    const avg = timeTaken.reduce((a, b) => a + b) / timeTaken.length

    console.log(`  == took ${elapsed} ms, avg: ${avg} ms`)
    console.log(values)

    await browser.close()
  } catch (error) {
    console.error(error)
  }
}

main()

setInterval(main, 1000 * 30)