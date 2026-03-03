const mainEl = document.querySelector("main");
const templateCard = document.querySelector("#card");
const templateSlide = document.querySelector("#slide");
const templateVariant = document.querySelector("#variant");

class Card {
    constructor(template, sliders = [], variants = []) {
        this.template = template
        this.clone = this.#getClone(template)
        this.sliders = sliders
        this.variants = variants
    }

    onClickHandler(e) {
        if (e.target.tagName !== "A" && e.target.tagName !== "BUTTON") {
            window.open('/card', "_blank");
        }
    }

    onClickLikeHandler(e) {
        if (e.target.tagName === "BUTTON" && e.target.classList.contains('card_actions_like')) {
            e.target.classList.toggle('card_actions_like--active');
            const isActive = e.target.classList.contains('card_actions_like--active');
            const count = +e.target.querySelector('span').textContent;
            e.target.querySelector('span').textContent = isActive ? count + 1 : count - 1;
        }
    }

    #getClone(template = this.template) {
        return document.importNode(template.content, true);
    }

    #loadVariants() {
        const varsList = this.clone.querySelector('.card_vars_list');

        for (const index in this.variants) {
            const variantClone = this.#getClone(templateVariant);
            variantClone.querySelector('.card_vars_item span').textContent = this.variants[index];

            if (+index === 0) {
                variantClone.querySelector('.card_vars_item').classList.add('card_vars_item--active');
            }

            varsList.appendChild(variantClone)
        }

        varsList.querySelectorAll('li button').forEach(i =>
            i.addEventListener("click", (e) => {
                varsList.querySelector('.card_vars_item--active').classList.remove('card_vars_item--active');
                e.target.classList.add('card_vars_item--active');
            })
        )
    }

    #loadSliders() {
        for (const slide of this.sliders) {
            const cloneSlide = this.#getClone(templateSlide);
            cloneSlide.querySelector('img').src = slide;
            cloneSlide.querySelector('a').href = slide;

            this.clone.querySelector('.splide__list').appendChild(cloneSlide);
        }
    }

    init() {
        if (!this.template) {
            throw new Error("Template not found");
        }

        this.#loadSliders();
        this.#loadVariants();

        mainEl.appendChild(this.clone);
        mainEl.lastElementChild.addEventListener("click", this.onClickHandler);
        mainEl.lastElementChild.querySelector('.card_actions_like').addEventListener("click", this.onClickLikeHandler);
    }
}

if ("content" in document.createElement("template")) {
    for (let i = 0; i < 6; i++) {
        const card = new Card(
            templateCard,
            ['assets/slide.png', 'assets/slide.png', 'assets/slide.png', 'assets/slide.png', 'assets/slide.png', 'assets/slide.png'],
            ['ПВХ', 'Эмаль', 'Пластик', 'Массив'],
        );
        card.init();
    }
}