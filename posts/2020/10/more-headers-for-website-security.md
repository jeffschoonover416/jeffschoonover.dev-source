---
title: More headers for website security
description: There are additional headers for website security besides the Content Security Policy!  These include X-Content-Type-Options, X-Frame-Options, and X-XSS-Protection headers
published: true
author: Jeff Schoonover
slug: more-headers-for-website-security
date: '2020-10-16'
---

## More headers for website security

There are additional headers for website security besides the Content Security Policy!  These include X-Content-Type-Options, X-Frame-Options, and X-XSS-Protection headers.  These were all recommended for my website by the [Mozilla Observatory](https://observatory.mozilla.org/) and let's see what they are (links below are to the Mozilla definitions).

1. [X-Content-Type-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options): This header only has 1 directive: `nosniff`.  It tells the browser not to try to figure out the type of document (html, jpg, pdf, etc) it is looking at, but trust the file headers instead.  Without this, hackers could figure out clever ways of fooling the browser into turning a file into executable code for them.  The `nosniff` also enables [Cross-Origin Read Blocking](https://developers.google.com/web/updates/2018/07/site-isolation#corb) protection, which prevents hackers from sneaking in data or code into unrelated tags such as `<img>`.

2. [X-Frame-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options): "The X-Frame-Options HTTP response header can be used to indicate whether or not a browser should be allowed to render a page in a `<frame>`, `<iframe>`, `<embed>` or `<object>`."  That is the Mozilla definition.  Since I have none of these tags on my site any longer, I would set it to `deny`.

3. [X-XSS-Protection](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection): This header allows the browser to use its XSS detection capabilities to filter out XSS attacks.  But it does not seem to be in use much any more because the act of auditing and detection was in itself a vulnerability.  Check out the [Chrome XSS auditor removal notice(https://www.chromestatus.com/feature/5021976655560704) for more info.

Now for the good news - after implementing my Content Security Policy, but before adding any of these headers, I re-scanned by site at the Mozilla Observatory and got an A+.  The audit said that `X-Frame-Options` is not needed for me anymore since I have `frame-ancestors` in the CSP, and X-XSS-Protection is not needed since I have a strong CSP.  So I added #1 and am moving on.

The last HTTP header I want to add is another one covered in [Simon Hearne's 2019 post on headers](https://simonhearne.com/2019/http-headers-fast-and-secure/): `Feature-Policy`.  This header prevents an attacker from accessing the microphone, camera, and geolocation on your site:

```bash
Feature-Policy = "camera 'none'; geolocation 'none'; microphone 'none'"
```
