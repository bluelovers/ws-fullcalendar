import { VerboseFormattingArg } from '@fullcalendar/core/internal'
import { convertToDayjs } from './convert'
import { Dayjs } from 'dayjs';

export function formatWithCmdStr(cmdStr: string, arg: VerboseFormattingArg): string
{
	let cmd = parseCmdStr(cmdStr)

	if (arg.end)
	{
		let startMom = convertToDayjs(
			arg.start.array as any,
			arg.timeZone,
			arg.start.timeZoneOffset,
			arg.localeCodes[0],
		)
		let endMom = convertToDayjs(
			arg.end.array as any,
			arg.timeZone,
			arg.end.timeZoneOffset,
			arg.localeCodes[0],
		)
		return formatRange(
			cmd,
			createDayjsFormatFunc(startMom),
			createDayjsFormatFunc(endMom),
			arg.defaultSeparator,
		)
	}

	return convertToDayjs(
		arg.date.array as any,
		arg.timeZone,
		arg.date.timeZoneOffset,
		arg.localeCodes[0],
	).format(cmd.whole) // TODO: test for this
}

function createDayjsFormatFunc(mom: Dayjs)
{
	return (cmdStr?: string) => (
		cmdStr ? mom.format(cmdStr) : '' // because calling with blank string results in ISO8601 :(
	)
}

/* Range Formatting (duplicate code as other date plugins)
----------------------------------------------------------------------------------------------------*/

interface CmdParts
{
	head: string | null
	middle: CmdParts | null
	tail: string | null
	whole: string
}

function parseCmdStr(cmdStr: string): CmdParts
{
	let parts = cmdStr.match(/^(.*?)\{(.*)\}(.*)$/) // TODO: lookbehinds for escape characters

	if (parts)
	{
		let middle = parseCmdStr(parts[2])

		return {
			head: parts[1],
			middle,
			tail: parts[3],
			whole: parts[1] + middle.whole + parts[3],
		}
	}

	return {
		head: null,
		middle: null,
		tail: null,
		whole: cmdStr,
	}
}

function formatRange(
	cmd: CmdParts,
	formatStart: (cmdStr: string) => string,
	formatEnd: (cmdStr: string) => string,
	separator: string,
): string
{
	if (cmd.middle)
	{
		let startHead = formatStart(cmd.head)
		let startMiddle = formatRange(cmd.middle, formatStart, formatEnd, separator)
		let startTail = formatStart(cmd.tail)

		let endHead = formatEnd(cmd.head)
		let endMiddle = formatRange(cmd.middle, formatStart, formatEnd, separator)
		let endTail = formatEnd(cmd.tail)

		if (startHead === endHead && startTail === endTail)
		{
			return startHead +
				(startMiddle === endMiddle ? startMiddle : startMiddle + separator + endMiddle) +
				startTail
		}
	}

	let startWhole = formatStart(cmd.whole)
	let endWhole = formatEnd(cmd.whole)

	if (startWhole === endWhole)
	{
		return startWhole
	}

	return startWhole + separator + endWhole
}
