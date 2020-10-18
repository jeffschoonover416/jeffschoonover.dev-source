---
title: Implementing a Content Security Policy on Netlify
description: How to implement a content security policy on Netlify using the Netlify.toml file
published: true
author: Jeff Schoonover
slug: implementing-content-security-policy-netlify
date: '2020-10-15'
---

## Implementing a Content Security Policy on Netlify

For the syntax and general guide to Netlify headers, I followed this [article on http headers](https://simonhearne.com/2019/http-headers-fast-and-secure/) by Simon Hearne.  

To test different policies, I used Netlify's preview build feature.  If you create a new branch on your Github repository that is connected to Netlify to build your site, Netlify will automatically build a preview site for you with a random link.  Just log in to your Netlify account to find it.  The localhost servers will not take the `netlify.toml` file into account to enforce the CSP.

The Hearne article has a good discussion and links about the idea of logging and reporting any issues with your CSP.  This can help you make sure that your CSP is set up correctly and also see any attacks that are being rejected.  [Report-uri](https://report-uri.com/) was really easy to set up and gives the correct headers to paste into your CSP.  The `Report-To` and `NEL` (network error logging) headers are copied from my report-uri.com setup.

My first trial CSP was to shut everything off, just to see exactly how reporting would work and how the site would look.  My expectation is that I would not have my Cloudinary pictures or the i-frame on the email sign up page:

```bash
# netlify.toml 1st iteration

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
    Content-Security-Policy = '''
    default-src 'none';
    report-uri https://jeffschoonover.report-uri.com/r/d/csp/enforce;
    report-to report-uri;'''
```

Wow, this worked exactly as it was supposed to.  Absolutely everything was blocked except for the raw HTML.  With that test completed, I added in scripts and styles from 'self', images from Cloudinary, and fonts from Google.  I also made sure to set a policy for the non-fetch directives since they don't use `default-src` as a fallback (source for this list is this [Google CSP article](https://developers.google.com/web/fundamentals/security/csp), and the descriptions are from [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)): 

- base-uri - restricts the URLs which can be used in a document's <base> element. If this value is absent, then any URI is allowed.
- form-action - Restricts the URLs which can be used as the target of a form submissions from a given context.
- frame-ancestors - Specifies valid parents that may embed a page with frames.  After reading on the internet about how vulnerable frames are, I took my i-frame out of my website.
- plugin-types - Restricts the set of plugins that can be embedded into a document by limiting the types of resources which can be loaded.  [The plugin-types directive is only used if you are allowing plugins with object-src, so I do not need it]
- report-uri - Instructs the user agent to report attempts to violate the Content Security Policy. These violation reports consist of JSON documents sent via an HTTP POST request to the specified URI.
- sandbox - Enables a sandbox for the requested resource.  Angular uses sandboxes and I had to allow scripts.  I also had to `allow-same-origin` so that routing would work and the CSP would allow the site to write to the browser history.  Navigation needs to come from the same origin, and default is to provide a unique origin to the sandbox.

Most of the below came from making allowances until CSP stopped blocking (the browser console lets you know exactly what was blocked and what CSP change would allow loading) and the whole site loaded.  For example, `connect-src` is required for the `scully-routes.json` file.  

```bash
# netlify.toml 2nd iteration

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
    Content-Security-Policy = '''
    default-src 'none';
    connect-src 'self';
    script-src 'self' 'sha256-qWkjXenVA+7n3jmaobevJVEkmjqeTL5bZFOIzf8OFG4=' 'sha256-JXy9GK9Sb50pLJz2b9lcBOflxoQuinKD1LXvTSon+AI=';
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    base-uri 'self';
    font-src https://fonts.gstatic.com;
    img-src https://res.cloudinary.com;
    form-action 'none';
    frame-ancestors 'none';
    sandbox allow-scripts allow-same-origin;
    report-uri https://jeffschoonover.report-uri.com/r/d/csp/enforce;
    report-to report-uri;'''
```

I learned a little more about specifying the `style-src` through experimenting.  Angular/Scully uses inline CSS for performance.  So you can specify `unsafe-inline`, but that is not recommended for security reasons.  I thought you could manually allow each inline style by adding its hash.  If you just put `self`, check the console in Chrome, and then add allow the hashes in `style-src` it will not work for every hash.  This is because some of the hashes are inline style attributes `<p style="color:green">This is a paragraph.</p>`and others are actual `<style>` elements.  This helpful [Stackoverflow post on style CSP hashes](https://stackoverflow.com/questions/52724956/why-doesnt-chrome-respect-my-content-security-policy-hashes) explains that you can use a hash to allow `<style>` elements but not the attributes.  

There are currently two inline scripts from Scully (one checks to see if Scully has been generated, and the other is the TransferState) whose hashes needed to be added to the CSP.  Since the state includes all the routes for the site, the transfer state script will change every time I write a new post.  The thought of updating the CSP every time I add a new post is giving new urgency to disabling Angular for this site and really minimizing Javascript!

Happy Coding!
