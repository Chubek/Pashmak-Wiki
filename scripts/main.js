//main.js holds all the main functions for Pashmak-Wiki
//Written by Chubak Bidpaa --- Coding started on 10/18/2021 5:00 PM
//Polyfill will be provided in main HTML file


const MAIN_PORTAL_JSON = "https://raw.githubusercontent.com/Chubek/Pashmak-Wiki/master/_portals/portals_main.json";
const MAIN_ARTICLES_JSON = "articles_main.json";

function htmlToElement(html) {
    let template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    const mainDiv = document.getElementById("main");
    mainDiv.appendChild(template.content.firstChild);
}

function htmlToElements(html)  {
    let template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.childNodes;
}

function makePortalTemplate(templateObj) {
    return `<div class="card ${window.cardClass}" style="width: 18rem;"> <img class="card-img-top" src="${templateObj.imgHeaderSrc}" alt="${templateObj.imgHeaderAlt}"> <div class="card-body"> <h5 class="card-title">${templateObj.portalName}</h5> <p class="card-text">${templateObj.portalDesc}</p></div>${templateObj.sampleList}<div class="card-body"> <a href="/portals/${templateObj.portalFileName}" class="card-link">Full Pages</a> </div></div>`
}

function makePortalSampleList(samples) {
    console.log(samples)
    let text = `<ul class="list-group list-group-flush  ${window.cardClass}">`;
    for (let i = 0; i < samples.length; i++) {
        text += `<li class="list-group-item "><a href="/articles/${samples[i].sampleArticleFileName}">${samples[i].sampleArticleTitle}</li>`;
    }

    text += `</ul>`

    return text

}

function makePortalsWelcome(welcomeObj) {
    return `<div class="card  ${window.cardClass}"> <div class="card-header"> Welcome to ${welcomeObj.wikiTitle} Wiki Portals Page! </div><div class="card-body"> ${welcomeObj.description}</div></div>`
}


function makePortalGrid(tempsList) {
    const colNum = tempsList.length >= 3? 3 : tempsList.length;

    let text = `<div class="container">`;

    for (let i = 0; i < tempsList.length; i += colNum) {
        text += `<div class="row">`;

        for (let j = 0; j < colNum; j++) {
            if (i + j == tempsList.length) {
                continue
            }

            text += `<div class="col">${tempsList[i + j]}</div>`;
        }
    }

    text += `</div>`;

    return text
    
}

function makeFullPortal(portal) {
    console.log(portal.sampleArticles)
    let sampArticles = makePortalSampleList(portal.sampleArticles);

    delete portal.sampleArtilcles;

    portal.sampleList = sampArticles;

    return makePortalTemplate(portal)
}

function makePortalMain(mainPortalJSON) {
    let text = `<div id="mainPortalsDiv" class="${window.mainPortalClass}">`;

    text += `<br>` + makePortalsWelcome(mainPortalJSON.welcomeObjc);

    console.log(mainPortalJSON.portalList)

    let allTemps = mainPortalJSON.portalList.map(x => makeFullPortal(x));

    let tempsGrid = makePortalGrid(allTemps);

    text += `<br>` + tempsGrid;

    text += `</div>`;

    return text;
}

function parseAndCreateMainPortal() {
    let req = new Request(MAIN_PORTAL_JSON);

    fetch(req)
        .then(response => {           
           response.json()
            .then(data => {
                console.log(data);
                const portalGrid = makePortalMain(data);
                console.log(portalGrid);
                const htmlRes = htmlToElement(portalGrid);
                console.log(htmlRes);
            })
        })
    

}