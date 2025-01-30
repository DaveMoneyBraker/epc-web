import { isDomain } from "./isDomain";
import { isEmail } from "./isEmail";
import { isIp } from "./isIp";

const APP_CHECKS = {
  isIp,
  isEmail,
  isDomain,
};

export default APP_CHECKS;
