import puppeteer from "puppeteer";

import selector from "./selector";
import {
  getContentFromElement,
  getContentFromElements,
  getAttributeFromElement,
} from "./utils";

import { CreditClassModel, StudentModel } from "./models";

const getStudentList = async (page: puppeteer.Page) => {
  const studentElements = await page.$$(selector.STUDENT_INFO);

  let students = [];
  for (let i = 1; i < studentElements.length; i++) {
    const student = {
      studentId: await getContentFromElement(
        selector.STUDENT_ID(i),
        studentElements[i]
      ),
      firstName: await getContentFromElement(
        selector.STUDENT_FIRST_NAME(i),
        studentElements[i]
      ),
      lastName: await getContentFromElement(
        selector.STUDENT_LAST_NAME(i),
        studentElements[i]
      ),
      classId: await getContentFromElement(
        selector.STUDENT_CLASS_ID(i),
        studentElements[i]
      ),
    };
    students.push(student);
  }

  return Promise.all(students);
};

const getRegularClasses = async (page: puppeteer.Page) => {
  await page.waitForSelector(selector.FILTER_FORM);

  await page.select(selector.FILTER_FORM_TYPE, "l");

  await page.waitForSelector(selector.FILTER_FORM_CLASS);

  return getContentFromElements(`${selector.FILTER_FORM_CLASS} > option`, page);
};

const getCreditClasses = async (page: puppeteer.Page) => {
  const classElements = await page.$$(selector.CREDIT_CLASS);

  const classesData = classElements.map(async (elementHandle, i) => {
    const subjectId = await getContentFromElement(
      selector.CLASS_SUBJECT_CODE(i),
      elementHandle
    );

    const subjectTitle = await getContentFromElement(
      selector.CLASS_SUBJECT_TITLE(i),
      elementHandle
    );

    const group = await getContentFromElement(
      selector.CLASS_SUBJECT_GROUP(i),
      elementHandle
    );

    const credits = await getContentFromElement(
      selector.CLASS_SUBJECT_CREDIT(i),
      elementHandle
    );

    const classes = await getContentFromElement(
      selector.CLASS_CLASSES(i),
      elementHandle
    );

    const day = await getContentFromElement(
      selector.CLASS_DAY(i),
      elementHandle
    );

    const day2 = await getContentFromElement(
      selector.CLASS_DAY_2(i),
      elementHandle
    );

    const startTime = await getContentFromElement(
      selector.CLASS_START_TIME(i),
      elementHandle
    );

    const startTime2 = await getContentFromElement(
      selector.CLASS_START_TIME_2(i),
      elementHandle
    );

    const duration = await getContentFromElement(
      selector.CLASS_DURATION(i),
      elementHandle
    );

    const duration2 = await getContentFromElement(
      selector.CLASS_DURATION(i),
      elementHandle
    );

    const room = await getContentFromElement(
      selector.CLASS_ROOM(i),
      elementHandle
    );

    const room2 = await getContentFromElement(
      selector.CLASS_ROOM_2(i),
      elementHandle
    );

    const startEndDate = await getContentFromElement(
      selector.CLASS_START_END_DATE(i),
      elementHandle
    );

    const startEndDate2 = await getContentFromElement(
      selector.CLASS_START_END_DATE_2(i),
      elementHandle
    );

    await page.waitForSelector(selector.CLASS_STUDENT_LIST_URL(i));
    const studentListUrl = await getAttributeFromElement(
      page,
      selector.CLASS_STUDENT_LIST_URL(i),
      "href"
    );

    const schedule = [
      { day, startTime, duration, room, startEndDate },
      {
        day: day2,
        startTime: startTime2,
        duration: duration2,
        room: room2,
        startEndDate: startEndDate2,
      },
    ];

    return {
      classId: studentListUrl.split("=")[studentListUrl.split("=").length - 1],
      subjectId,
      subjectTitle,
      group,
      credits,
      classes,
      schedule: schedule
        .filter((ele) => !Object.values(ele).every((prop) => prop === ""))
        .map((ele) => ({
          day: ele.day,
          startTime: ele.startTime,
          duration: ele.duration,
          room: ele.room,
          startDate: ele.startEndDate.split("--")[0],
          endDate: ele.startEndDate.split("--")[1],
        })),
      studentListUrl,
    };
  });
  console.log(`done`);

  return Promise.all(classesData);
};

export default async (page: puppeteer.Page, browser: puppeteer.Browser) => {
  await page.click(selector.TKB_PAGE);

  await page.waitForSelector(selector.OK_BUTTON);

  await page.click(selector.OK_BUTTON);

  const classes = await getRegularClasses(page);

  for (const cl of classes!) {
    console.log(`Crawl credit classes from class ${cl}..`);

    await page.select(selector.FILTER_FORM_CLASS, cl);

    await page.click(selector.FILTER_FORM_SUBMIT);

    await page.waitForSelector(selector.CREDIT_CLASS);

    const creditClasses = await getCreditClasses(page);

    await Promise.all(
      creditClasses.map(async (crCl) => {
        const newPage = await browser.newPage();

        await newPage.goto(crCl.studentListUrl);

        await newPage.waitForSelector(selector.STUDENT_LIST);

        const students = await getStudentList(newPage);

        await Promise.all(
          students.map((student) =>
            StudentModel.findOneAndUpdate(
              { studentId: student.studentId },
              {
                $set: {
                  studentId: student.studentId,
                  firstName: student.firstName,
                  lastName: student.lastName,
                  classId: student.classId,
                },
                $push: {
                  joinedClasses: crCl.classId,
                },
              },
              {
                upsert: true,
                setDefaultsOnInsert: true,
              }
            )
          )
        );

        await newPage.close();

        return CreditClassModel.findOneAndUpdate(
          { classId: crCl.classId },
          {
            classId: crCl.classId,
            subjectId: crCl.subjectId,
            subjectTitle: crCl.subjectTitle,
            group: crCl.group,
            credits: crCl.credits,
            classes: crCl.classes,
            schedule: crCl.schedule,
            students,
          },
          { upsert: true, setDefaultsOnInsert: true }
        );
      })
    );
  }
};
