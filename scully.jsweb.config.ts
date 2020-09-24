import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
//const { OptimizeCSSPlugin } = require('scully-plugin-optimize-css');

setPluginConfig('md',  { enableSyntaxHighlighting: true });

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "jsweb",
  outDir: './dist/static',
  defaultPostRenderers: [
    //OptimizeCSSPlugin,
  ],
  routes: {
    '/posts/:id': {
      type: 'contentFolder',
      id: {
        folder: "./posts"
      }
    },
  }
};