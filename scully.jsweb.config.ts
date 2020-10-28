import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
const {DisableAngular} = require('scully-plugin-disable-angular');

import 'prismjs/components/prism-yaml.js';

const postRenderers = ['seoHrefOptimise', DisableAngular];

setPluginConfig('md',  { enableSyntaxHighlighting: true });

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "jsweb",
  defaultPostRenderers: postRenderers,
  outDir: './dist/static',
  routes: {
    '/posts/:id': {
      type: 'contentFolder',
      id: {
        folder: "./posts"
      }
    },
  }
};