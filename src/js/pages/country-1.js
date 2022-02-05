
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
        const c = this.$el.querySelector('.js-flags-container')
        this._totalItems = c.querySelectorAll('.js-flag').length;
        console.log(this._totalItems)
        this._schrollable = -1 * c.scrollWidth - c.clientWidth;

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