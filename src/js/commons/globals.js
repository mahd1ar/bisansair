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

        this.selector = containerSelectror + ' [data-card-item]';
        const cardsLen = document.querySelectorAll(
            this.selector
        ).length;
        if (cardsLen === 0)
            throw new Error("BI::no card selected")
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

        const swappable = document.querySelector(containerSelectror + " .js-swappable")

        if (swappable) {

            var hammertime = new Hammer(
                swappable
                , { direction: Hammer.DIRECTION_HORIZONTAL });
            hammertime.on('swipeleft swiperight', ev => {
                if (ev.type === "swiperight") this.next()
                else this.prv()
            });
        }

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

        cards.forEach((card, id) => {

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
