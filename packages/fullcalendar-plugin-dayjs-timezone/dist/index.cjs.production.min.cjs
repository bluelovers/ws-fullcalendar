"use strict";

var e = require("@fullcalendar/core"), r = require("dayjs"), a = require("dayjs/plugin/utc"), t = require("dayjs/plugin/timezone"), n = require("dayjs/plugin/arraySupport"), i = require("dayjs/plugin/toArray"), u = require("@fullcalendar/core/internal");

r.extend(a), r.extend(t), r.extend(n), r.extend(i);

class DayjsNamedTimeZone extends u.NamedTimeZoneImpl {
  offsetForArray(e) {
    return r.tz(e, this.timeZoneName).utcOffset();
  }
  timestampToArray(e) {
    return r.tz(e, this.timeZoneName).toArray();
  }
}

const d = e.createPlugin({
  name: "fullcalendar-plugin-dayjs-timezone",
  namedTimeZonedImpl: DayjsNamedTimeZone
});

Object.defineProperty(d, "__esModule", {
  value: !0
}), Object.defineProperty(d, "plugin", {
  value: d
}), Object.defineProperty(d, "default", {
  value: d
}), Object.defineProperty(d, "DayjsNamedTimeZone", {
  value: DayjsNamedTimeZone
}), module.exports = d;
//# sourceMappingURL=index.cjs.production.min.cjs.map
