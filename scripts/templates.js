import {
    ARTICLES_PATH
} from "../constants"



const makePortalTemplate = (templateObj) => {
    return `<div class="card" style="width: 18rem;"> <img class="card-img-top" src="${templateObj.imgHeaderSrc}" alt="${templateObj.imgHeaderAlt}"> <div class="card-body"> <h5 class="card-title">${templateObj.portalName}</h5> <p class="card-text">${templateObj.portalDesc}</p></div>${templateObj.sampleList}<div class="card-body"> <a href="#portals:${templateObj.portalFileName}" class="card-link">Full Pages</a> </div></div>`
}

const makePortalSampleList = (samples) => {
    console.log(samples)
    let text = `<ul class="list-group list-group-flush ">`;
    for (let i = 0; i < samples.length; i++) {
        text += `<li class="list-group-item "><a href="#articles:${samples[i].sampleArticleFileName}">${samples[i].sampleArticleTitle}</a></li>`;
    }

    text += `</ul>`

    return text

}

const makePortalsWelcome = (welcomeObj) => {
    return `<div class="card "> <div class="card-header"> Welcome to ${welcomeObj.wikiTitle} Wiki Portals Page! </div><div class="card-body"> ${welcomeObj.description}</div></div>`
}


const makeAllGrid = (tempsList) => {
    const colNum = tempsList.length >= 3 ? 3 : tempsList.length;

    let text = `<div class="container">`;

    for (let i = 0; i < tempsList.length; i += colNum) {
        text += `<div class="row">`;

        for (let j = 0; j < colNum; j++) {
            if (i + j == tempsList.length) {
                continue
            }

            text += `<div class="col">${tempsList[i + j]}</div>`;
        }

        text += `</div>`
    }

    text += `</div>`;

    return text

}

const makeFullPortal = (portal) => {
    console.log(portal.sampleArticles)
    let sampArticles = makePortalSampleList(portal.sampleArticles);

    delete portal.sampleArtilcles;

    portal.sampleList = sampArticles;

    return makePortalTemplate(portal)
}

export const makePortalMain = (mainPortalJSON) => {
    let text = `<div id="mainPortalsDiv">`;

    text += `<br>` + makePortalsWelcome(mainPortalJSON.welcomeObjc);

    console.log(mainPortalJSON.portalList)

    let allTemps = mainPortalJSON.portalList.map(x => makeFullPortal(x));

    let tempsGrid = makeAllGrid(allTemps);

    text += `<br>` + tempsGrid;

    text += `</div>`;

    return text;
}



const makeSubPortalTemplate = (subPortalObj) => {
    return `<div class="card" style="width: 18rem;"> <div class="card-body"> <h5 class="card-title">${subPortalObj.subPortalTitle}</h5> <p class="card-text">${subPortalObj.subPortalDesc}</p></div>${subPortalObj.subPortalList}</div>`
}

const makePortalSampleList = (pages) => {
    let text = `<ul class="list-group list-group-flush ">`;
    for (let i = 0; i < pages.length; i++) {
        text += `<li class="list-group-item "><a href="#articles:${pages[i].pageFile}">${pages[i].pageName}</a></li>`;
    }

    text += `</ul>`

    return text

}

const makeFullSubPortal = (subPortal) => {
    let pages = makePortalSampleList(subPortal.pages);

    delete subPortal.pages;

    subPortal.subPortalList = pages;

    return makeSubPortalTemplate(subPortal)
}

const makePortalsHeader = (headerObj) => {
    return `<div class="card "> <div class="card-header">${headerObj.portalName}</div><div class="card-body"> ${headerObj.portalDesc}</div></div>`
}


export const makeSubPortalMain = (mainSubPortalJSON) => {
    let text = `<div id="mainPortalsDiv">`;

    text += makePortalsHeader({
        "portalName": mainSubPortalJSON.portalName,
        "portalDesc": mainSubPortalJSON.portalDesc
    })

    let allTemps = mainSubPortalJSON.subPortals.map(x => makeFullSubPortal(x));

    let tempsGrid = makeAllGrid(allTemps);

    text += tempsGrid;

    text += `</div>`;

    return text;
}



const makeFooter = (tagsArr, portalsArr) => {
    console.log(window);
    console.log(window.location.hash);
    let mPortals = `<div>`;
    let tags = `<div>`;

    for (let i = 0; i < tagsArr.length; i++) {
        tags += `<a  href="#tags:${tagsArr[i]}"><span class="badge bg-secondary">${tagsArr[i]}</span></a>&emsp;`;
    }

    for (let i = 0; i < portalsArr.length; i++) {
        mPortals += `<a href="#portals:${portalsArr[i].portalFile}" class="btn btn-primary">${portalsArr[i].portalName}</a>&emsp;`;
    }

    mPortals += `</div>`;
    tags += `</div>`;

    return `<div class="card"> <div class="card-header"> Tags & Member Portals </div><div class="card-body"> ${tags}<hr> ${mPortals}</div></div>`
}


export const makeFullPage = (dataObj) => {
    console.log(dataObj)
    let text = `<div>`

    text += `<div class="card"> <div class="card-header">${dataObj.articleName}</div><div class="card-body"> ${dataObj.articleDesc}</div></div>`;

    const footer = makeFooter(dataObj.tags, dataObj.articlePortals);
    console.log(footer)
    let req = new Request(ARTICLES_PATH + dataObj.markdownFile);

    var md = window.markdownit();

    fetch(req)
        .then(response => {
            response.text()
                .then(data => {
                    const txtMd = md.render(data);
                    const articleMeat = `<div class="${window.articleClass}">${txtMd}</div>`;
                    text += articleMeat + footer;
                    let res = htmlToElement(text);

                    console.log(res);
                })
        })

}