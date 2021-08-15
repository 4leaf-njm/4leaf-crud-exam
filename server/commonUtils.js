const moment = require("moment");
require("moment-timezone");

const CURRENT_TIME = async () => {
  moment.tz.setDefault("Asia/Seoul");

  const date = moment().format("YYYY-MM-DD HH:mm:ss");

  return date;
};

module.exports = {
  CURRENT_TIME,
};
