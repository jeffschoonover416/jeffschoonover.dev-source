---
title: How to create a click dropdown menu with Javascript in a Scully-Angular project with Angular disabled
description: How to create a click dropdown menu with Javascript in a Scully-Angular project with Angular disabled.  
published: true
author: 'Jeff Schoonover'
date: '2020-11-06'
slug: dropdown-menu-script-when-angular-disabled
tags:
  - jeffschoonover.dev
---

Once Angular is disabled, any Javascript that you need to actually run your website (not just build and render each page) will need to be added separately.  I learned from [Sam Vloeberghs source code](https://github.com/samvloeberghs/kwerri-oss/tree/master/projects/samvloeberghs/src) that one good way to do this is to add it directly to your project's `index.html` file.  The script will then be copied in each static page that Scully generates for your site (every route in the `scully-routes.json` file).

The only thing I need Javascript for right now is a dropdown menu.  And first I tried to see how easy it was to do with just CSS, but what I found online was that you have to get pretty complicated to get the behavior I was looking for, which is you click the button to open the menu, and then click anywhere outside the menu (including the button) to close it.  It is possible to do that with CSS, but you have to REALLY not want any javascript to add all that extra code in.

I'll show two ways of adding the dropdown menu with a little javascript.  The first is if inline event handlers are allowed e.g. `onclick=myFunction()`.  My content security policy disallows this so I implemented a second method that adds a click listener to a CSS class that I only use for the button.

## 1. Add a dropdown menu with an inline event handler

For this method, I am shamelessly copying the sample code from [W3 schools](https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_dropdown_navbar_click).

```html
<!-- dropdown menu - mine is in my toolbar.component.html file -->
<div fxFlex fxLayoutAlign="flex-end">
    <a class="valign-center dropBtn" onclick="dropMenu()" aria-label="menu link">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28px" height="28px" class="dropBtn">
            <path d="M0 0h24v24H0z" fill="none" class="dropBtn"/>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" class="dropBtn"/>
        </svg>
    </a>
    <div id="navDropdown" class="dropdown">
        <a [routerLink]="['/about']">About</a>
        <a [routerLink]="['/learn']">Learn in Public</a>
        <a [routerLink]="['/projects']">Projects</a>
    </div>
</div>
```

```css
/* styles.css - note the CSS classes in the above html */

.dropBtn { text-decoration: none;} /* The only reason for this class is to group the dropdown button elements for the event listener in the index.html file script */

.dropdown {
    display: none; /* menu is hidden to start */
    position: absolute;
    top: 45px; /* this drops the menu below the dropdown button */
    z-index: 500; /* menu will be on top when visible */
}

.show { display: block } /* when this class is added to the dropdown menu with the javascript function (below), it will become visible */
```

```html
<!-- index.html -->
<!-- NOTE: This code only works if inline event handlers are allowed
by the Content Security Policy.   -->

<!doctype html>
<html lang="en">
<head>
  <!-- headers taken out to save space -->
</head>
<body class="mat-typography">
  <app-root></app-root>
  <script>
    function dropMenu() { //whenever the button is clicked
      //toggle whether the dropdown menu is shown
      document.getElementById("navDropdown").classList.toggle("show");
    }
    
    //whenever anywhere in the window except the button is clicked
    window.onclick = function(event) {
      if (!event.target.matches('.dropBtn')) {
        document.getElementById('navDropdown').classList.remove("show");
      }
    }
  </script>
</body>
</html>
```

## 2. Add a click listener to a specific CSS class used only for the button

I am using an SVG icon inside a `<a>` block for my button, and I ran into the issue that if I set just my `<a>` element with the CSS class, clicks inside the `<a>` element on the SVG element or path would not register.  Even with the CSS class on the `<a>` and SVG elements (I think they were canceling themselves out?).  I found the solution at Chris Ferdinandi's website [Go Make Things](https://gomakethings.com/detecting-click-events-on-svgs-with-vanilla-js-event-delegation/).  Instead of using `event.target.matches` in the event listener, use `event.target.closest` to return True whenever you click within an element with the class:

```html
<!-- index.html -->
<script>
    document.addEventListener('click', function (event) {
	    if (event.target.closest('.dropBtn')) {
        document.getElementById('navDropdown').classList.toggle("show");
      } else {
        document.getElementById("navDropdown").classList.remove("show");
      }
    }, false);
  </script>
```

We will use the same html for the button as before *except* just remove the inline event handler because we will listen for clicks on the `dropBtn` class instead.  Notice now too that the SVG and path do not need the `dropBtn` class anymore because we use `event.target.closest` in the script.

```html
<!-- dropdown menu - mine is in my toolbar.component.html file -->
<div fxFlex fxLayoutAlign="flex-end">
            <div class="valign-center dropBtn" aria-label="menu link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28px" height="28px" class="dropBtn">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                </svg>
            </div>
            <div id="navDropdown" class="dropdown">
                <a [routerLink]="['/about']">About</a>
                <a [routerLink]="['/learn']">Learn in Public</a>
                <a [routerLink]="['/projects']">Projects</a>
            </div>
        </div>
```

```css
.dropdown {
    display: none;
    position: absolute;
    top: 45px;
    overflow: hidden;
    z-index: 500;
    background-color: white;
    box-shadow: 0px 0px 16px 0px rgba(0,0,0,0.2);
}

.show { display: block }

.dropBtn {
    cursor: pointer;
    color: white;
    float: left;
}
```

I hope this helps you add any javascript you need to your Scully site with Angular disabled!
