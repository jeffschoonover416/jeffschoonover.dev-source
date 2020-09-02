---
title: Code block syntax highlighting in Markdown files with Scully
description: Scully has built-in support for prism.js, a very popular code syntax highlighting package.  Learn how to incorporate it into your website and get your code blocks highlighted.
published: true
author: Jeff Schoonover
date: '2020-09-01'
---

If you have a blog in development using Scully and have written any posts that include code blocks, you will immediately miss the syntax highlighting that we take for granted in any editor.  Syntax highlighting makes code much easier to read.  For example, compare a line of javascript code without highlighting `return ((+new Date(postB['date'])) - (+new Date(postA['date'])));` to one with highlighting:

```js
return ((+new Date(postB['date'])) - (+new Date(postA['date'])));
```

The Scully dev team has made this feature very easy to enable by making it a built-in plugin.  The Github link to the [Scully md plugin](https://github.com/scullyio/scully/blob/main/docs/learn/plugins/built-in-plugins/md.md) has most of the details I will put here.  The plugin uses [prismjs](https://prismjs.com/), a popular, easy to use syntax highlighter that has several built in themes and is easy to customize.  The fastest way to choose a theme is to go to their website and start clicking on each theme name (inside circles on the right hand side).  I chose the Okaidia theme.  From there, edit your `scully.<project-name>.config.ts` file to import `setPluginConfig` from `@scullyio/scully` and set it to enable syntax highlighting:

```js
//scully.<project-name>.config.ts

import { ScullyConfig, setPluginConfig } from '@scullyio/scully';

setPluginConfig('md', { enableSyntaxHighlighting: true });

export const config: ScullyConfig = {
    ...
}
```

The only thing left to do is import your chosen prismjs theme into your `styles.css` file, which is in your src folder:

```css
/* styles.css */

/* check node_modules/prismjs/themes/ for the available themes */
@import '~prismjs/themes/prism-okaidia';
```

To use prism.js to highlight a code block in Markdown, enclose the block with 3 backticks "`" (next to the 1 on the keyboard) and put the language after the top set like this:

```
```javascript
// your code here
```
```

Happy coding!  