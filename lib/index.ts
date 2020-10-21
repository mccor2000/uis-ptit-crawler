#!/usr/bin/env node

import program from "commander";
import puppeteer from "puppeteer";

import connectDatabase from "./connect";

import config from "./config";
import { getStudentListCrawler } from "./crawler";

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

    const crawlStudentList = await getStudentListCrawler(sourcePage);
    const data = await crawlStudentList(
      "http://uis.ptithcm.edu.vn/Default.aspx?page=danhsachsvtheonhomhoc&malop=D18CQCN02-N&madk=BAS114604"
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
