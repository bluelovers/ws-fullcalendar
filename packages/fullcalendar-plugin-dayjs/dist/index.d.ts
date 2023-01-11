import { CalendarApi, Duration as FCDuration, PluginDef } from '@fullcalendar/core';
import { Dayjs } from 'dayjs';
import { Duration as DayjsDuration } from 'dayjs/plugin/duration';

export declare function toDayjs(date: Date, calendar: CalendarApi): Dayjs;
export declare function toDayjsDuration(fcDuration: FCDuration): DayjsDuration;
export declare const plugin: PluginDef;

export {
	plugin as default,
};

export {};
