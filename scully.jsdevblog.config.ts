import { ScullyConfig, setPluginConfig } from '@scullyio/scully';

setPluginConfig('md', { enableSyntaxHighlighting: true });

export const config: ScullyConfig = {
  projectRoot: "./src",
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
