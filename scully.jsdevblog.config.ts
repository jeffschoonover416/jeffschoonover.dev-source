import { ScullyConfig } from '@scullyio/scully';
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
  }
};
