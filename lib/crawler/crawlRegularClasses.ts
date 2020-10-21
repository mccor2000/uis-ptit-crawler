import puppeteer from "puppeteer";

import selector from "../selector";
import { getContentFromElements } from "../utils";
import { preparePageForCrawling } from "./shared";

export const getRegularClassesCrawler = async (page: puppeteer.Page) => {
  const preparedPage = await preparePageForCrawling(page);

  return async function () {
    await preparedPage.waitForSelector(selector.SCHEDULE_PAGE_SUBMIT_BUTTON);
    await preparedPage.click(selector.SCHEDULE_PAGE_SUBMIT_BUTTON);
    await preparedPage.waitForSelector(selector.FILTER_FORM_TYPE);
    await preparedPage.select(selector.FILTER_FORM_TYPE, "l");
    await preparedPage.waitForSelector(selector.FILTER_FORM_CLASS);

    return getContentFromElements(
      `${selector.FILTER_FORM_CLASS} > option`,
      page
    );
  };
};
