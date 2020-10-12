import puppeteer from "puppeteer";

export const getContentFromElement = async (
  selector: string,
  elementHandle: puppeteer.ElementHandle | puppeteer.Page
): Promise<string> => {
  return (await elementHandle.$(selector))
    ? elementHandle.$eval(selector, (element) => element.innerHTML)
    : "";
};

export const getContentFromElements = async (
  selector: string,
  elementHandle: puppeteer.ElementHandle | puppeteer.Page
): Promise<Array<string> | string> => {
  return (await elementHandle.$(selector))
    ? elementHandle.$$eval(selector, (elements) =>
        elements.map((e) => e.innerHTML)
      )
    : "";
};
