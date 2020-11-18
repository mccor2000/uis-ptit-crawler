#!/usr/bin/env node

import program from "commander";
import puppeteer from "puppeteer";

import connectDatabase from "./connect";

import config from "./config";
import {
  createStudentListCrawler,
  createStudyScheduleCrawler,
} from "./crawler";

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

    const crawlStudentList = await createStudentListCrawler(sourcePage);
    const studentsList = await crawlStudentList(
      "http://uis.ptithcm.edu.vn/Default.aspx?page=danhsachsvtheonhomhoc&malop=D18CQCN02-N&madk=BAS114604"
    );
    console.table(studentsList);

    const studyScheduleCrawler = await createStudyScheduleCrawler(sourcePage);
    const schedule = await studyScheduleCrawler.crawlScheduleOfRegularClass(
      "D18CQCN02-N"
    );
    console.table(schedule);

    await browser.close();
  } catch (err) {
    console.log(err);
  }
};

program.command("run").description("Run the crawler").action(run);
program.option("-a, --all", "Get all the schedules, students info");

program
  .command("connect")
  .description("Connect mongodb datasource")
  .action(connectDatabase);

program.parse(process.argv);
