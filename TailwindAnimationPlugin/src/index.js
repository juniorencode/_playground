import createPlugin from 'tailwind/plugin';
import theme from './theme';

const pluginCreator = api => {
  console.log('pluginCreator');
};
const pluginConfig = { theme };

export default createPlugin(pluginCreator, pluginConfig);
