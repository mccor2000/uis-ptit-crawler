#!/usr/bin/env node

import program from "commander";
import puppeteer from "puppeteer";

import connectDB from "./db";

import config from "./config";
import crawl from "./crawler";
import selector from "./selector";

const run = async () => {
  await connectDB();

  console.log(`Browser is starting..`);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(config.url);
  await page.click(selector.TKB_PAGE);
  await page.waitForSelector(selector.OK_BUTTON);
  await page.click(selector.OK_BUTTON);

  await crawl(page, browser);

  await browser.close();
};

program.command("run").alias("r").description("Run the crawler").action(run);

program.parse(process.argv);
