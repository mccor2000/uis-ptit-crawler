import puppeteer from "puppeteer";

import { getAllCreditClassesDataFromHTMLElements } from "./getCreditClassesDataFromHTMLElements";
import selector from "../../selector";

export const getCreditClassesData = async (page: puppeteer.Page) => {
  const creditClassHTMLElements = await page.$$(selector.CREDIT_CLASS);

  return getAllCreditClassesDataFromHTMLElements(creditClassHTMLElements);
};
