import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import { criticalCSS } from '@scullyio/scully-plugin-critical-css';

import 'prismjs/components/prism-yaml.js';

const defaultPostRenderers = ['seoHrefOptimise', criticalCSS];

setPluginConfig('md',  { enableSyntaxHighlighting: true });
setPluginConfig(criticalCSS, {
  width: 0,
  height: 0
})

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "jsweb",
  defaultPostRenderers,
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