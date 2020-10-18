import puppeteer from "puppeteer";

export const getAttributeFromElement = async (
  element: puppeteer.ElementHandle,
  selector: string,
  property: string
): Promise<string> => {
  const elementHandle = await element.$(selector);
  const propertyHandle = await elementHandle!.getProperty(property);

  return propertyHandle!.jsonValue() as Promise<string>;
};
