import puppeteer from "puppeteer";

import { getContentFromElement } from "../utils";
import selector from "../selector";

export const getStudentListCrawler = async (page: puppeteer.Page) => {
  return async function (pageUrl: string) {
    await page.goto(pageUrl);
    await page.waitForSelector(selector.STUDENT_LIST);

    const studentsHTMLElements = await page.$$(selector.STUDENT_INFO);
    return crawlStudentListFromHTMLElements(studentsHTMLElements);
  };

  async function crawlStudentListFromHTMLElements(
    elements: puppeteer.ElementHandle[]
  ) {
    elements.shift();
    return Promise.all(
      elements.map((ele) => crawlSingleStudentFromHTMLElement(ele))
    );
  }

  async function crawlSingleStudentFromHTMLElement(
    element: puppeteer.ElementHandle
  ) {
    const studentData = {
      studentID: await getContentFromElement(selector.STUDENT_ID, element),
      firstName: await getContentFromElement(
        selector.STUDENT_FIRST_NAME,
        element
      ),
      lastName: await getContentFromElement(
        selector.STUDENT_LAST_NAME,
        element
      ),
      classID: await getContentFromElement(selector.STUDENT_CLASS_ID, element),
    };

    return studentData;
  }
};
