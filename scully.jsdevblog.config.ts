import { ScullyConfig } from '@scullyio/scully';
export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "jsdevblog",
  outDir: './dist/static',
  routes: {
    '/:postId': {
      type: 'contentFolder',
      postId: {
        folder: "./md-content"
      }
    }    
  }
};
