import puppeteer from "puppeteer";

import crawlAllRegularClasses from "./crawlRegularClasses";
import { getCreditClassesData, preparePageForCrawling } from "./shared";

import selector from "../selector";

export const getStudentScheduleCrawler = async (page: puppeteer.Page) => {
  const preparedPage = await preparePageForCrawling(page);

  return {
    crawlScheduleOfSchool,
    crawlScheduleOfRegularClass,
    crawlScheduleOfStudent,
  };

  async function crawlScheduleOfSchool() {
    const allRegularClasses = await crawlAllRegularClasses(page);
    let masterSchedule = [];

    for (const cl of allRegularClasses!) {
      const creditClassesData = await crawlScheduleOfRegularClass(cl);
      masterSchedule.push(creditClassesData);
    }

    return masterSchedule;
  }

  async function crawlScheduleOfRegularClass(regularClassID: string) {
    await preparedPage.waitForSelector(selector.SCHEDULE_PAGE_SUBMIT_BUTTON);
    await preparedPage.click(selector.SCHEDULE_PAGE_SUBMIT_BUTTON);
    await preparedPage.waitForSelector(selector.FILTER_FORM_TYPE);
    await preparedPage.select(selector.FILTER_FORM_TYPE, "l");
    await preparedPage.waitForSelector(selector.FILTER_FORM_CLASS);
    await preparedPage.select(selector.FILTER_FORM_CLASS, regularClassID);
    await preparedPage.click(selector.FILTER_FORM_SUBMIT);
    await preparedPage.waitForSelector(selector.CREDIT_CLASS);

    return getCreditClassesData(preparedPage);
  }

  async function crawlScheduleOfStudent(studentID: string) {
    await preparedPage.waitForSelector(selector.PERSONAL_SCHEDULE);
    await preparedPage.click(selector.PERSONAL_SCHEDULE);
    await preparedPage.waitForSelector(selector.PERSONAL_SCHEDULE_OPTION_INPUT);
    await preparedPage.type(selector.PERSONAL_SCHEDULE_OPTION_INPUT, studentID);
    await preparedPage.waitForSelector(selector.SCHEDULE_PAGE_SUBMIT_BUTTON);
    await preparedPage.click(selector.SCHEDULE_PAGE_SUBMIT_BUTTON);
    await preparedPage.waitForSelector(selector.SCHEDULE_TYPE);
    await preparedPage.select(selector.SCHEDULE_TYPE, "1");
    await preparedPage.waitForSelector(selector.CREDIT_CLASS);

    return getCreditClassesData(preparedPage);
  }
};
