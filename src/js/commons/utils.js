function gregorian_to_jalali(gy, gm, gd) {
    var g_d_m, jy, jm, jd, gy2, days;
    g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    gy2 = (gm > 2) ? (gy + 1) : gy;
    days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
    jy = -1595 + (33 * ~~(days / 12053));
    days %= 12053;
    jy += 4 * ~~(days / 1461);
    days %= 1461;
    if (days > 365) {
        jy += ~~((days - 1) / 365);
        days = (days - 1) % 365;
    }
    if (days < 186) {
        jm = 1 + ~~(days / 31);
        jd = 1 + (days % 31);
    } else {
        jm = 7 + ~~((days - 186) / 30);
        jd = 1 + ((days - 186) % 30);
    }
    return [jy, jm, jd];
}

function jalali_to_gregorian(jy, jm, jd) {
    var sal_a, gy, gm, gd, days;
    jy += 1595;
    days = -355668 + (365 * jy) + (~~(jy / 33) * 8) + ~~(((jy % 33) + 3) / 4) + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
    gy = 400 * ~~(days / 146097);
    days %= 146097;
    if (days > 36524) {
        gy += 100 * ~~(--days / 36524);
        days %= 36524;
        if (days >= 365) days++;
    }
    gy += 4 * ~~(days / 1461);
    days %= 1461;
    if (days > 365) {
        gy += ~~((days - 1) / 365);
        days = (days - 1) % 365;
    }
    gd = days + 1;
    sal_a = [0, 31, ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (gm = 0; gm < 13 && gd > sal_a[gm]; gm++) gd -= sal_a[gm];
    return [gy, gm, gd];
}

String.prototype.toIndiaDigits = function () {
    var id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return this.replace(/[0-9]/g, function (w) {
        return id[+w]
    });
}

function customDebounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

function respondToVisibility(element, callback) {
    const options = {
        // root: document.body,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            callback(entry.intersectionRatio > 0);

        });
    }, options);

    observer.observe(element);
}


function currentBrackPoint() {
    const w = window.innerWidth;

    if (w < 640) return "NONE"
    if (640 <= w && w < 768) return "sm"
    if (768 <= w && w < 1024) return "md"
    if (1024 <= w && w < 1280) return "lg"
    if (1280 <= w && w < 1536) return "xl"
    if (1536 <= w) return "xl"

}



// class SVGAnimation {
//     animations = []
//     selector = ""
//     constructor(selector, callbackIN, callbackOUT) {
//         this.selector = selector;
//         if (document.querySelector(this.selector))
//             document.querySelector(this.selector).addEventListener("mouseenter", this.animatoinInProxy.bind(this))
//         else throw new Error("invalid selector")

//         this.callbackIN = callbackIN
//         this.callbackOUT = callbackOUT
//     }
//     animatoinOutProxy() {

//         this.animations.forEach(i => {

//             i.reverse()
//             i.loop = false;
//             i.play()
//             i.loopComplete = () => {
//                 i.pause()

//                 i.remove()

//             }
//             i.complete = () => {

//                 i.pause()

//                 i.remove()
//             }


//         })
//         this.animations.splice(1, this.animations.length)


//         if (this.callbackOUT)
//             this.callbackOUT(this.animations)
//     }
//     animatoinInProxy() {

//         const f1 = document.querySelector(this.selector)


//         const debouncedCalbackout = customDebounce(() => {
//             this.animatoinOutProxy()
//         }, 100)



//         f1.onmouseleave = () => {

//             debouncedCalbackout()
//             // this.callbackOUT(this.animations)
//         }

//         this.callbackIN(this.animations)
//     }

// }

/**
 * 
 * @param {number} index begin from
 * @param {Splider} slider splider instance
 */
function makeFullScreenSlider(slider, index = 0) {

    const parentDiv = document.createElement("div")
    parentDiv.classList.add("bisan-slider__gallery")
    const structure = `
    <button class="bisan-slider__x ">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24">
            <path fill="currentColor"
                d="M17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41L17.59 5Z" />
        </svg>
    </button>
    <div class="bisan-slider__slider"></div>
    `
    parentDiv.innerHTML = structure
    document.body.appendChild(parentDiv)


    const containerParentSelector = ".bisan-slider__gallery"
    const containerSelector = ".bisan-slider__slider"

    const container = document.querySelector(containerSelector)
    const parentContainer = document.querySelector(containerParentSelector)

    if (!parentContainer)
        throw new Error("there is no " + containerParentSelector + " selector")
    if (!container)
        throw new Error("there is no " + containerSelector + " selector")

    const allimages = slider.root.querySelectorAll(

        ".splide__slide img"
    )

    const mockup = `
        <div class="js-fullscreen-slider rounded-none" dir="ltr">
                <div class="splide__arrows hidden sm:block">
                    <button class="splide__arrow splide__arrow--prev">
                        <img src="svg/chevron-left.svg" alt="" />
                    </button>

                    <button class="splide__arrow splide__arrow--next">
                        <img src="svg/chevron-rigth.svg" alt="" />
                    </button>
                </div>

                <div class="splide__track">
        

                    <ul class="splide__list ">
                        ${[...allimages].map(img => (
        `<li class="splide__slide overflow-hidden rounded-2xl">
                                    <img class="w-full h-full object-cover"
                                        src="${img.src}" />
                                </li>`
    )).join("")
        }
                    </ul>
                </div>
            </div>
        `
    container.innerHTML = (mockup);
    parentContainer.style.display = "flex";
    const fss = new Splide(".js-fullscreen-slider", {

    })
    fss.on('mounted', () => {
        fss.go(index)
        parentContainer.style.opacity = "1";
    })

    fss.mount();



    document.querySelector(".bisan-slider__x").addEventListener("click", () => {
        parentContainer.style.opacity = "0";
        setTimeout(() => {
            fss.destroy()
            parentContainer.remove();
        }, 500);
    })


}