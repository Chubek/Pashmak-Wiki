const htmlToElement = (html) => {
    let template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

const htmlToElements = (html) => {
    let template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.childNodes;
}
