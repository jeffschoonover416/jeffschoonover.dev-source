---
title: Get much faster load times on your Scully static website with the Scully Plugin Disable Angular
description: null
published: true
author: 'Jeff Schoonover'
slug: scully-plugin-disable-angular
date: '2020-11-03'
---

## Get much faster load times on your Scully static website with the Scully Plugin Disable Angular

It was time to finally disable Angular on this website.  The only thing Angular was doing (once the site was built and deployed) was toggle a dropdown menu button.  That is overkill for the performance hit the site was taking by bootstrapping Angular on top of the static site.  Also, every time I added a new post I had to change the hash in the [Content Security Policy](/posts/2020/10/implementing-content-security-policy-netlify/) for the Scully Transfer State script that gives the Angular app the necessary data to render the site.  True, I did this to myself with a strict CSP, but how much simpler life would be if this simple blog was truly just a static site!

Disabling Angular was the easy part.  Sam Vloeberghs has written a Scully plugin called [Scully Plugin Disable Angular](https://www.npmjs.com/package/scully-plugin-disable-angular), and written an [article about disabling Angular](https://samvloeberghs.be/posts/disabling-angular-when-statically-generating-with-scully/) on his website.  It was straightforward to add to my app and those links should be the first on your list to read if you are thinking of doing it.  

The next thing to do was take out the ScullyTransferState from my app, which was a reverse of the code in my [ScullyTransferState post](/posts/2020/09/scully-transfer-state-implementation/).  The CSP could also be tightened down since the static site doesn't use sandboxes and doesn't need any scripts except the one I need to write for the drop-down menu (next post).  Current CSP:

```bash
[build]
  command = "npm run jam-prod"
  publish = "dist/static"

[[headers]]
  # Set the default header to the one we want for documents
  for = "/*"
    [headers.values]
    
    Report-To = '''{
        "group":"default",
        "max_age":31536000,
        "endpoints":[{"url":"https://jeffschoonover.report-uri.com/a/d/g"}],
        "include_subdomains":true
    }'''
    NEL = '''{
        "report_to":"default",
        "max_age":31536000,
        "include_subdomains":true
    }'''
    Feature-Policy = "camera 'none'; geolocation 'none'; microphone 'none'"
    X-Content-Type-Options = "nosniff"
    Content-Security-Policy = '''
      default-src 'none';
      connect-src 'self';
      script-src none 'sha256-uTzNGAvPVDl5Wz0rR3r5KeuxP82SC0gkXvCRJnk1chc=';
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      font-src https://fonts.gstatic.com;
      img-src 'self' https://res.cloudinary.com;
      base-uri 'self';
      form-action 'none';
      frame-ancestors 'none';
      report-uri https://jeffschoonover.report-uri.com/r/d/csp/enforce;
      report-to report-uri;'''
```

The Lighthouse score for jeffschoonover.dev is now 100.  It is a simple site, so there was no reason to have it be slow.

Happy Coding!
