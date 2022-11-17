import { makeHidden, removeHidden } from "./modules/helper.js";

function init() {
    HandleEventListeners();

    function HandleEventListeners() {
        document.querySelector(".close").addEventListener("click", () => {
            makeHidden("#side_navigation");
        })
        document.querySelector(".menu").addEventListener("click", () => {
            removeHidden("#side_navigation");
        })
    }


}

init();