import puppeteer from "puppeteer";

import selector from "../../selector";

export const preparePageForCrawling = async (page: puppeteer.Page) => {
  await page.click(selector.SCHEDULE_PAGE);
  await page.waitForSelector("#id_form");

  return page;
};
