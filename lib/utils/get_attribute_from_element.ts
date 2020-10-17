import puppeteer from "puppeteer";

export const getAttributeFromElement = async (
  page: puppeteer.Page,
  selector: string,
  property: string
): Promise<string> => {
  const elementHandle = await page.$(selector);
  const propertyHandle = await elementHandle!.getProperty(property);

  return propertyHandle!.jsonValue() as Promise<string>;
};
