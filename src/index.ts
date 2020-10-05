import puppeteer from "puppeteer";
import config from "./config";
// import connectDB from "./db";

(async () => {
  // await connectDB();

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate to main page
  await page.goto(config.url);
  await page.click("#ctl00_menu_lblThoiKhoaBieu");
  await page.waitFor("#ctl00_ContentPlaceHolder1_ctl00_btnOK");
  await page.click("#ctl00_ContentPlaceHolder1_ctl00_btnOK");

  // Select
  await page.waitFor(
    "#aspnetForm > div:nth-child(24) > div > table > tbody > tr:nth-child(2) > td > div.navigate-base > table > tbody > tr:nth-child(3) > td"
  );
  await page.select("#ctl00_ContentPlaceHolder1_ctl00_ddlChon", "l");
  await page.waitFor("#ctl00_ContentPlaceHolder1_ctl00_ddlHienThiKQ");
  const classSelector = await page.$(
    "#ctl00_ContentPlaceHolder1_ctl00_ddlHienThiKQ"
  );
  const classOptions = await classSelector?.$$(
    "#ctl00_ContentPlaceHolder1_ctl00_ddlHienThiKQ > option"
  );

  const classes = classOptions!.map(
    async (opt) => await (await opt.getProperty("value")).jsonValue()
  );

  const classNames = await Promise.all(classes);
  console.log(classNames);
})();
