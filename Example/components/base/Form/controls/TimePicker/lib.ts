import moment from "moment";

import { TIME_FORMAT } from "@core/core/const";

export function dateToTime(date: string) {
  return moment(date).format(TIME_FORMAT);
}

export function timeToDate(time: string) {
  return moment(time, TIME_FORMAT).format();
}
