
export function makeHidden(selector) {
    const element = document.querySelector(selector)
    element.classList.add("hidden");
}

export function removeHidden(selector) {
    const element = document.querySelector(selector)
    element.classList.remove("hidden");
}