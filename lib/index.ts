#!/usr/bin/env node

import program from "commander";
import puppeteer from "puppeteer";

import connectDatabase from "./db";

import config from "./config";
import crawlStudySchedule from "./crawlStudySchedule";

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
  const browser = await startAndPrepareBrowser();

  const sourcePage = await createAndSetupPage(browser);

  await crawlStudySchedule(sourcePage, browser);

  await browser.close();
};

program.command("run").description("Run the crawler").action(run);

program
  .command("connect")
  .description("Connect mongodb datasource")
  .action(connectDatabase);

program.parse(process.argv);
