import { createPlugin, PluginDef } from '@fullcalendar/core';
import { formatWithCmdStr } from './format.js';
import { toDayjs, toDayjsDuration } from './convert';
import { name } from '../package.json';

export const plugin = createPlugin({
	name,
	cmdFormatter: formatWithCmdStr,
}) as PluginDef

export { toDayjs, toDayjsDuration }

// @ts-ignore
if (process.env.TSDX_FORMAT !== 'esm')
{
	Object.defineProperty(plugin, "__esModule", { value: true });

	Object.defineProperty(plugin, 'plugin', { value: plugin });
	Object.defineProperty(plugin, 'default', { value: plugin });

	Object.defineProperty(plugin, 'toDayjs', { value: toDayjs });
	Object.defineProperty(plugin, 'toDayjsDuration', { value: toDayjsDuration });
}

export default plugin
