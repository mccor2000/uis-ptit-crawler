import puppeteer from "puppeteer";

import { getContentFromElement, getAttributeFromElement } from "../../utils";
import selector from "../../selector";

export const getAllCreditClassesDataFromHTMLElements = async (
  elements: puppeteer.ElementHandle[]
) => {
  const creditClassesData = elements.map((ele) =>
    getCreditClassDataFromHTMLElement(ele)
  );

  return Promise.all(creditClassesData);
};

export const getCreditClassDataFromHTMLElement = async (
  element: puppeteer.ElementHandle
) => {
  const creditClassID = await getCreditClassID();
  const subjectID = await getSubjectID();
  const subjectTitle = await getSubjectTitle();
  const groupID = await getGroupID();
  const credits = await getCredits();
  const classesBelong = await getClassesBelong();
  const schedule = await getSchedule();
  const studentListUrl = await getStudentListUrl();

  return {
    creditClassID,
    subjectID,
    subjectTitle,
    groupID,
    credits,
    classesBelong,
    schedule,
    studentListUrl,
  };

  async function getCreditClassID() {
    const studentListUrl = await getStudentListUrl();

    const creditClassID = studentListUrl.split("=")[
      studentListUrl.split("=").length - 1
    ];

    return creditClassID;
  }

  async function getSubjectID() {
    return getContentFromElement(selector.CLASS_SUBJECT_CODE, element);
  }

  async function getSubjectTitle() {
    return getContentFromElement(selector.CLASS_SUBJECT_TITLE, element);
  }

  async function getGroupID() {
    return getContentFromElement(selector.CLASS_SUBJECT_GROUP, element);
  }

  async function getCredits() {
    return getContentFromElement(selector.CLASS_SUBJECT_CREDIT, element);
  }

  async function getClassesBelong() {
    return getContentFromElement(selector.CLASS_CLASSES, element);
  }

  async function getSchedule() {
    const firstDay = await getFirstDayInWeek();
    const secondDay = await getSecondDayInWeek();
    const thirdDay = await getThirdDayInWeek();

    return sanitizeAndParseSchedule([firstDay, secondDay, thirdDay]);
  }

  async function getStudentListUrl() {
    return getAttributeFromElement(
      element,
      selector.CLASS_STUDENT_LIST_URL,
      "href"
    );
  }

  async function sanitizeAndParseSchedule(schedule: Array<any>) {
    return schedule.filter(
      (ele) => !Object.values(ele).every((prop) => prop === "")
    );
  }

  async function getFirstDayInWeek() {
    const day = await getContentFromElement(selector.CLASS_DAY, element);

    const startPeriod = await getContentFromElement(
      selector.CLASS_START_TIME,
      element
    );

    const numberOfPeriods = await getContentFromElement(
      selector.CLASS_DURATION,
      element
    );

    const classroom = await getContentFromElement(selector.CLASS_ROOM, element);

    const startEndDate = await getContentFromElement(
      selector.CLASS_START_END_DATE,
      element
    );

    const startDate = startEndDate.split("--")[0];

    const endDate = startEndDate.split("--")[1];

    const learningWeeksRaw = await element.evaluate((el) =>
      el
        .querySelector("tbody > tr > td:nth-child(14) > div")!
        .getAttribute("onmouseover")
    );

    const learningWeeks = await parseLearningWeeks(learningWeeksRaw as string);

    return {
      day,
      startPeriod,
      numberOfPeriods,
      classroom,
      startDate,
      endDate,
      learningWeeks,
    };
  }

  async function getSecondDayInWeek() {
    const day = await getContentFromElement(selector.CLASS_DAY_2, element);

    const startPeriod = await getContentFromElement(
      selector.CLASS_START_TIME_2,
      element
    );

    const numberOfPeriods = await getContentFromElement(
      selector.CLASS_DURATION_2,
      element
    );

    const classroom = await getContentFromElement(
      selector.CLASS_ROOM_2,
      element
    );

    const startEndDate = await getContentFromElement(
      selector.CLASS_START_END_DATE_2,
      element
    );

    const startDate = startEndDate.split("--")[0] || "";

    const endDate = startEndDate.split("--")[1] || "";

    const learningWeeksRaw = await element.evaluate(
      (el) =>
        el.querySelector(
          "tbody > tr > td:nth-child(14) > table:nth-child(1) > tbody > tr > td"
        ) &&
        el
          .querySelector(
            "tbody > tr > td:nth-child(14) > table:nth-child(1) > tbody > tr > td"
          )!
          .getAttribute("onmouseover")
    );

    const learningWeeks = await parseLearningWeeks(learningWeeksRaw as string);

    return {
      day,
      startPeriod,
      numberOfPeriods,
      classroom,
      startDate,
      endDate,
      learningWeeks,
    };
  }

  async function getThirdDayInWeek() {
    const day = await getContentFromElement(selector.CLASS_DAY_3, element);

    const startPeriod = await getContentFromElement(
      selector.CLASS_START_TIME_3,
      element
    );

    const numberOfPeriods = await getContentFromElement(
      selector.CLASS_DURATION_3,
      element
    );

    const classroom = await getContentFromElement(
      selector.CLASS_ROOM_3,
      element
    );

    const startEndDate = await getContentFromElement(
      selector.CLASS_START_END_DATE_3,
      element
    );

    const startDate = startEndDate.split("--")[0] || "";

    const endDate = startEndDate.split("--")[1] || "";

    const learningWeeksRaw = await element.evaluate(
      (el) =>
        el.querySelector(
          "tbody > tr > td:nth-child(14) > table:nth-child(2) > tbody > tr > td"
        ) &&
        el
          .querySelector(
            "tbody > tr > td:nth-child(14) > table:nth-child(2) > tbody > tr > td"
          )!
          .getAttribute("onmouseover")
    );

    const learningWeeks = await parseLearningWeeks(learningWeeksRaw as string);

    return {
      day,
      startPeriod,
      numberOfPeriods,
      classroom,
      startDate,
      endDate,
      learningWeeks,
    };
  }

  async function parseLearningWeeks(rawValue: string) {
    if (!rawValue) return "";

    return rawValue
      .slice(15)
      .split("')'")[0]
      .split("")
      .map((ch, idx) => (ch !== "-" ? idx + 1 : ch))
      .filter((ele) => typeof ele === "number");
  }
};
