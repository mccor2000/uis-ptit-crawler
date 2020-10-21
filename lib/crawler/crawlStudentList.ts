import puppeteer from "puppeteer";

import { getContentFromElement } from "../utils";
import selector from "../selector";

export const getStudentList = async (page: puppeteer.Page) => {
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
