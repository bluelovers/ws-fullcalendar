import { createPlugin, PluginDef } from '@fullcalendar/core'
import { DayjsNamedTimeZone } from './NamedTimeZone';
import { name } from '../package.json';
import { ConfigTypeMap } from 'dayjs';

declare module 'dayjs'
{
	interface ConfigTypeMap
	{
		arraySupport: [number?, number?, number?, number?, number?, number?, number?]
	}
}

export { ConfigTypeMap }

export { DayjsNamedTimeZone }

export const plugin = createPlugin({
	name,
	namedTimeZonedImpl: DayjsNamedTimeZone,
}) as PluginDef

// @ts-ignore
if (process.env.TSDX_FORMAT !== 'esm')
{
	Object.defineProperty(plugin, "__esModule", { value: true });

	Object.defineProperty(plugin, 'plugin', { value: plugin });
	Object.defineProperty(plugin, 'default', { value: plugin });

	Object.defineProperty(plugin, 'DayjsNamedTimeZone', { value: DayjsNamedTimeZone });
}

export default plugin
