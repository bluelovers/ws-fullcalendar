'use strict';

var core = require('@fullcalendar/core');
var dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
var arraySupport = require('dayjs/plugin/arraySupport');
var toArray = require('dayjs/plugin/toArray');
var internal = require('@fullcalendar/core/internal');

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(arraySupport);
dayjs.extend(toArray);
class DayjsNamedTimeZone extends internal.NamedTimeZoneImpl {
  offsetForArray(a) {
    return dayjs.tz(a, this.timeZoneName).utcOffset();
  }
  timestampToArray(ms) {
    return dayjs.tz(ms, this.timeZoneName).toArray();
  }
}

var name = "fullcalendar-plugin-dayjs-timezone";

const plugin = /*#__PURE__*/core.createPlugin({
  name,
  namedTimeZonedImpl: DayjsNamedTimeZone
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
  Object.defineProperty(plugin, 'DayjsNamedTimeZone', {
    value: DayjsNamedTimeZone
  });
}

// @ts-ignore
module.exports = plugin;
//# sourceMappingURL=index.cjs.development.cjs.map
