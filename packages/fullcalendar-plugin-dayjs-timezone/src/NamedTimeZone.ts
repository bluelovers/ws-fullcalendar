import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import arraySupport from 'dayjs/plugin/arraySupport';
import toArray from 'dayjs/plugin/toArray';
import { NamedTimeZoneImpl } from '@fullcalendar/core/internal';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(arraySupport);
dayjs.extend(toArray);

export type IDateInputArray = [number?, number?, number?, number?, number?, number?, number?]
export type IDateOutputArray = IDateOutputArrayStrict | number[]
export type IDateOutputArrayStrict = [number, number, number, number, number, number, number]

export class DayjsNamedTimeZone extends NamedTimeZoneImpl
{
	offsetForArray(a: IDateInputArray): number
	{
		return dayjs.tz(a, this.timeZoneName).utcOffset()
	}

	timestampToArray(ms: number)
	{
		return dayjs.tz(ms, this.timeZoneName).toArray() as IDateOutputArray
	}
}
