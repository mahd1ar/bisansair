
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
// console.log(c.scrollWidth - c.clientWidth)