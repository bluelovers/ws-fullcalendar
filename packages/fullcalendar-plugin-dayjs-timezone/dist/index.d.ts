import { PluginDef } from '@fullcalendar/core';
import { NamedTimeZoneImpl } from '@fullcalendar/core/internal';

export type IDateInputArray = [
	number?,
	number?,
	number?,
	number?,
	number?,
	number?,
	number?
];
export type IDateOutputArray = IDateOutputArrayStrict | number[];
export type IDateOutputArrayStrict = [
	number,
	number,
	number,
	number,
	number,
	number,
	number
];
export declare class DayjsNamedTimeZone extends NamedTimeZoneImpl {
	offsetForArray(a: IDateInputArray): number;
	timestampToArray(ms: number): IDateOutputArray;
}
export declare const plugin: PluginDef;

export {
	plugin as default,
};

export {};
