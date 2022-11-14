
function makeHidden(selector) {
    const element = document.querySelector(selector)
    element.classList.add("hidden");
}

function removeHidden(selector) {
    const element = document.querySelector(selector)
    element.classList.remove("hidden");
}

export {makeHidden, removeHidden}