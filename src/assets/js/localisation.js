import { eventListenerPopup } from "./modules/popup.js";
import {setColorScheme} from "./modules/helper.js";

function init() {
    setColorScheme();
    eventListenerPopup();
}

init();