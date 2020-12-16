import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import { getHttp404Plugin } from '@gammastream/scully-plugin-http404';


const Http404Plugin = getHttp404Plugin();
const {DisableAngular} = require('scully-plugin-disable-angular');
const { removeScullyScripts } = require('./plugins/removeScullyScripts');

import 'prismjs/components/prism-yaml.js';

const postRenderers = ['seoHrefOptimise', DisableAngular, removeScullyScripts, Http404Plugin];

setPluginConfig('md',  { enableSyntaxHighlighting: true });

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "jsweb",
  defaultPostRenderers: postRenderers,
  outDir: './dist/static',
  routes: {
    '/posts/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./posts"
      }
    },
  }
};