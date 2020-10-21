import puppeteer from "puppeteer";

import selector from "../selector";
import { getContentFromElements } from "../utils";

export default async (page: puppeteer.Page) => {
  await page.waitForSelector(selector.FILTER_FORM);
  await page.select(selector.FILTER_FORM_TYPE, "l");
  await page.waitForSelector(selector.FILTER_FORM_CLASS);

  return getContentFromElements(`${selector.FILTER_FORM_CLASS} > option`, page);
};
