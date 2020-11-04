---
title: 'Create a dropdown menu with Javascript after using the Scully plugin Disable-Angular'
description: null
published: false
author: 'Jeff Schoonover'
date: '2020-10-27'
slugs:
    - ___UNPUBLISHED___kgvqiiz9_AqR7aNM03qLx0yKTaMVOsp3ZqgkfZjzc

---
shameless copying of W3 schools
https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_dropdown_navbar_click



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
    function dropMenu() {
      document.getElementById("navDropdown").classList.toggle("show");
    }
    
    window.onclick = function(event) {
      if (!event.target.matches('.dropBtn')) {
        document.getElementById('navDropdown').classList.remove("show");
      }
    }
  </script>
</body>
</html>
```

```html
<!-- dropdown menu -->
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
/* styles.css */

.dropBtn { text-decoration: none;} /* The only reason for this class is to group the dropdown button elements for the event listener */

.dropdown {
    display: none; /* menu is hidden to start */
    position: absolute;
    top: 45px; /* this drops the menu below the dropdown button */
    z-index: 500; /* menu will be on top when visible */
}

.show { display: block } /* when this class is added to the dropdown menu with the javascript function, it will become visible */
```

js in index html
the html for the event listener
the css

Refused to execute inline event handler

https://gomakethings.com/detecting-click-events-on-svgs-with-vanilla-js-event-delegation/


