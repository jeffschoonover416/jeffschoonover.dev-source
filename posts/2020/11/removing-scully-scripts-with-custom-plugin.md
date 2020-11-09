---
title: 'Removing unneeded Scully scripts after disabling Angular with a custom plugin'
description: How to add a custom render plugin to modify the html that Scully generates 
published: true
author: 'Jeff Schoonover'
date: '2020-11-07'
slug: remove-scripts-custom-scully-render-plugin
tags:
  - jeffschoonover.dev
---

With Angular only used to build this site but not to run it (see the last post), there were some extra in-line scripts that Scully automatically puts in that were not being used anymore.  I wanted to remove them because the console was logging the error generated when the Content Security Policy blocked them.  You can take care of things like this with a Scully plugin.  The two most popular types of plugins are router plugins, which help Scully discover new routes and customize how to handle them, and render plugins, which modify the HTML.  Since we are removing scripts, we need a render plugin.  We can't remove all scripts because there is a script in the `index.html` file that controls the dropdown menu.  Here are the scripts to remove:

```html

//the script that holds the transfer-state data.  At this point I don't have any transfer-state data
//so it is empty
<script id="ScullyIO-transfer-state"></script>

//Scully is generated
<script>window['ScullyIO']='generated';</script>

//this is the script that checks to see if Scully has rendered the Scully Content of a page.  
//I'm taking it out now because my site is set up so I have confidence any new post will be rendered.
//Also, the cssId changes with each post, so a different hash for each post would be required in the CSP if 
//it is kept
<script>try {window['scullyContent'] = {cssId:"_ngcontent-san-c98",html:document.body.innerHTML.split('<!--scullyContent-begin-->')[1].split('<!--scullyContent-end-->')[0]};} catch(e) {console.error('scully could not parse content');}</script>

```

A Scully plugin can be made with a single Javascript file (I couldn't get Typescript to work as of Scully 1.0.0).  My favorite tutorial for making your own custom plugins is a [YouTube video on Scully](https://www.youtube.com/watch?v=f7CfXYMc8Qg&t=2287s) by Sam Vloeberghs.  Here is my plugin for removing the above scripts:

```js
//removeScullyScripts.js

const { registerPlugin } = require('@scullyio/scully');

function removeScullyScriptPlugin (html) {

    const windowScript = new RegExp('<script>try {window[\\S\\s]*?<\\/script>');
    html = html.replace(windowScript, '');

    html = html.replace('<script id="ScullyIO-transfer-state"></script>', '');
    html = html.replace("<script>window['ScullyIO']='generated';</script>", '');

    return (html);

}

const removeScullyScripts = 'removeScullyScripts';
registerPlugin('render', removeScullyScripts, removeScullyScriptPlugin);
module.exports.removeScullyScripts = removeScullyScripts;
```

The first script replacement uses a regular expression since the text changes with each file.  One thing I learned was the necessity of two backslashes to indicate a RE token rather than just one (which is on most websites and what I'm used to).

Let's look at the `registerPlugin` arguments:

1. `'render'` indicates the type of plugin
2. `removeScullyScripts` is what we will call it in the Scully config file
3. `removeScullyScriptPlugin` is the function that should be called (in our case there is only one for the entire plugin)

Here is the Scully config file with the `removeScullyScripts` render plugin installed:

```ts
import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
const { DisableAngular } = require('scully-plugin-disable-angular');
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
```

See, that is not too bad, and you can use the plugin system to modify the HTML in your static files after Scully has made them.  Have fun!
