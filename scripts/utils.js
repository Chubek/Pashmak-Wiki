
export const htmlToElement = (html) => {
    let template = document.createElement('template');
    html = `<div class=${window.themeClass}">` + html.trim() + `</div>`;
    template.innerHTML = html;
    const mainDiv = document.getElementById("main");
    mainDiv.appendChild(template.content.firstChild);
}

export const htmlToElements = (html) => {
    let template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.childNodes;
}
