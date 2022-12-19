export function eventListenerPopup() {
    document.querySelectorAll(".help").forEach(help => {
        help.addEventListener("click", showPopup);
    });

    document.querySelectorAll(".popup .close").forEach(close => {
        close.addEventListener("click", hidePopup);
    })
}

function showPopup(e) {
    const popupId = e.target.dataset.help;
    const $popup = document.querySelector(`#popup-${popupId}`);
    $popup.classList.remove("hidden");
    addBlur();
}

function hidePopup(e) {
    const $target = e.target;
    const $popup = $target.closest(".popup");
    $popup.classList.add("hidden");
    removeBlur();
}

function addBlur() {
    const $body = document.querySelector("body");
    $body.classList.add("blur");
}

function removeBlur() {
    const $body = document.querySelector("body");
    $body.classList.remove("blur");
}