---
title: Code block syntax highlighting in Markdown files with Scully
description: Scully has built-in support for prism.js, a very popular code syntax highlighting package.  Learn how to incorporate it into your website and get your code blocks highlighted.
published: true
author: Jeff Schoonover
slug: code-block-syntax-highlighting-in-markdown-with-scully
date: '2020-09-01'
tags:
  - jeffschoonover.dev
---

As I started writing posts that included lines of code, I immediately missed the syntax highlighting that we take for granted in any editor and on most coding websites.  Syntax highlighting makes code much easier to read.  For example, compare a line of javascript code without highlighting `return ((+new Date(postB['date'])) - (+new Date(postA['date'])));` to one with highlighting:

```js
return ((+new Date(postB['date'])) - (+new Date(postA['date'])));
```

The Scully dev team has made this feature very easy to enable by making it a built-in plugin.  The Github link to the [Scully md plugin](https://github.com/scullyio/scully/blob/main/docs/Reference/plugins/built-in-plugins/md.md) has the authoritative details.  The plugin uses [prismjs](https://prismjs.com/), a popular, easy to use syntax highlighter that has several built in themes and is easy to customize.  The fastest way to choose a theme is to go to their website and start clicking on each theme name (inside circles on the right hand side).  I chose the Okaidia theme.  From there, edit your `scully.<project-name>.config.ts` file to import `setPluginConfig` from `@scullyio/scully` and set it to enable syntax highlighting:

```js
//scully.<project-name>.config.ts

import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import 'prismjs/components/prism-yaml.js';

setPluginConfig('md',  { enableSyntaxHighlighting: true });

export const config: ScullyConfig = {
    ...
}
```

The only thing left to do is import your chosen prismjs theme into your `styles.css` file, which is in your src folder.  Be sure to put the import (and all other imports) at the very top of the file before any other css:

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

*Note* Currently prism.js has syntax support for 234 languages.  Scully does not ship with all these languages, so you may find you need to import a language on occasion.  To do this, find the `.js` file of the language you need in the `node_modules/prismjs/components` folder and import it at the top of your `scully.<project>.config.ts` file.  I found that I had to import YAML, and you can see the import line in my config file above.  There is a discussion about this on the Scully Gitter at [August 21, 2020](https://gitter.im/scullyio/community?at=5f402c28ec534f584fb25217).

Happy coding!  