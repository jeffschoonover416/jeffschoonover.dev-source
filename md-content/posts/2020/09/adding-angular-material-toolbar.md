---
title: Adding a responsive Angular Material toolbar to your website
description: How to add a responsive Angular Material toolbar to the top of your website 
published: true
author: Jeff Schoonover
slug: adding-a-responsive-angular-material-toolbar
date: '2020-09-03'
---

## Adding a responsive Angular Material toolbar to your website

Follow [the guide](https://material.angular.io/guide/getting-started) to add Angular Material to your Angular app.  Once it is added, you will import every component you actually use individually in `src/app/material.module.ts`.  I have found that when something isn't working, it is often because I haven't imported it correctly.  The [Angular Material components](https://material.angular.io/components/categories) page has all the components and instructions on exactly how to import them to your project.

In addition to adding Angular Material, you should also add [Angular Flex-Layout](https://github.com/angular/flex-layout).  This will make it easier to layout the toolbar and make it Responsive to different screen sizes (i.e. mobile).  Installation instructions and usage documentation at the link above are excellent.

You can view all my current code for jeffschoonover.dev at the [Github repo](https://github.com/jeffschoonover416/jeffschoonover.dev-source).  Here are some important things to note:

- `material.module.ts` - here are the imports.  The nice thing about Angular Material modules is that the naming is self-explanatory!  All 3 of these are used in the toolbar.

```js
import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatMenuModule
    ],
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatMenuModule
    ],
    providers: [],
    bootstrap: []
  })
  export class MaterialModule { }
```

- `app.component.html` - we'll go through this in detail below.

```html
<mat-toolbar class="mat-elevation-z10" color="primary" fxLayout="row">
    <div>
        <a class="valign-center" mat-icon-button [routerLink]="['']">
            <mat-icon>home</mat-icon>
            <div style="margin-left:5px;">Jeff Schoonover</div>
        </a> 
    </div>
    <div fxFlex fxLayout="row" fxLayoutAlign="flex-end" fxHide.xs>
        <ul fxLayout fxLayoutGap="20px" class="menu-items">
            <li><a [routerLink]="['/about']">About</a></li>
            <li><a [routerLink]="['/learn']">Learn in Public</a></li>
            <li><a [routerLink]="['/projects']">Projects</a></li>
        </ul>
    </div>
    <div fxFlex fxLayout="row" fxLayoutAlign="flex-end" fxHide.gt-xs>
        <a class="valign-center" mat-icon-button [matMenuTriggerFor]="menu" aria-label="additional links">
            <mat-icon>more_vert</mat-icon>
        </a>
        <mat-menu #menu="matMenu">
            <button mat-menu-item [routerLink]="['/about']">About</button>
            <button mat-menu-item [routerLink]="['/learn']">Learn in Public</button>
            <button mat-menu-item [routerLink]="['/projects']">Projects</button>
        </mat-menu>
    </div>
</mat-toolbar>
<router-outlet></router-outlet>
```

OK, let's take things a little at a time.

```html
<mat-toolbar class="mat-elevation-z10" color="primary" fxLayout="row">
```

The `mat-elevation-z10` class gives the toolbar its shadow.  Background at the [Angular Material Elevation](https://material.angular.io/guide/elevation) documentation and the [Material Design Elevation](https://material.io/design/environment/elevation.html) specification.  I used a lower elevation on the blog post cards on the home page so it would look natural to have them scroll under the toolbar.  `color="primary"` is an Angular Material feature.  Each theme has primary and accent colors.  Of course you can customize these.  The [Angular Material Theming](https://material.angular.io/guide/theming) page has more info.  `fxLayout="row"` uses the Flex Layout module to have a horizontal layout for items in the toolbar.

```html
<div>
    <a class="valign-center" mat-icon-button [routerLink]="['']">
        <mat-icon>home</mat-icon>
        <div style="margin-left:5px;">Jeff Schoonover</div>
    </a> 
</div>
```

I wanted to have the home icon and the text share the hyperlink.  It took some searching to figure out what was going on with the Angular Material icon not seeming to line up with the text.  It is a [known issue](https://github.com/google/material-design-icons/issues/206) with the icons.  The link has the solution I ended up using, with the `class="valign-center"`.  Here is the CSS:

```css
.valign-center {
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
}
```

```html
<div fxFlex fxLayout="row" fxLayoutAlign="flex-end" fxHide.xs>
    <ul fxLayout fxLayoutGap="20px" class="menu-items">
        <li><a [routerLink]="['/about']">About</a></li>
        <li><a [routerLink]="['/learn']">Learn in Public</a></li>
        <li><a [routerLink]="['/projects']">Projects</a></li>
    </ul>
</div>
```

This div is aligned at "flex-end" so it goes all the way to the right hand side of the toolbar.  `fxHide.xs` says to hide this div on an extra-small screen (with the next div we will show an icon with these links instead).  The "menu-items" class (see full CSS below) turns off the bullet points that would normally accompany an unordered list.

```html
<div fxFlex fxLayout="row" fxLayoutAlign="flex-end" fxHide.gt-xs>
    <a class="valign-center" mat-icon-button [matMenuTriggerFor]="menu" aria-label="additional links">
        <mat-icon>more_vert</mat-icon>
    </a>
    <mat-menu #menu="matMenu">
        <button mat-menu-item [routerLink]="['/about']">About</button>
        <button mat-menu-item [routerLink]="['/learn']">Learn in Public</button>
        <button mat-menu-item [routerLink]="['/projects']">Projects</button>
    </mat-menu>
</div>
```

This div replaces the list with a menu icon for phone screens (`fxHide.gt-xs` hides this menu on any screen greater than extra small).  The syntax is taken straight from the Basic Menu example in the [Angular Material Menu](https://material.angular.io/components/menu/examples) documentation.  If you are on a desktop, make your window narrow to see the effect.

- `app.component.scss`

```css
.valign-center {
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
}

a {
  text-decoration: none;
  color: white;
}

a:hover, a:active {
  color: lightgray;
}

.menu-items {
  margin: 0;
  padding: 0;
  list-style: none;
}

mat-toolbar {
  position: sticky;
  position: -webkit-sticky;
  top: 0px;
  z-index: 999;
}
```

The styling on the `a` and `a:hover, a:active` links was important for the list items in the toolbar.  `text-decoration: none` turns off the underline that is normally associated with a hyperlink.  The `mat-toolbar` styles are intended to keep the toolbar hovering at the top of the screen even as you scroll down.

That's it!  Hope this was super helpful for you as you customize your own toolbar.  E-mail me with any questions or comments and happy coding!
