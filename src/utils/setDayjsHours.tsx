import { Dayjs } from "dayjs";

export const setDayjsHours = (v: Dayjs, h = 0): Dayjs =>
  v?.set("hour", h).set("minute", 0).set("second", 0) || v;
