import { createPlugin as t } from "@fullcalendar/core";

import e from "dayjs";

import { CalendarImpl as r } from "@fullcalendar/core/internal";

import a from "dayjs/plugin/utc";

import o from "dayjs/plugin/timezone";

import n from "dayjs/plugin/duration";

import l from "dayjs/plugin/arraySupport";

import i from "dayjs/plugin/toArray";

function toDayjs(t, e) {
  if (!(e instanceof r)) throw new Error("must supply a CalendarApi instance");
  let {dateEnv: a} = e.getCurrentData();
  return convertToDayjs(t, a.timeZone, null, a.locale.codes[0]);
}

function toDayjsDuration(t) {
  return e.duration(t);
}

function convertToDayjs(t, r, a, o) {
  let n;
  return "local" === r ? n = e(t) : "UTC" === r ? n = e.utc(t) : e.tz ? n = e.tz(t, r) : (n = e.utc(t), 
  null != a && n.utcOffset(a)), n.locale(o), n;
}

function createDayjsFormatFunc(t) {
  return e => e ? t.format(e) : "";
}

function parseCmdStr(t) {
  let e = t.match(/^(.*?)\{(.*)\}(.*)$/);
  if (e) {
    let t = parseCmdStr(e[2]);
    return {
      head: e[1],
      middle: t,
      tail: e[3],
      whole: e[1] + t.whole + e[3]
    };
  }
  return {
    head: null,
    middle: null,
    tail: null,
    whole: t
  };
}

function formatRange(t, e, r, a) {
  if (t.middle) {
    let o = e(t.head), n = formatRange(t.middle, e, r, a), l = e(t.tail), i = r(t.head), d = formatRange(t.middle, e, r, a), m = r(t.tail);
    if (o === i && l === m) return o + (n === d ? n : n + a + d) + l;
  }
  let o = e(t.whole), n = r(t.whole);
  return o === n ? o : o + a + n;
}

e.extend(a), e.extend(o), e.extend(l), e.extend(i), e.extend(n);

const d = t({
  name: "fullcalendar-plugin-dayjs",
  cmdFormatter: function formatWithCmdStr(t, e) {
    let r = parseCmdStr(t);
    if (e.end) {
      let t = convertToDayjs(e.start.array, e.timeZone, e.start.timeZoneOffset, e.localeCodes[0]), a = convertToDayjs(e.end.array, e.timeZone, e.end.timeZoneOffset, e.localeCodes[0]);
      return formatRange(r, createDayjsFormatFunc(t), createDayjsFormatFunc(a), e.defaultSeparator);
    }
    return convertToDayjs(e.date.array, e.timeZone, e.date.timeZoneOffset, e.localeCodes[0]).format(r.whole);
  }
});

export { d as default, d as plugin, toDayjs, toDayjsDuration };
//# sourceMappingURL=index.esm.mjs.map
