import puppeteer from "puppeteer";

import { getContentFromElement, getAttributeFromElement } from "../utils";
import selector from "../selector";

export const getAllCreditClassesDataFromHTMLElements = async (
  elements: puppeteer.ElementHandle[]
) => {
  const creditClassesData = elements.map((ele, i) =>
    getCreditClassDataFromHTMLElement(ele, i)
  );

  return Promise.all(creditClassesData);
};

export const getCreditClassDataFromHTMLElement = async (
  element: puppeteer.ElementHandle,
  idx: number
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
    return getContentFromElement(selector.CLASS_SUBJECT_CODE(idx), element);
  }

  async function getSubjectTitle() {
    return getContentFromElement(selector.CLASS_SUBJECT_TITLE(idx), element);
  }

  async function getGroupID() {
    return getContentFromElement(selector.CLASS_SUBJECT_GROUP(idx), element);
  }

  async function getCredits() {
    return getContentFromElement(selector.CLASS_SUBJECT_CREDIT(idx), element);
  }

  async function getClassesBelong() {
    return getContentFromElement(selector.CLASS_CLASSES(idx), element);
  }

  async function getSchedule() {
    const firstDay = await getFirstDayInWeek();
    const secondDay = await getSecondDayInWeek();

    return sanitizeAndParseSchedule([firstDay, secondDay]);
  }

  async function getStudentListUrl() {
    return getAttributeFromElement(
      element,
      selector.CLASS_STUDENT_LIST_URL(idx),
      "href"
    );
  }

  async function sanitizeAndParseSchedule(schedule: Array<any>) {
    return schedule
      .filter((ele) => !Object.values(ele).every((prop) => prop === ""))
      .map((ele) => ({
        day: ele.day,
        startTime: ele.startTime,
        duration: ele.duration,
        room: ele.room,
        startDate: ele.startEndDate.split("--")[0],
        endDate: ele.startEndDate.split("--")[1],
      }));
  }

  async function getFirstDayInWeek() {
    const day = await getContentFromElement(selector.CLASS_DAY(idx), element);

    const startTime = await getContentFromElement(
      selector.CLASS_START_TIME(idx),
      element
    );

    const duration = await getContentFromElement(
      selector.CLASS_DURATION(idx),
      element
    );

    const room = await getContentFromElement(selector.CLASS_ROOM(idx), element);

    const startEndDate = await getContentFromElement(
      selector.CLASS_START_END_DATE(idx),
      element
    );
    return { day, startTime, duration, room, startEndDate };
  }

  async function getSecondDayInWeek() {
    const day = await getContentFromElement(selector.CLASS_DAY_2(idx), element);

    const startTime = await getContentFromElement(
      selector.CLASS_START_TIME_2(idx),
      element
    );

    const duration = await getContentFromElement(
      selector.CLASS_DURATION(idx),
      element
    );

    const room = await getContentFromElement(
      selector.CLASS_ROOM_2(idx),
      element
    );

    const startEndDate = await getContentFromElement(
      selector.CLASS_START_END_DATE_2(idx),
      element
    );

    return { day, startTime, duration, room, startEndDate };
  }
};
