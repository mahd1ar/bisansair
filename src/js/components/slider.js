
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;


var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';


var reTrim = /^\s+|\s+$/g;


var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;


var reIsBinary = /^0b[01]+$/i;

var reIsOctal = /^0o[0-7]+$/i;

var reIsUint = /^(?:0|[1-9]\d*)$/;

var freeParseInt = parseInt;

var objectProto = Object.prototype;


var objectToString = objectProto.toString;

var nativeCeil = Math.ceil,
    nativeMax = Math.max;


function baseRange(start, end, step, fromRight) {
    var index = -1,
        length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
        result = Array(length);

    while (length--) {
        result[fromRight ? length : ++index] = start;
        start += step;
    }
    return result;
}


function createRange(fromRight) {
    return function (start, end, step) {
        if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
            end = step = undefined;
        }
        // Ensure the sign of `-0` is preserved.
        start = toFinite(start);
        if (end === undefined) {
            end = start;
            start = 0;
        } else {
            end = toFinite(end);
        }
        step = step === undefined ? (start < end ? 1 : -1) : toFinite(step);
        return baseRange(start, end, step, fromRight);
    };
}


function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length &&
        (typeof value == 'number' || reIsUint.test(value)) &&
        (value > -1 && value % 1 == 0 && value < length);
}

function isIterateeCall(value, index, object) {
    if (!isObject(object)) {
        return false;
    }
    var type = typeof index;
    if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
    ) {
        return eq(object[index], value);
    }
    return false;
}

function eq(value, other) {
    return value === other || (value !== value && other !== other);
}


function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
}


function isFunction(value) {
    var tag = isObject(value) ? objectToString.call(value) : '';
    return tag == funcTag || tag == genTag;
}


function isLength(value) {
    return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}


function isObject(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
}



function isObjectLike(value) {
    return !!value && typeof value == 'object';
}

function isSymbol(value) {
    return typeof value == 'symbol' ||
        (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

function toFinite(value) {
    if (!value) {
        return value === 0 ? value : 0;
    }
    value = toNumber(value);
    if (value === INFINITY || value === -INFINITY) {
        var sign = (value < 0 ? -1 : 1);
        return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
}

function toNumber(value) {
    if (typeof value == 'number') {
        return value;
    }
    if (isSymbol(value)) {
        return NAN;
    }
    if (isObject(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject(other) ? (other + '') : other;
    }
    if (typeof value != 'string') {
        return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return (isBinary || reIsOctal.test(value))
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : (reIsBadHex.test(value) ? NAN : +value);
}

var range = createRange();





class Slider {
    state = undefined;
    selector = undefined;
    isBilateral

    maxCartCount = 7;
    sideCardsCount = 2
    taraz = 2

    marginDict = {
        "NONE": [40, 40],
        "sm": [40, 40],
        "md": [50, 80],
        "lg": [90, 120],
        "xl": [120, 120],
    }

    opacityDict = {
        "NONE": 0.4,
        "sm": 0.4,
        "md": 0.25,
        "lg": 0.25,
        "xl": 0.25,
    }

    constructor({ containerSelectror, nextSelector, prvSelector, isBilateral = true, sideCardsCount }) {

        if (sideCardsCount) {
            this.sideCardsCount = sideCardsCount;
            this.taraz = sideCardsCount;
        }

        this.isBilateral = isBilateral

        this.selector = containerSelectror + ' [data-card-item]';
        const cardsLen = document.querySelectorAll(
            this.selector
        ).length;
        if (cardsLen === 0)
            throw new Error("BI::no card selected")
        // this.state = isBilateral ? ~~(cardsLen / 2) : cardsLen - 1;
        this.state = 0;
        this.maxCartCount = cardsLen;

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
            this._calcPosition()
        }, 1000)

        window.addEventListener("resize", () => {
            recalc()
        });

    }

    next() {
        this.state++
        this._calcPosition();
    }

    prv() {
        this.state--
        this._calcPosition();
    }

    _calcPosition() {

        const cards = [...document.querySelectorAll(this.selector)];
        const selectedCard = this.state;


        let LEdge = this.sideCardsCount + this.state
        let REdge = this.state - this.sideCardsCount

        if (LEdge === this.maxCartCount) {
            LEdge -= this.maxCartCount
            REdge -= this.maxCartCount
            this.state = this.state - this.maxCartCount
        }

        if (REdge === this.maxCartCount * -1) {
            REdge += this.maxCartCount
            LEdge += this.maxCartCount
            this.state = this.state + this.maxCartCount
        }


        cards.forEach(i => i.style.opacity = 0)

        range(REdge, LEdge + 1).forEach((item, id) => {

            let margin = (this.taraz - id);

            const absMargin = Math.abs(margin);
            const distanse = ['sm', 'NONE'].includes(currentBrackPoint()) ? 40 : ['md'].includes(currentBrackPoint()) ? 80 : 120;
            const opacity = ['sm', 'NONE'].includes(currentBrackPoint()) ? 0.40 : 0.25;


            cards.at(item).style.transitionDuration = '400ms'
            if (absMargin === 0) {
                cards.at(item).style.pointerEvents = "auto"
            } else {
                cards.at(item).style.pointerEvents = "none"
            }

            cards.at(item).style.zIndex = 10 - Math.abs(margin);

            const imgopacity = this.isBilateral ?
                1 - absMargin * opacity :
                item > this.state ? 0 : 1 - absMargin * opacity;

            cards.at(item).querySelector('img').style.opacity = imgopacity;

            if (imgopacity <= 0) {

                this._calc_diamon(cards, item, margin, absMargin, distanse)
                cards.at(item).style.opacity = 0;
                setTimeout(() => {
                    cards.at(item).style.display = "none";
                }, 170);
            } else {
                cards.at(item).style.display = "block";
                setTimeout(() => {
                    this._calc_diamon(cards, item, margin, absMargin, distanse)
                    cards.at(item).style.opacity = 1;
                }, 10);
            }

        });

    }

    _calc_diamon(cards, item, margin, absMargin) {

        const distanse = this.marginDict[currentBrackPoint()][+this.isBilateral]
        const scaleMargin = {
            "NONE": [0.1, 0.1],
            "sm": [0.1, 0.1],
            "md": [0.2, 0.1],
            "lg": [0.1, 0.1],
            "xl": [0.1, 0.1],
        }

        const scale = scaleMargin[currentBrackPoint()][+this.isBilateral]


        const X = (this.isBilateral ? 1 : -1) * margin * distanse;
        const S = 1 - (this.isBilateral ? absMargin : margin) * scale;

        cards.at(item).style.transform = `translate3d(${X}px ,0px ,0px) scale(${S})`;

    }
}