#!/usr/bin/env node

import program from "commander";
import puppeteer from "puppeteer";

import connectDatabase from "./connect";

import config from "./config";
import getScheduleCrawler from "./crawlStudySchedule";

const startAndPrepareBrowser = async () => {
  console.log(`Browser is starting..`);
  const newBrowser = await puppeteer.launch();

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

    const scheduleCrawler = await getScheduleCrawler(sourcePage);
    const data = await scheduleCrawler.crawlScheduleOfSingleRegularClass(
      "D18CQCN02-N"
    );
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
