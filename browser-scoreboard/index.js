require('dotenv').config({ path: 'config.txt' })
const puppeteer = require('puppeteer');

(async () => {
  const boardId = process.env.BOARD_ID
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args:[
      '--start-fullscreen',
      '--no-default-browser-check',
      '--disable-infobars',
      '--test-type=webdriver'
   ],
   ignoreDefaultArgs: ['--enable-automation']
  });
  const pages = await browser.pages();
  const page = pages[0];
  // const page = await browser.newPage();
  await page.goto(`https://client.jawad.club/?id=${boardId}`);
})();