import { makeHidden, removeHidden } from "./modules/helper.js";

function init() {
    HandleEventListeners();

    function HandleEventListeners() {
        document.querySelector(".close").addEventListener("click", () => {
            makeHidden("#side_navigation");
            //removeHidden(".menu");
        })
        document.querySelector(".menu").addEventListener("click", () => {
            //makeHidden(".menu");
            removeHidden("#side_navigation");
        })
    }


}

init();