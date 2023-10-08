/* do not change this file, it is auto generated by storybook. */

import {
  configure,
  addDecorator,
  addParameters,
  addArgsEnhancer,
  clearDecorators,
} from '@storybook/react-native';

global.STORIES = [
  {
    titlePrefix: '',
    directory: './.storybook/stories',
    files: '**/*.stories.?(ts|tsx|js|jsx)',
    importPathMatcher:
      '^\\.[\\\\/](?:\\.storybook\\/stories(?:\\/(?!\\.)(?:(?:(?!(?:^|\\/)\\.).)*?)\\/|\\/|$)(?!\\.)(?=.)[^/]*?\\.stories\\.(?:ts|tsx|js|jsx)?)$',
  },
];

import '@storybook/addon-ondevice-controls/register';
import '@storybook/addon-ondevice-actions/register';

import { argsEnhancers } from '@storybook/addon-actions/dist/modern/preset/addArgs';

import { decorators, parameters } from './preview';

if (decorators) {
  if (__DEV__) {
    // stops the warning from showing on every HMR
    require('react-native').LogBox.ignoreLogs([
      '`clearDecorators` is deprecated and will be removed in Storybook 7.0',
    ]);
  }
  // workaround for global decorators getting infinitely applied on HMR, see https://github.com/storybookjs/react-native/issues/185
  clearDecorators();
  decorators.forEach(decorator => addDecorator(decorator));
}

if (parameters) {
  addParameters(parameters);
}

try {
  argsEnhancers.forEach(enhancer => addArgsEnhancer(enhancer));
} catch {}

const getStories = () => {
  return {
    './.storybook/stories/Button/Button.stories.tsx': require('./stories/Button/Button.stories.tsx'),
    './.storybook/stories/Typography/Typography.stories.tsx': require('./stories/Typography/Typography.stories.tsx'),
    './.storybook/stories/Checkbox/Checkbox.stories.tsx': require('./stories/Checkbox/Checkbox.stories.tsx'),
    './.storybook/stories/Input/Input.stories.tsx': require('./stories/Input/Input.stories'),
    './.storybook/stories/AlertBanner/AlertBanner.stories.tsx': require('./stories/AlertBanner/AlertBanner.stories'),
    './.storybook/stories/ListItem/ListItem.stories.tsx': require('./stories/ListItem/ListItem.stories'),
  };
};

configure(getStories, module, false);
