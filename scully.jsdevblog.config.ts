import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
const { DisableAngular } = require('scully-plugin-disable-angular');

setPluginConfig('md', { enableSyntaxHighlighting: true });

export const config: ScullyConfig = {
  projectRoot: "./src",
  defaultPostRenderers: DisableAngular,
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
