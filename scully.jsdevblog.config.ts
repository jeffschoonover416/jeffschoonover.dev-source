import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
const { OptimizeCSSPlugin } = require('scully-plugin-optimize-css');
//const { DisableAngular } = require('scully-plugin-disable-angular');
const { MinifyHtml } = require('scully-plugin-minify-html');
//import { getDelayAngularPlugin } from '@flowaccount/scully-plugin-angular-delay';

setPluginConfig('md', { enableSyntaxHighlighting: true });

export const config: ScullyConfig = {
  projectRoot: "./src",
  defaultPostRenderers: [OptimizeCSSPlugin, MinifyHtml],
  projectName: "jsdevblog",
  outDir: './dist/static',
  routes: {
    '/posts/:postId': {
      type: 'contentFolder',
      postId: {
        folder: "./posts",
      }
    }, 
  },
};
