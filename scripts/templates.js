import {
    ARTICLES_PATH
} from "../constants.js"
import {
    htmlToElement
} from "./utils.js"


const makePortalTemplate = (templateObj) => {
    return `<div class="card" style="width: 18rem;"> <img class="card-img-top" src="${templateObj.imgHeaderSrc}" alt="${templateObj.imgHeaderAlt}"> <div class="card-body"> <h5 class="card-title">${templateObj.portalName}</h5> <p class="card-text">${templateObj.portalDesc}</p></div>${templateObj.sampleList}<div class="card-body"> <a href="#portals:${templateObj.portalFileName}" class="card-link">Full Pages</a> </div></div>`
}

const makePortalSampleList = (samples) => {
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
    let sampArticles = makePortalSampleList(portal.sampleArticles);

    delete portal.sampleArtilcles;

    portal.sampleList = sampArticles;

    return makePortalTemplate(portal)
}

export const makePortalMain = (mainPortalJSON) => {
    let text = `<div id="mainPortalsDiv">`;

    text += `<br>` + makePortalsWelcome(mainPortalJSON.welcomeObjc);


    let allTemps = mainPortalJSON.portalList.map(x => makeFullPortal(x));

    let tempsGrid = makeAllGrid(allTemps);

    text += `<br>` + tempsGrid;

    text += `</div>`;

    return text;
}



const makeSubPortalTemplate = (subPortalObj) => {
    return `<div class="card" style="width: 18rem;"> <div class="card-body"> <h5 class="card-title">${subPortalObj.subPortalTitle}</h5> <p class="card-text">${subPortalObj.subPortalDesc}</p></div>${subPortalObj.subPortalList}</div>`
}

const makeSubPortalSampleList = (pages) => {
    let text = `<ul class="list-group list-group-flush ">`;
    for (let i = 0; i < pages.length; i++) {
        text += `<li class="list-group-item "><a href="#articles:${pages[i].pageFile}">${pages[i].pageName}</a></li>`;
    }

    text += `</ul>`

    return text

}

const makeFullSubPortal = (subPortal) => {
    let pages = makeSubPortalSampleList(subPortal.pages);

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

    return `<div id="footer" class="card"> <div class="card-header"> Tags & Member Portals </div><div class="card-body"> ${tags}<hr> ${mPortals}</div></div>`
}


