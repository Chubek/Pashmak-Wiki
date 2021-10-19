export const htmlToElement = (html) => {
    let template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

export const htmlToElements = (html) => {
    let template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.childNodes;
}


export const fetchJSON = (jsonPath, jsonName) => {
    let req = new Request(`${jsonPath}/${jsonName}`)

    fetch(req)
        .then(response => {
            if (!response.ok) {
                console.log("Problem fetching json " + `${jsonPath}/${jsonName}`);
                return false
            }
            return response;
        })
}