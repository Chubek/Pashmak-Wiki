const makePortalTemplate = (templateObj) => {
    return `<div class="card ${window.cardClass}" style="width: 18rem;"> <img class="card-img-top" src="${templateObj.imgHeaderSrc}" alt="${templateObj.imgHeaderAlt}"> <div class="card-body"> <h5 class="card-title">${portalName}</h5> <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p></div>${templateObj.sampleList}<div class="card-body"> <a href="/portals/${templateObj.portalFileName}" class="card-link">Full Pages</a> </div></div>`
}

const makePortalSampleList = (samples) => {
    let text = `<ul class="list-group list-group-flush  ${window.cardClass}">`;

    for (sampleArticleName in samples) {
        text += `<li class="list-group-item "><a href="/articles/${sampleArticleName.sampleArticleFileName}">${sampleArticleName.sampleArticleTitle}</li>`;
    }

    text += `</ul>`

    return text

}

const makePortalsWelcome = (welcomeObj) => {
    return `<div class="card  ${window.cardClass}"> <div class="card-header"> Welcome to ${welcomeObj.wikiTitle} Wiki Portals Page! </div><div class="card-body"> ${welcomeObj.description}</div></div>`
}


const makePortalGrid = (tempsList) => {
    const colNum = tempsList.length >= 3? 3 : tempsList.length;

    let text = `<div class="container">`;

    for (const i = 0; i < tempsList.length; i += colNum) {
        text += `<div class="row">`;

        for (const j = 0; j < colNum; j++) {
            if (i + j == tempsList.length) {
                continue
            }

            text += `<div class="col">${tempsList[i + j]}</div>`;
        }
    }

    text += `</div>`;

    return text
    
}

const makeFullPortal = (portal) => {
    let sampArticles = portal.sampleArticles.map(x => makePortalSampleList(x)).join();

    delete portal.sampleArtilcles;

    portal.sampleList = sampArticles;

    return makePortalTemplate(portal)
}

export const makePortalMain = (mainPortalJSON) => {
    let text = `<div id="mainPortalsDiv" class="${window.mainPortalClass}">`;

    text += `<br>` + makePortalsWelcome(mainPortalJSON.welcomeObj);

    let allTemps = mainPortalJSON.portalList.map(x => makeFullPortal(x));

    let tempsGrid = makePortalGrid(allTemps);

    text += `<br>` + tempsGrid;

    text += `</div>`;

    return text;
}