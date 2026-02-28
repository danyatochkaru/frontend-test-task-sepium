const mainEl = document.querySelector("main");
const templateCard = document.querySelector("#card");
const templateSlide = document.querySelector("#slide");

const onClickCardHandler = (e) => {
    if (e.target.tagName !== "A" && e.target.tagName !== "BUTTON") {
        window.open('/card', "_blank");
    }
}

if ("content" in document.createElement("template")) {
    for (let i = 0; i < 5; i++) {
        const clone = templateSlide.content.cloneNode(true);

        templateCard.content.querySelector('.splide__list').appendChild(clone);
    }

    for (let i = 0; i < 6; i++) {
        const clone = templateCard.content.cloneNode(true);

        mainEl.appendChild(clone);
    }

    mainEl.childNodes.forEach((el) => {
        el.addEventListener("click", onClickCardHandler);
    });
}