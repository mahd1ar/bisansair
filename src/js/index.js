window.currentBrackPoint = () => {
    const w = window.innerWidth;

    if (w < 640) return "NONE"
    if (640 <= w && w < 768) return "sm"
    if (768 <= w && w < 1024) return "md"
    if (1024 <= w && w < 1280) return "lg"
    if (1280 <= w && w < 1536) return "xl"
    if (1536 <= w) return "xl"

}


class Slider {
    currentSliderIndex = undefined;
    maxAmount = undefined;
    selector = undefined;
    isBilateral
    constructor({ containerSelectror, nextSelector, prvSelector, isBilateral = true }) {
        this.isBilateral = isBilateral

        this.selector = containerSelectror + ' [data-card-id]';
        const cardsLen = document.querySelectorAll(
            this.selector
        ).length;
        this.currentSliderIndex = isBilateral ? ~~(cardsLen / 2) : cardsLen - 1;
        this.maxAmount = cardsLen;

        this._calcPosition();

        document
            .querySelector(containerSelectror + ' ' + nextSelector)
            .addEventListener('click', () => {
                this.next();
            });

        document
            .querySelector(containerSelectror + ' ' + prvSelector)
            .addEventListener('click', () => {
                this.prv();
            });
    }

    next() {
        this.currentSliderIndex =
            (this.currentSliderIndex + 1) % this.maxAmount;
        this._calcPosition();
    }

    prv() {
        this.currentSliderIndex =
            this.currentSliderIndex - 1 > -1
                ? this.currentSliderIndex - 1
                : this.maxAmount - 1;
        this._calcPosition();
    }

    _calcPosition() {
        const cards = document.querySelectorAll(this.selector);

        const selectedCard = this.currentSliderIndex;

        // cards.forEach((card) => {
        //     const id = Number(card.dataset.cardId);
        //     const margin = selectedCard - id;
        //     const absMargin = Math.abs(selectedCard - id);
        //     const distanse = ['sm', 'NONE'].includes(currentBrackPoint()) ? 40 : 120;
        //     const opacity = ['sm', 'NONE'].includes(currentBrackPoint()) ? 0.40 : 0.25;
        //     card.style.transform = `translateX(${margin * distanse
        //         }px) scale(${1 - absMargin * 0.1})`;

        //     if (absMargin === 0) card.style.zIndex = 10;
        //     else card.style.zIndex = 9;

        //     card.style.opacity = 1 - absMargin * opacity;
        // });

        cards.forEach((card) => {
            const id = Number(card.dataset.cardId);
            const margin = selectedCard - id;
            const absMargin = Math.abs(selectedCard - id);
            const distanse = ['sm', 'NONE'].includes(currentBrackPoint()) ? 40 : ['md'].includes(currentBrackPoint()) ? 80 : 120;
            const opacity = ['sm', 'NONE'].includes(currentBrackPoint()) ? 0.40 : 0.25;
            card.style.transform = `translateX(${(this.isBilateral ? 1 : -1) * margin * distanse}px) scale(${1 - (this.isBilateral ? absMargin : margin) * 0.1})`;

            if (absMargin === 0) card.style.zIndex = 10;
            else card.style.zIndex = 9;

            card.style.opacity = this.isBilateral ? 1 - absMargin * opacity : id > selectedCard ? 0 : 1 - absMargin * opacity;
        });
    }
}


var fligthPicker = {

    showFrom: false,
    showDatePicker: false,
    toggleFrom() {
        this.showDatePicker = false;
        this.showFrom = !this.showFrom
    },
    toggleDatePicker() {
        this.showFrom = false;
        this.showDatePicker = !this.showDatePicker
    },
    days: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
    items: new Array(35).fill(0).map((_, i) => i)


}