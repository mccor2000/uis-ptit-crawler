import puppeteer from "puppeteer";

import crawlAllRegularClasses from "./crawlRegularClasses";
import { getAllCreditClassesDataFromHTMLElements } from "./workers";

import selector from "./selector";

export default async (page: puppeteer.Page) => {
  const preparedPage = await preparePageForCrawling(page);

  return {
    crawlScheduleOfSchool,
    crawlScheduleOfSingleRegularClass,
    crawlScheduleOfStudent,
  };

  async function crawlScheduleOfSchool() {
    const allRegularClasses = await crawlAllRegularClasses(page);
    let masterSchedule = [];

    for (const cl of allRegularClasses!) {
      const creditClassesData = await crawlScheduleOfSingleRegularClass(cl);
      masterSchedule.push(creditClassesData);
    }

    return masterSchedule;
  }

  async function crawlScheduleOfSingleRegularClass(regularClassID: string) {
    await preparedPage.waitForSelector(selector.FILTER_FORM_TYPE);
    await preparedPage.select(selector.FILTER_FORM_TYPE, "l");
    await preparedPage.waitForSelector(selector.FILTER_FORM_CLASS);
    await preparedPage.select(selector.FILTER_FORM_CLASS, regularClassID);
    await preparedPage.click(selector.FILTER_FORM_SUBMIT);
    await preparedPage.waitForSelector(selector.CREDIT_CLASS);

    const creditClassHTMLElements = await preparedPage.$$(
      selector.CREDIT_CLASS
    );

    return getAllCreditClassesDataFromHTMLElements(creditClassHTMLElements);
  }

  async function crawlScheduleOfStudent(_studentID: string) {}
};

const preparePageForCrawling = async (page: puppeteer.Page) => {
  await page.click(selector.TKB_PAGE);
  await page.waitForSelector(selector.OK_BUTTON);
  await page.click(selector.OK_BUTTON);

  return page;
};
