
var expandable = {
    expanded: false,
    isExpandable: false,
    _divHeight: 0,
    _lines: 0,
    _lineHeight: 0,
    get maxHeight() {
        if (this.expanded)
            return this._divHeight + 'px'
        else
            return (this._lineHeight * 4) + 'px'


    },
    init() {

        const el = this.$refs.description;
        this._divHeight = el.offsetHeight
        this._lineHeight = parseInt(getComputedStyle(el).lineHeight);
        this._lines = this._divHeight / this._lineHeight;

        if (this._lines > 4)
            this.isExpandable = true
        else
            this.expanded = true
    },
    toggle() {
        this.expanded = !this.expanded
    }
}
// scrollable flags :

const flags = {
    _schrollable: 0,
    _totalItems: 0,
    init() {
        const slider = this.$el.querySelector('.js-flags-container')
        this._totalItems = slider.querySelectorAll('.js-flag').length;
        this._schrollable = -1 * slider.scrollWidth - slider.clientWidth;

        // drag to scroll
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 3; //scroll-fast
            slider.scrollLeft = scrollLeft - walk;
        });

    },
    next() {

        const containerEl = this.$root.querySelector('.js-flags-container')
        const visableItems = ~~(containerEl.clientWidth / this.$root.querySelector('.js-flags-container .js-flag').clientWidth)
        const newPosition = containerEl.scrollLeft + (this._schrollable / (this._totalItems / visableItems))
        containerEl.scroll(newPosition, 0)

    },
    prv() {

        const containerEl = this.$root.querySelector('.js-flags-container')
        const visableItems = ~~(containerEl.clientWidth / this.$root.querySelector('.js-flags-container .js-flag').clientWidth)
        const newPosition = containerEl.scrollLeft - (this._schrollable / (this._totalItems / visableItems))
        containerEl.scroll(newPosition, 0)

    }

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


window.addEventListener('load', function () {

    if (typeof pagination !== 'undefined') {

        pagination()
    }
})

