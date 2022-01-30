window.currentBrackPoint = () => {
    const w = window.innerWidth;

    if (w < 640) return "NONE"
    if (640 <= w && w < 768) return "sm"
    if (768 <= w && w < 1024) return "md"
    if (1024 <= w && w < 1280) return "lg"
    if (1280 <= w && w < 1536) return "xl"
    if (1536 <= w) return "xl"

}

String.prototype.toIndiaDigits = function () {
    var id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return this.replace(/[0-9]/g, function (w) {
        return id[+w]
    });
}

//main 


window.addEventListener('load', function () {

    new WOW({
        animateClass: 'animate__animated'
    }).init();

    // scale airplane
    (() => {

        const offsetTop = airplane.getBoundingClientRect().top + airplane.getBoundingClientRect().height - document.body.getBoundingClientRect().top  //airplane.y;//+ airplane.getBoundingClientRect().height;

        document.addEventListener('scroll', function (e) {

            const res = 1 - ((offsetTop - window.pageYOffset) / offsetTop)

            if (res < 1) {
                airplane.style.transform = `scale(${res / 2 + 1})`
            }

        })
    })()


    new Slider({
        containerSelectror: '.js-nowruz',
        nextSelector: '.js-slider-next',
        prvSelector: '.js-slider-prv',
        isBilateral: true
    });

    new Slider({
        containerSelectror: '.js-special-tours',
        nextSelector: '.js-next',
        prvSelector: '.js-prv',
        isBilateral: currentBrackPoint() === 'NONE' ? true : false,
    });




})



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


var fligthPicker = {
    showMem: false,
    showFrom: false,
    showDatePicker: false,
    toggleMem() {
        console.log(9999999)
        this.showDatePicker = false;
        this.showFrom = false;

        this.showMem = !this.showMem
    },
    toggleFrom() {
        this.showMem = false
        this.showDatePicker = false;

        this.showFrom = !this.showFrom
    },
    toggleDatePicker() {
        this.showMem = false
        this.showFrom = false;

        this.showDatePicker = !this.showDatePicker
    },
    days: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
    items: new Array(35).fill(0).map((_, i) => i),
    travelers: [
        {
            type: "adult",
            label: "بزرگسال",
            count: 0,
        },
        {
            type: "kid",
            label: "کودک",
            count: 0,
        },
        {
            type: "newborn",
            label: "نوزاد",
            count: 0,
        }
    ],
    travelType: 0,
    travelTypes: [
        'اکونومی', 'بیسنس', 'فرست کلاس'
    ],
    travelersInc(index) {
        this.travelers[index].count++
    },
    travelersDec(index) {
        this.travelers[index].count > 0 && this.travelers[index].count--
    },
    get totalTravelers() {
        let v = 0;
        this.travelers.forEach((i) => { v = v + i.count })
        console.log({ v })
        return v !== 0 ?
            String(v).toIndiaDigits() + "نفر"
            : " نفرات"
    }




}


var alpineCloud = {

    clouds: [],
    mouseX: 0,
    mousey: 0,
    init() {

        new Array(44).fill(0).forEach((_, i) => {
            const props = {
                name: i + 1,
                style: {
                    left: ~~(Math.random() * 100) + '%',
                    top: ~~(Math.random() * 50) + '%',
                    zIndex: (~~(Math.random() * 4) % 4 === 0) ? 10 : 0,
                },
                data: { depth: Math.random().toFixed(2) },

            }
            this.clouds.push(props)
        })

        document.addEventListener('alpine:initialized', () => {
            var scene = document.getElementById('cloud-scene');
            var parallaxInstance = new Parallax(scene);
        })

    },


}