import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
//const { DisableAngular } = require('scully-plugin-disable-angular');
import { getDelayAngularPlugin } from '@flowaccount/scully-plugin-angular-delay';

setPluginConfig('md', { enableSyntaxHighlighting: true });

export const config: ScullyConfig = {
  projectRoot: "./src",
  defaultPostRenderers: getDelayAngularPlugin({ delayMilliseconds: 1500 }),
  projectName: "jsdevblog",
  outDir: './dist/static',
  routes: {
    '/:slugId': {
      type: 'contentFolder',
      slugId: {
        folder: "./md-content",
      }
    }    
  },
};
