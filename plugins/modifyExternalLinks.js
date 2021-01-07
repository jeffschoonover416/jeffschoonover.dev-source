const { registerPlugin } = require('@scullyio/scully');

function modifyExternalLinksPlugin (html) {

    //by default, only external links have noreferrer noopener.  This opens external links in a new tab
    //and lets the site know where the link is coming from.  since "noopener" is still there, there is 
    //no threat of tabnabbing
    html = html.replace(/rel="noreferrer noopener"/g, 'rel="noopener" target="_blank"');
    
    return (html);
};

const modifyExternalLinks = 'modifyExternalLinks';
registerPlugin('render', modifyExternalLinks, modifyExternalLinksPlugin);
module.exports.modifyExternalLinks = modifyExternalLinks;