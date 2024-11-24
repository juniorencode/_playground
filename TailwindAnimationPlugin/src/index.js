import createPlugin from 'tailwindcss/plugin.js';
import theme from './theme.js';

const pluginCreator = api => {
  console.log('pluginCreator');
};
const pluginConfig = { theme };

export default createPlugin(pluginCreator, pluginConfig);