const makeSettings = () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16"><path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/></svg>`

    const btnSettings = `<button type="button" class="btn btn-outline-dark settingsButtonCLass" onclick="revealSettings()">${svg}</button>`

    const fontSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  class="bi bi-file-earmark-font" viewBox="0 0 16 16"> <path  d="M10.943 6H5.057L5 8h.5c.18-1.096.356-1.192 1.694-1.235l.293-.01v5.09c0 .47-.1.582-.898.655v.5H9.41v-.5c-.803-.073-.903-.184-.903-.654V6.755l.298.01c1.338.043 1.514.14 1.694 1.235h.5l-.057-2z" /> d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" /></svg>`
    const plusSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/> </svg>`

    const fontsHtml = `<div class="btn-group"> <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"> ${fontSVG}Font </button> <ul class="dropdown-menu"> <li><a class="dropdown-item articleFontTimesNewRoman" href="#font:articleFontTimesNewRoman">${plusSVG}Times New Roman</a></li><li><a class="dropdown-item articleFontTrebuchetMS" href="#fonts:articleFontTrebuchetMS">${plusSVG}Trebuchet MS</a> </li><li><a class="dropdown-item articleFontArial" href="#fonts:articleFontArial">${plusSVG}Arial</a></li><li><a class="dropdown-item articleFontGeorgia" href="#fonts:articleFontGeorgia">${plusSVG}Georgia</a></li><li><a class="dropdown-item articleVerdana" href="#fonts:articleVerdana">${plusSVG}Verdana</a></li></ul> </div>`

    const sizeSVG = `<svg width="40" height="40 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"> <g fill="#4d4d4d"> <path d="m132.77 118.03l-27.945-27.945c6.735-9.722 10.1-20.559 10.1-32.508 0-7.767-1.508-15.195-4.523-22.283-3.01-7.089-7.088-13.199-12.221-18.332-5.133-5.133-11.242-9.207-18.33-12.221-7.09-3.01-14.518-4.522-22.285-4.522-7.767 0-15.195 1.507-22.283 4.522-7.089 3.01-13.199 7.088-18.332 12.221-5.133 5.133-9.207 11.244-12.221 18.332-3.01 7.089-4.522 14.516-4.522 22.283 0 7.767 1.507 15.193 4.522 22.283 3.01 7.088 7.088 13.197 12.221 18.33 5.133 5.134 11.244 9.207 18.332 12.222 7.089 3.02 14.516 4.522 22.283 4.522 11.951 0 22.787-3.369 32.509-10.1l27.945 27.863c1.955 2.064 4.397 3.096 7.332 3.096 2.824 0 5.27-1.032 7.332-3.096 2.064-2.063 3.096-4.508 3.096-7.332.0001-2.877-1-5.322-3.01-7.331m-49.41-34.668c-7.143 7.143-15.738 10.714-25.787 10.714-10.05 0-18.643-3.572-25.786-10.714-7.143-7.143-10.714-15.737-10.714-25.786 0-10.05 3.572-18.644 10.714-25.786 7.142-7.143 15.738-10.714 25.786-10.714 10.05 0 18.643 3.572 25.787 10.714 7.143 7.142 10.715 15.738 10.715 25.786 0 10.05-3.573 18.643-10.715 25.786" transform="matrix(.12844.00838-.00838.12844 3.051 1.494)"/> <path d="m415-51h2v2h2v2h-2v2h-2v-2h-2v-2h2v-2" color="#bebebe" transform="translate(-406.1 57.52)" enable-background="new"/> </g> </svg>`

    const fontSizeHtml = `<div class="btn-group"> <button type="button" class="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"> ${sizeSVG}Font Size </button> <ul class="dropdown-menu"> <li><a class="dropdown-item fontSizeXLarge" href="#fontSize:fontSizeXLarge">${plusSVG}X-Large</a></li><li><a class="dropdown-item fontSizeLarge" href="#fontSize:fontSizeLarge">${plusSVG}Large</a> </li><li><a class="dropdown-item fontSizeMedium" href="#fontSize:fontSizeMedium">${plusSVG}Medium</a></li><li><a class="dropdown-item fontSizeSmall" href="#fontSize:fontSizeSmall">${plusSVG}Small</a></li><li><a class="dropdown-item fontSizeXSmall" href="#fontSize:fontSizeXSmall">${plusSVG}X-Small</a></li></ul> </div>`

    const easelSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-easel" viewBox="0 0 16 16"> <path d="M8 0a.5.5 0 0 1 .473.337L9.046 2H14a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1.85l1.323 3.837a.5.5 0 1 1-.946.326L11.092 11H8.5v3a.5.5 0 0 1-1 0v-3H4.908l-1.435 4.163a.5.5 0 1 1-.946-.326L3.85 11H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4.954L7.527.337A.5.5 0 0 1 8 0zM2 3v7h12V3H2z"/> </svg>`

    const colorHtml = ` <div class="btn-group"> <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"> ${easelSVG}Color </button> <ul class="dropdown-menu"> <li><a class="dropdown-item fontColorBlackOnWheat" href="#fontColor:fontColorBlackOnWheat">${plusSVG}Black on Wheat</a></li><li><a class="dropdown-item fontColorWheatOnBlack" href="#fontColor:fontColorWheatOnBlack">${plusSVG}Wheat on Black</a> </li><li><a class="dropdown-item fontColorSilkOnGray" href="#fontColor:fontColorSilkOnGray">${plusSVG}Silk on Gray</a></li><li><a class="dropdown-item fontColorBlackOnSilk" href="#fontSize:fontColorBlackOnSilk">${plusSVG}Black on Silk</a></li></ul> </div>`

    const xSVG = ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-octagon" viewBox="0 0 16 16"> <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"/> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/> </svg>`
    
    const settingsHtml = `<div id="toggleSettings" class="noneDisplay"> <span type="button" style="position: relative; left:90%; top:5%;" onclick="revealSettings()">${xSVG}</span><br> ${fontsHtml}<hr> ${fontSizeHtml}<hr> ${colorHtml}</div>`

    return { settingsHtml, btnSettings }
}

export const makeFullPage = (dataObj) => {
    let text = `<div>`

    text += `<div class="card"> <div class="card-header">${dataObj.articleName}</div><div class="card-body"> ${dataObj.articleDesc}</div></div>`;

    const footer = makeFooter(dataObj.tags, dataObj.articlePortals);
    let req = new Request(ARTICLES_PATH + dataObj.markdownFile);

    var md = window.markdownit();
    var cls = window.articleClass; 
    fetch(req)
        .then(response => {
            response.text()
                .then(data => {
                    const txtMd = md.render(data);
                    const { settingsHtml, btnSettings } = makeSettings();
                    const articleMeat = `<div class="${cls}">${btnSettings} ${settingsHtml} ${txtMd}</div>`;
                    text += articleMeat + footer;
                    let res = htmlToElement(text);

                })
        })

}

const makeTagsHeader = (headerObj) => {
    return `<div class="card "> <div class="card-header">${headerObj.tagPageTitle}</div><div class="card-body"> ${headerObj.tagPageDesc}</div></div>`
}

const makeTagsArticleList = (articles) => {
    let text = `<ul class="list-group list-group-flush ">`;
    for (let i = 0; i < articles.length; i++) {
        text += `<li class="list-group-item "><a href="#articles:${articles[i].pageFile}">${articles[i].pageName}</a></li>`;
    }

    text += `</ul>`

    return text

}

const makeTagsTemplate = (tagObj) => {
    return `<div class="card" style="width: 18rem;"> <div class="card-body"> <h5 class="card-title">${tagObj.tagName}</h5> <p class="card-text">${tagObj.tagDesc}</p></div>${tagObj.articleList}</div>`
}

const makeTagsCard = (tagsJson) => {
    let articles = makeTagsArticleList(tagsJson.articles);

    delete tagsJson.articles;

    tagsJson.articleList = articles;

    return makeTagsTemplate(tagsJson)
}


export const makeFullTags = (fullTagsJson) => {
    let text = `<div class="tagsPage">`;

    text += makeTagsHeader(fullTagsJson);

    text += fullTagsJson.tags.map(x => makeTagsCard(x));

    text += `</div>`

    return text
}