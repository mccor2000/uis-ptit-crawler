export default {
  // TKB page
  TKB_PAGE: "#ctl00_menu_lblThoiKhoaBieu",
  OK_BUTTON: "#ctl00_ContentPlaceHolder1_ctl00_btnOK",

  // Filter form
  FILTER_FORM:
    "#aspnetForm > div:nth-child(24) > div > table > tbody > tr:nth-child(2) > td > div.navigate-base > table > tbody > tr:nth-child(3) > td",
  FILTER_FORM_TYPE: "#ctl00_ContentPlaceHolder1_ctl00_ddlChon",
  FILTER_FORM_CLASS: "#ctl00_ContentPlaceHolder1_ctl00_ddlHienThiKQ",
  FILTER_FORM_SUBMIT: "#ctl00_ContentPlaceHolder1_ctl00_bntLocTKB",

  // Credit class
  CREDIT_CLASS: ".grid-roll2 > table",

  CLASS_SUBJECT_CODE: (i: number) => {
    return `.grid-roll2 > table:nth-child(${
      i + 1
    }) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)`;
  },
  CLASS_SUBJECT_TITLE: (i: number) => {
    return `.grid-roll2 > table:nth-child(${
      i + 1
    }) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)`;
  },
  CLASS_SUBJECT_GROUP: (i: number) => {
    return `.grid-roll2 > table:nth-child(${
      i + 1
    }) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(3)`;
  },
  CLASS_SUBJECT_CREDIT: (i: number) => {
    return `.grid-roll2 > table:nth-child(${
      i + 1
    }) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(4)`;
  },
  CLASS_CLASSES: (i: number) => {
    return `.grid-roll2 > table:nth-child(${
      i + 1
    }) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(5)`;
  },
  CLASS_DAY: (i: number) => {
    return `.grid-roll2 > table:nth-child(${
      i + 1
    }) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(9) > div`;
  },
  CLASS_DAY_2: (i: number) => {
    return `.grid-roll2 > table:nth-child(${
      i + 1
    }) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(9) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)`;
  },
  CLASS_START_TIME: (i: number) => {
    return `.grid-roll2 > table:nth-child(${
      i + 1
    }) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(10) > div`;
  },
  CLASS_START_TIME_2: (i: number) => {
    return `.grid-roll2 > table:nth-child(${
      i + 1
    }) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(10) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)`;
  },
  CLASS_DURATION: (i: number) => {
    return `.grid-roll2 > table:nth-child(${
      i + 1
    }) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(11) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)`;
  },
  CLASS_DURATION_2: (i: number) => {
    return `.grid-roll2 > table:nth-child(${
      i + 1
    }) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(12) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)`;
  },
  CLASS_ROOM: (i: number) => {
    return `.grid-roll2 > table:nth-child(${
      i + 1
    }) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(12) > div`;
  },
  CLASS_ROOM_2: (i: number) => {
    return `.grid-roll2 > table:nth-child(${
      i + 1
    }) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(12) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)`;
  },
  CLASS_START_END_DATE: (i: number) => {
    return `.grid-roll2 > table:nth-child(${
      i + 1
    }) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(14) > div`;
  },
  CLASS_START_END_DATE_2: (i: number) => {
    return `.grid-roll2 > table:nth-child(${
      i + 1
    }) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(14) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)`;
  },
  CLASS_STUDENT_LIST_URL: (i: number) => {
    return `.grid-roll2 > table:nth-child(${
      i + 1
    }) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(15) > a`;
  },

  STUDENT_LIST: ".navigate-base > fieldset:nth-child(3)",
  STUDENT_INFO:
    "#ctl00_ContentPlaceHolder1_ctl00_gvDSSinhVien > tbody:nth-child(1) > tr",
  STUDENT_ID: (i: number) => {
    return `#ctl00_ContentPlaceHolder1_ctl00_gvDSSinhVien > tbody:nth-child(1) > tr:nth-child(${
      i + 1
    }) > td:nth-child(2) > span`;
  },
  STUDENT_LAST_NAME: (i: number) => {
    return `#ctl00_ContentPlaceHolder1_ctl00_gvDSSinhVien > tbody:nth-child(1) > tr:nth-child(${
      i + 1
    }) > td:nth-child(3) > span`;
  },
  STUDENT_FIRST_NAME: (i: number) => {
    return `#ctl00_ContentPlaceHolder1_ctl00_gvDSSinhVien > tbody:nth-child(1) > tr:nth-child(${
      i + 1
    }) > td:nth-child(4) > span`;
  },
  STUDENT_CLASS_ID: (i: number) => {
    return `#ctl00_ContentPlaceHolder1_ctl00_gvDSSinhVien > tbody:nth-child(1) > tr:nth-child(${
      i + 1
    }) > td:nth-child(5) > span`;
  },
};
