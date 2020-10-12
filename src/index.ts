import puppeteer from "puppeteer";
// import { RegularClass } from "./models";

import connectDB from "./db";

import config from "./config";
import crawl from "./crawler";
import selector from "./selector";

(async () => {
  await connectDB();

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate to main page
  await page.goto(config.url);
  await page.click(selector.TKB_PAGE);
  await page.waitFor("#ctl00_ContentPlaceHolder1_ctl00_btnOK");
  await page.click("#ctl00_ContentPlaceHolder1_ctl00_btnOK");

  await crawl(page, browser);

  await browser.close();
})();
