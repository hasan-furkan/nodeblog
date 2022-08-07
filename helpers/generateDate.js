const moment = require("moment")
require('moment/locale/tr');
module.exports = {
    generateDate : (date, format) => {
        return moment(date).format(format)
    }
}