#!/usr/bin/env node

import program from "commander";
import puppeteer from "puppeteer";

import connectDatabase from "./connect";

import config from "./config";
import { getRegularClassesCrawler } from "./crawler";

const startAndPrepareBrowser = async () => {
  console.log(`Browser is starting..`);
  const newBrowser = await puppeteer.launch({
    headless: false,
    executablePath: "/usr/bin/chromium",
  });

  return newBrowser;
};

const createAndSetupPage = async (browser: puppeteer.Browser) => {
  const page = await browser.newPage();

  await page.goto(config.url);

  return page;
};

const run = async () => {
  try {
    const browser = await startAndPrepareBrowser();

    const sourcePage = await createAndSetupPage(browser);

    const crawlRegularClasses = await getRegularClassesCrawler(sourcePage);
    const data = await crawlRegularClasses();
    console.table(data);
    await browser.close();
  } catch (err) {
    console.log(err);
  }
};

program.command("run").description("Run the crawler").action(run);

program
  .command("connect")
  .description("Connect mongodb datasource")
  .action(connectDatabase);

program.parse(process.argv);
