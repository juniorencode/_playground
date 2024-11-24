import createPlugin from 'tailwindcss/plugin.js';
import theme from './theme.js';

const pluginCreator = api => {
  const { theme, matchUtilities } = api;

  matchUtilities(
    {
      'animate-delay': value => ({
        'animation-delay': value
      })
    },
    {
      values: theme('animationDelay')
    }
  );
};
const pluginConfig = { theme };

export default createPlugin(pluginCreator, pluginConfig);
