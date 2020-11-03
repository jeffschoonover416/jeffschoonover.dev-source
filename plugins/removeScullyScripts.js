const { registerPlugin } = require('@scullyio/scully');

function removeScullyScriptPlugin (html) {

    const windowScript = new RegExp('<script>try {window[\\S\\s]*?<\\/script>');
    html = html.replace(windowScript, '');

    html = html.replace('<script id="ScullyIO-transfer-state"></script>', '');
    html = html.replace("<script>window['ScullyIO']='generated';</script>", '');

    return (html);

}

const removeScullyScripts = 'removeScullyScripts';
registerPlugin('render', removeScullyScripts, removeScullyScriptPlugin);
module.exports.removeScullyScripts = removeScullyScripts;