//main.js holds all the main functions for Pashmak-Wiki
//Written by Chubak Bidpaa --- Coding started on 10/18/2021 5:00 PM
//Polyfill will be provided in main HTML file

import {
    makePortalMain,
    makeSubPortalMain,
    makeFullPage
} from "./templates.js"
import {
    MAIN_PORTAL_JSON,
    PORTALS_PATTH,
    MAIN_ARTICLES_JSON
} from "../constants.js"



export const parseAndCreateMainPortal = () => {
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


export const parseAndCreateSubPortal = (portalFile) => {
    let req = new Request(PORTALS_PATTH + portalFile + ".json");

    fetch(req)
        .then(response => {
            response.json()
                .then(data => {
                    console.log(data);
                    const portalGrid = makeSubPortalMain(data);
                    console.log(portalGrid);
                    const htmlRes = htmlToElement(portalGrid);
                    console.log(htmlRes);
                })
        })


}


export const createPage = (articleName) => {
    let req = new Request(MAIN_ARTICLES_JSON);

    fetch(req)
        .then(response => {
            response.json()
                .then(data => {
                    console.log(data)
                    makeFullPage(data[articleName]);
                    console.log("Article created.")
                })
        })


}