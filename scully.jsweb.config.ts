import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
const {DisableAngular} = require('scully-plugin-disable-angular');
const { removeScullyScripts } = require('./plugins/removeScullyScripts');

import 'prismjs/components/prism-yaml.js';

const postRenderers = ['seoHrefOptimise', DisableAngular, removeScullyScripts];

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