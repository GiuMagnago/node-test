const pup = require("puppeteer");
const express = require('express')
const app = express()

const url = "https://tipmanager.net/en";
var result = [];

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')

  next()
})

app.get('/algo', (req, res) => {
  res.send(result)
})

app.listen(process.env.PORT, () => {
    console.log("app online")
})


const main = async () => {
  while(true) {
  try {
    const browser = await pup.launch();
    const page = await browser.newPage();
    console.log("  iniciei");

    await page.setDefaultNavigationTimeout(0);

    await page.goto(url);
    console.log("  fui p url");

    await page.waitForSelector("div.css-1yep5kg");

    await page.click("div.css-1yep5kg");
    await page.click("ul.css-r8u8y9 :nth-child(7)");

    await page.waitForSelector(".css-181wc2h > .css-dvxtzn > div > h6");

    const values = await page.$$eval(
      ".css-181wc2h > .css-dvxtzn > div > h6",
      (el) => el.map((values) => values.innerText)
    );
    result = values;
    console.log(values);
  } catch (error) {
    console.error(error);
  }
 }
};

setInterval(main, 500)
