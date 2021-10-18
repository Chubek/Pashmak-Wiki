//main.js holds all the main functions for Pashmak-Wiki
//Written by Chubak Bidpaa --- Coding started on 10/18/2021 5:00 PM
//Polyfill will be provided in main HTML file

import {makeFullPortal} from "./templates/portal_template";

const JSON_PORTAL_PATH = "../_portals";
const JSON_ARTICLE_PATH = "../_articles";

const MAIN_PORTAL_JSON = "portals_main.json";
const MAIN_ARTICLES_JSON = "articles_main.json";

const fetchJSON = (jsonPath, jsonName) => {
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

const makePor