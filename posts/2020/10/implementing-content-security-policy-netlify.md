---
title: Implementing a Content Security Policy on Netlify
description: How to implement a content security policy on Netlify using the Netlify.toml file
published: true
author: Jeff Schoonover
slug: implementing-content-security-policy-netlify
date: '2020-10-04'
---

## Implementing a Content Security Policy on Netlify

For the syntax and general guide to Netlify headers, I followed this [article on http headers](https://simonhearne.com/2019/http-headers-fast-and-secure/) by Simon Hearne.  

To test different policies, I used Netlify's preview build feature.  If you create a new branch on your Github repository that is connected to Netlify to build your site, Netlify will automatically build a preview site for you with a random link.  Just log in to your Netlify account to find it.

The Simon Hearne article has a good discussion and links about the idea of logging and reporting any issues with your CSP.  This can help you make sure that your CSP is set up correctly and also see any attacks that are being rejected.  [Report-uri](https://report-uri.com/) was really easy to set up and gives the correct headers to paste into your CSP.  The `Report-To` and `NEL` (network error logging) headers are copied from my report-uri setup.

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
    
    Report-To: {
        "group":"default",
        "max_age":31536000,
        "endpoints":[{"url":"https://jeffschoonover.report-uri.com/a/d/g"}],
        "include_subdomains":true
    }
    NEL: {
        "report_to":"default",
        "max_age":31536000,
        "include_subdomains":true
    }
    Content-Security-Policy = '''
    default-src 'none';
    report-uri https://jeffschoonover.report-uri.com/r/d/csp/enforce;
    report-to report-uri;'''

```

