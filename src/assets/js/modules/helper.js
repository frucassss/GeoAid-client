export function makeHidden(selector) {
    const element = document.querySelector(selector)
    element.classList.add("hidden");
}

export function removeHidden(selector) {
    const element = document.querySelector(selector)
    element.classList.remove("hidden");
}

export function selectClickedCategory(func, selector) {
    document.querySelectorAll("aside li").forEach(li => {
        li.addEventListener("click", function (ev) {

            document.querySelectorAll("aside li").forEach(li => {
                li.classList.remove("selected");
            });
            const currentTarget = ev.currentTarget;
            currentTarget.classList.add("selected");

            const oldTitle = document.querySelector(selector);
            const newTitle = currentTarget.querySelector("p").innerText;
            oldTitle.innerText = newTitle;

            func();
        })
    })
}