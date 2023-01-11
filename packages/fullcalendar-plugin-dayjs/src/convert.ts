import dayjs, { Dayjs, ConfigType } from 'dayjs';
import { CalendarApi, Duration as FCDuration } from '@fullcalendar/core'
import { CalendarImpl } from '@fullcalendar/core/internal'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import duration, { Duration as DayjsDuration } from 'dayjs/plugin/duration';
import arraySupport from 'dayjs/plugin/arraySupport';
import toArray from 'dayjs/plugin/toArray';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(arraySupport);
dayjs.extend(toArray);
dayjs.extend(duration);

export function toDayjs(date: Date, calendar: CalendarApi): Dayjs
{
	if (!(calendar instanceof CalendarImpl))
	{
		throw new Error('must supply a CalendarApi instance')
	}

	let { dateEnv } = calendar.getCurrentData()

	return convertToDayjs(
		date,
		dateEnv.timeZone,
		null,
		dateEnv.locale.codes[0],
	)
}

export function toDayjsDuration(fcDuration: FCDuration): DayjsDuration
{
	return dayjs.duration(fcDuration)
}

// Internal Utils

export function convertToDayjs(
	input: ConfigType,
	timeZone: string,
	timeZoneOffset: number | null,
	locale: string,
): Dayjs
{
	let mom: Dayjs

	if (timeZone === 'local')
	{
		mom = dayjs(input)
	}
	else if (timeZone === 'UTC')
	{
		mom = dayjs.utc(input)
	}
	else if ((dayjs as any).tz)
	{
		mom = dayjs.tz(input, timeZone)
	}
	else
	{
		mom = dayjs.utc(input)

		if (timeZoneOffset != null)
		{
			mom.utcOffset(timeZoneOffset)
		}
	}

	mom.locale(locale)

	return mom
}
