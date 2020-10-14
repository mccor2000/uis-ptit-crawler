import puppeteer from "puppeteer";
// import { RegularClass } from "./models";

import connectDB from "./db";

import config from "./config";
import crawl from "./crawler";
import selector from "./selector";

(async () => {
  await connectDB();

  console.log(`Browser is starting..`);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to main page
  await page.goto(config.url);
  await page.click(selector.TKB_PAGE);
  await page.waitForSelector(selector.OK_BUTTON);
  await page.click(selector.OK_BUTTON);

  await crawl(page, browser);

  await browser.close();
})();
