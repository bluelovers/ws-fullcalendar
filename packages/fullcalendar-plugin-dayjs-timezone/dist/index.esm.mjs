import { createPlugin as e } from "@fullcalendar/core";

import r from "dayjs";

import t from "dayjs/plugin/utc";

import a from "dayjs/plugin/timezone";

import m from "dayjs/plugin/arraySupport";

import o from "dayjs/plugin/toArray";

import { NamedTimeZoneImpl as n } from "@fullcalendar/core/internal";

r.extend(t), r.extend(a), r.extend(m), r.extend(o);

class DayjsNamedTimeZone extends n {
  offsetForArray(e) {
    return r.tz(e, this.timeZoneName).utcOffset();
  }
  timestampToArray(e) {
    return r.tz(e, this.timeZoneName).toArray();
  }
}

const i = e({
  name: "fullcalendar-plugin-dayjs-timezone",
  namedTimeZonedImpl: DayjsNamedTimeZone
});

export { DayjsNamedTimeZone, i as default, i as plugin };
//# sourceMappingURL=index.esm.mjs.map
