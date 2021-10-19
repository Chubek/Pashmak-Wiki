//main.js holds all the main functions for Pashmak-Wiki
//Written by Chubak Bidpaa --- Coding started on 10/18/2021 5:00 PM
//Polyfill will be provided in main HTML file

import {makePortalMain} from "./templates/portal_template";
import {htmlToElement, fetchJSON} from "./helpers/utils"


const JSON_PORTAL_PATH = "../_portals";
const JSON_ARTICLE_PATH = "../_articles";

const MAIN_PORTAL_JSON = "portals_main.json";
const MAIN_ARTICLES_JSON = "articles_main.json";



const parseAndCreateMainPortal = () => {
    let mainPortalJson = fetchJSON(JSON_PORTAL_PATH, MAIN_PORTAL_JSON);

    let portalGrid;

    if (!mainPortalJson) {
        portalGrid = `<div><b>ERROR CREATING PORTAL</b></div>`;
    } else {
        portalGrid = makePortalMain(mainPortalJson);
    }

    return htmlToElement(portalGrid);
    


}