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

        const recalc = customDebounce(() => {
            this._calcPosition
            console.log("calc position")
        }, 1000)

        window.addEventListener("resize", () => {
            recalc()
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

        cards.forEach((card, id) => {
            const margin = selectedCard - id;
            const absMargin = Math.abs(selectedCard - id);
            const distanse = ['sm', 'NONE'].includes(currentBrackPoint()) ? 40 : ['md'].includes(currentBrackPoint()) ? 80 : 120;
            const opacity = ['sm', 'NONE'].includes(currentBrackPoint()) ? 0.40 : 0.25;
            card.style.transform = `translateX(${(this.isBilateral ? 1 : -1) * margin * distanse}px) scale(${1 - (this.isBilateral ? absMargin : margin) * 0.1})`;
            card.style.transitionDuration = '400ms'
            if (absMargin === 0) {
                card.style.pointerEvents = "auto"
            }
            else {
                card.style.pointerEvents = "none"
            }
            card.style.zIndex = 10 - Math.abs(margin);
            const imgopacity = this.isBilateral ? 1 - absMargin * opacity : id > selectedCard ? 0 : 1 - absMargin * opacity;

            console.log(margin, imgopacity)
            card.querySelector('img').style.opacity = imgopacity;
            if (imgopacity <= 0)
                card.style.display = "none";
            else
                card.style.display = "block";

        });
        console.log("====")
    }
}
