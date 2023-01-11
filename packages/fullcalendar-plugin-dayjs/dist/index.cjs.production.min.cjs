"use strict";

var e = require("@fullcalendar/core"), t = require("dayjs"), r = require("@fullcalendar/core/internal"), a = require("dayjs/plugin/utc"), n = require("dayjs/plugin/timezone"), o = require("dayjs/plugin/duration"), l = require("dayjs/plugin/arraySupport"), u = require("dayjs/plugin/toArray");

function convertToDayjs(e, r, a, n) {
  let o;
  return "local" === r ? o = t(e) : "UTC" === r ? o = t.utc(e) : t.tz ? o = t.tz(e, r) : (o = t.utc(e), 
  null != a && o.utcOffset(a)), o.locale(n), o;
}

function createDayjsFormatFunc(e) {
  return t => t ? e.format(t) : "";
}

function parseCmdStr(e) {
  let t = e.match(/^(.*?)\{(.*)\}(.*)$/);
  if (t) {
    let e = parseCmdStr(t[2]);
    return {
      head: t[1],
      middle: e,
      tail: t[3],
      whole: t[1] + e.whole + t[3]
    };
  }
  return {
    head: null,
    middle: null,
    tail: null,
    whole: e
  };
}

function formatRange(e, t, r, a) {
  if (e.middle) {
    let n = t(e.head), o = formatRange(e.middle, t, r, a), l = t(e.tail), u = r(e.head), i = formatRange(e.middle, t, r, a), d = r(e.tail);
    if (n === u && l === d) return n + (o === i ? o : o + a + i) + l;
  }
  let n = t(e.whole), o = r(e.whole);
  return n === o ? n : n + a + o;
}

t.extend(a), t.extend(n), t.extend(l), t.extend(u), t.extend(o);

const i = e.createPlugin({
  name: "fullcalendar-plugin-dayjs",
  cmdFormatter: function formatWithCmdStr(e, t) {
    let r = parseCmdStr(e);
    if (t.end) {
      let e = convertToDayjs(t.start.array, t.timeZone, t.start.timeZoneOffset, t.localeCodes[0]), a = convertToDayjs(t.end.array, t.timeZone, t.end.timeZoneOffset, t.localeCodes[0]);
      return formatRange(r, createDayjsFormatFunc(e), createDayjsFormatFunc(a), t.defaultSeparator);
    }
    return convertToDayjs(t.date.array, t.timeZone, t.date.timeZoneOffset, t.localeCodes[0]).format(r.whole);
  }
});

Object.defineProperty(i, "__esModule", {
  value: !0
}), Object.defineProperty(i, "plugin", {
  value: i
}), Object.defineProperty(i, "default", {
  value: i
}), Object.defineProperty(i, "toDayjs", {
  value: function toDayjs(e, t) {
    if (!(t instanceof r.CalendarImpl)) throw new Error("must supply a CalendarApi instance");
    let {dateEnv: a} = t.getCurrentData();
    return convertToDayjs(e, a.timeZone, null, a.locale.codes[0]);
  }
}), Object.defineProperty(i, "toDayjsDuration", {
  value: function toDayjsDuration(e) {
    return t.duration(e);
  }
}), module.exports = i;
//# sourceMappingURL=index.cjs.production.min.cjs.map
