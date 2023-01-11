'use strict';

var core = require('@fullcalendar/core');
var dayjs = require('dayjs');
var internal = require('@fullcalendar/core/internal');
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
var duration = require('dayjs/plugin/duration');
var arraySupport = require('dayjs/plugin/arraySupport');
var toArray = require('dayjs/plugin/toArray');

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(arraySupport);
dayjs.extend(toArray);
dayjs.extend(duration);
function toDayjs(date, calendar) {
  if (!(calendar instanceof internal.CalendarImpl)) {
    throw new Error('must supply a CalendarApi instance');
  }
  let {
    dateEnv
  } = calendar.getCurrentData();
  return convertToDayjs(date, dateEnv.timeZone, null, dateEnv.locale.codes[0]);
}
function toDayjsDuration(fcDuration) {
  return dayjs.duration(fcDuration);
}
function convertToDayjs(input, timeZone, timeZoneOffset, locale) {
  let mom;
  if (timeZone === 'local') {
    mom = dayjs(input);
  } else if (timeZone === 'UTC') {
    mom = dayjs.utc(input);
  } else if (dayjs.tz) {
    mom = dayjs.tz(input, timeZone);
  } else {
    mom = dayjs.utc(input);
    if (timeZoneOffset != null) {
      mom.utcOffset(timeZoneOffset);
    }
  }
  mom.locale(locale);
  return mom;
}

function formatWithCmdStr(cmdStr, arg) {
  let cmd = parseCmdStr(cmdStr);
  if (arg.end) {
    let startMom = convertToDayjs(arg.start.array, arg.timeZone, arg.start.timeZoneOffset, arg.localeCodes[0]);
    let endMom = convertToDayjs(arg.end.array, arg.timeZone, arg.end.timeZoneOffset, arg.localeCodes[0]);
    return formatRange(cmd, createDayjsFormatFunc(startMom), createDayjsFormatFunc(endMom), arg.defaultSeparator);
  }
  return convertToDayjs(arg.date.array, arg.timeZone, arg.date.timeZoneOffset, arg.localeCodes[0]).format(cmd.whole);
}
function createDayjsFormatFunc(mom) {
  return cmdStr => cmdStr ? mom.format(cmdStr) : '';
}
function parseCmdStr(cmdStr) {
  let parts = cmdStr.match(/^(.*?)\{(.*)\}(.*)$/);
  if (parts) {
    let middle = parseCmdStr(parts[2]);
    return {
      head: parts[1],
      middle,
      tail: parts[3],
      whole: parts[1] + middle.whole + parts[3]
    };
  }
  return {
    head: null,
    middle: null,
    tail: null,
    whole: cmdStr
  };
}
function formatRange(cmd, formatStart, formatEnd, separator) {
  if (cmd.middle) {
    let startHead = formatStart(cmd.head);
    let startMiddle = formatRange(cmd.middle, formatStart, formatEnd, separator);
    let startTail = formatStart(cmd.tail);
    let endHead = formatEnd(cmd.head);
    let endMiddle = formatRange(cmd.middle, formatStart, formatEnd, separator);
    let endTail = formatEnd(cmd.tail);
    if (startHead === endHead && startTail === endTail) {
      return startHead + (startMiddle === endMiddle ? startMiddle : startMiddle + separator + endMiddle) + startTail;
    }
  }
  let startWhole = formatStart(cmd.whole);
  let endWhole = formatEnd(cmd.whole);
  if (startWhole === endWhole) {
    return startWhole;
  }
  return startWhole + separator + endWhole;
}

var name = "fullcalendar-plugin-dayjs";

const plugin = /*#__PURE__*/core.createPlugin({
  name,
  cmdFormatter: formatWithCmdStr
});
{
  Object.defineProperty(plugin, "__esModule", {
    value: true
  });
  Object.defineProperty(plugin, 'plugin', {
    value: plugin
  });
  Object.defineProperty(plugin, 'default', {
    value: plugin
  });
  Object.defineProperty(plugin, 'toDayjs', {
    value: toDayjs
  });
  Object.defineProperty(plugin, 'toDayjsDuration', {
    value: toDayjsDuration
  });
}

// @ts-ignore
module.exports = plugin;
//# sourceMappingURL=index.cjs.development.cjs.map
