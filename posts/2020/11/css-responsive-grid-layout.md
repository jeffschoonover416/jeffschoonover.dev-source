---
title: Control the way your website looks on mobile with CSS grid layout
description: You do not have to use javascript to adjust your content with window size.  Learn how to do it with CSS grid
published: true
author: 'Jeff Schoonover'
date: '2020-11-14'
tags:
    - jeffschoonover.dev
slug: css-responsive-grid-layout
---

## Control the way your website looks on mobile with CSS grid layout

I currently have 2 lists of blog posts (one on the topic of this website, and the other on plans for an app) that I am showing at the same time, and want to control when the lists are side by side (on a desktop with plenty of horizontal space), and when they are on top of each other (on a phone).  When I disabled Angular on this website, the [Angular Flex Layout](https://github.com/angular/flex-layout) media queries stopped working.  Which is understandable!  CSS to the rescue, again.  CSS Tricks has an excellent article by Juan Martin Garcia on [making responsive layouts without media queries](https://css-tricks.com/look-ma-no-media-queries-responsive-layouts-using-css-grid/).  Following that tutorial, I was able to set how the page adjusts for screen width.  The lists are all enclosed in one `<div>` with the CSS class "blog-posts".  Here is the CSS for that class in `styles.css`:

```css
/* styles.css */
.blog-posts {
    margin: auto;
    max-width: 1200px;
    width: 80%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
    gap: 1rem;
}
```

- `margin: auto` centers the content within its container
- `max-width: 1200px` sets the maximum width of the entire `<div>` to 1200px, which allows plenty of room for multiple columns on a desktop screen (each column has one list of posts)
- `width: 80%` sets the width of the content to 80% of its container.  I found this to give good margins on a phone screen
- `display: grid` use the CSS grid for the layout
- `grid-template-columns` sets how to make the grid.  "repeat" means the setting will be the same for each , so they will be the same width.  But we don't know ahead of time how many columns there are because we don't know the screen size.  That is where "auto-fit" comes in.  It will sets the number of columns dynamically based on the next argument, which uses the minmax() function to set the minimum and maximum widths of each column.  1fr is 1 fractional width, which is 100% of the available width which is set above to 1200px.  As soon as the columns need to shrink below 275px, the grid-template-columns will remove one column and place it on a second row of the grid.
- `gap: 1rem` is the gap between the columns.  REM units are the width of a letter of the root font size.

Happy Coding!