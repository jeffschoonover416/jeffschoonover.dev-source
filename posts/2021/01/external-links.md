---
title: 'External link customization with Scully'
description: 'How to make your external links open in a new tab, let other websites know where their traffic is coming from, and add an icon after each external link'
published: true
author: 'Jeff Schoonover'
date: '2021-01-06'
tags:
    - jeffschoonover.dev
slug: external-link-customization-scully
---

Before today, the external hyperlinks on this website looked and behaved exactly as internal links.  But I think it is expected and useful to have external links open in a new tab or window for a site like mine, where the links are used as references.  Also, I want my external links to have an icon indicating that they are external so no one is surprised.  One last detail: I wanted to allow the external links to see where the traffic was coming from.Here is how I went about making these customizations in Scully.

## External links open in a new tab, and the external link can see the site that referred the traffic

By default, Scully renders external links to have a format like this:

```html
<a _ngcontent-bul-c98="" href="https://github.com/jeffschoonover416/jeffschoonover.dev-source"
style="text-decoration-line: underline;" rel="noreferrer noopener">Github repository</a>
```

<br>

The `ngcontent` and `style` attributes are related to how the text looks.  The `rel` attribute is the interesting one.  "noreferrer" means that when someone clicks the link, the external link won't see where the traffic is coming from - the referring site information is not passed along.  "noopener" means that if you open a link in a new tab, the site in the new tab does not have access to the "opener" original tab you clicked from.  There are lots of websites that go into more detail on this, and I thought the August 2020 article on [Reverse Tabnabbing and noopener, noreferrer](https://blog.bhanuteja.dev/noopener-noreferrer-and-nofollow-when-to-use-them-how-can-these-prevent-phishing-attacks) by Bhanu Teja Pachipulusu was a good place to start.  ["Reverse tabnabbing"](https://owasp.org/www-community/attacks/Reverse_Tabnabbing) is the common security vulnerability that you enable if "noopener" is not set.  "noopener" is not supported by older browsers (looking at you IE), so many people put "noreferrer noopener" together since "noreferrer" also prevents opening.  I am not going to try to support IE for this site, so I'm happy enough using just "noopener" to prevent the phishing attack and let other websites know who referred them.

To have a link open in a new tab, you need to set another attribute in your link: `target="_blank"`.  So I wanted my final link to look like this:

```html
<a _ngcontent-bul-c98="" href="https://github.com/jeffschoonover416/jeffschoonover.dev-source"
style="text-decoration-line: underline;" rel="noopener" target="_blank">Github repository</a>
```

<br>

The easiest way I could think of to do this was by writing a simple Scully render plugin.  Render plugins make any changes to the html files that Scully renders after they are done rendering.  To change the link from the first one to the second, replace "rel="noreferrer noopener" with '"rel="noopener" target="_blank"'.  Here is the plugin I wrote:

```js
//modifyExternalLinks.js

const { registerPlugin } = require('@scullyio/scully');

function modifyExternalLinksPlugin (html) {

    html = html.replace(/rel="noreferrer noopener"/g, 'rel="noopener" target="_blank"');
    
    return (html);
};

const modifyExternalLinks = 'modifyExternalLinks';
registerPlugin('render', modifyExternalLinks, modifyExternalLinksPlugin);
module.exports.modifyExternalLinks = modifyExternalLinks;
```

<br>

It is really just one line of code doing all the work.  The search value needs to be a regular expression so you can add the global modifier and have replace all the instances in each file.  If you just put a normal string for the search value such as 'rel="noreferrer noopener"', it will only replace the first instance in each file.  The `replaceAll()` method works fine with a string on my computer, but Netlify did not like it one bit.

To use a plugin, it needs to be added to your Scully config file.  Here is mine as an example:

```js
//scully.<your-website>.config.ts

import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import { getHttp404Plugin } from '@gammastream/scully-plugin-http404';

const Http404Plugin = getHttp404Plugin();
const {DisableAngular} = require('scully-plugin-disable-angular');
const { removeScullyScripts } = require('./plugins/removeScullyScripts');
const { modifyExternalLinks } = require('./plugins/modifyExternalLinks');

import 'prismjs/components/prism-yaml.js';

const postRenderers = ['seoHrefOptimise', DisableAngular, removeScullyScripts, modifyExternalLinks, Http404Plugin];

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
```

<br>

## Adding an external link icon to the end of your external links

I got a nice icon from [Netlify Docs](https://docs.netlify.com/).  It is very easy to tell what is an external link and what is not on their site, although they count other Netlify sites as external and only docs.netlify.com domain as internal!  The icon is SVG, and could have been added in the same plugin I just wrote above.  However, I decided to put it into `styles.css` as that is more common.  Here is a [common css selector for external links](https://waaz.xyz/adding-external-link-indicator-with-css/) that takes advantage of the fact that they usually have a 'target="_blank"' attribute: `a[target="_blank"]::after { <css goes here> }`.  The `::after` says to use this css right after the selection (in our case, the icon is right after the link).  But the CSS is applied before any Scully plugins, so since we are adding 'target="_blank"' after the css has been applied, that won't work.  For my case, what makes the code of my external links different from internal is the presence of an "http" or "https".  My internal links are relative and do not have the full URL.  So my selectors were:

```css
/* styles.css */

a[href^="http://"]::after, a[href^="https://"]::after {
    
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='10' viewBox='0 0 11 10'%3E%3Cpolygon fill='black' points='12 5.038 6.962 10.066 5.668 8.772 8.502 5.961 0 5.961 0 4.116 8.502 4.116 5.691 1.282 6.984 0' transform='rotate(-40 6 5.033)'/%3E%3C/svg%3E");
    margin: 0 .15rem;
    
}
```

<br>

The icon itself is also in the above CSS snippet.  I got the SVG code for the icon by inspecting the element on Netlify's page.  It needs to be encoded into a URL to be put into the `content` property, which is easily done online.  I found [URL-encoder for SVG](https://yoksel.github.io/url-encoder/) to work really well.  This worked fine on my machine, but the icon was not rendered on the internet.  The reason was that the url was not in my Content Security Policy.  To get around this I did the more usual thing and put the SVG into a separate file in the `assets` folder, and then used a relative link in CSS.  With this approach I also went to the more common method of using background-image rather than content for the SVG (a COMPLETE and shameless copy of how Netlify does it).  Scully will copy the assets folder into the distribution, so that relative link should work in production.

```css
/* styles.css */

a[href^="http://"]::after, a[href^="https://"]::after {
    
    background-image: url(/assets/external-link-icon.svg);
    background-position-x: 50%;
    background-position-y: center;
    background-repeat: no-repeat;
    margin: 0 .15rem;
    padding-right: 0.65rem;
    content: "";
}
```

```html
<!-- external-link-icon.svg -->

<svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10">
  <polygon fill="black" fill-opacity="1" points="12 5.038 6.962 10.066 5.668 8.772 8.502 5.961 0 5.961 0 4.116 8.502 4.116 5.691 1.282 6.984 0" transform="rotate(-40 6 5.033)"/>
</svg>
```

<br>

These little details are the kind of thing I appreciate on other people's websites, so I'm happy I was able to learn about and incorporate them here without much trouble.  Happy coding!
