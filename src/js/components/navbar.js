
var navbar = {
    // isOpen: false,
    _isOpen: false,
    get isOpen() {
        return this._isOpen
    },
    set isOpen(input) {
        if (input) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = ''

        this._isOpen = input
    },
    menu: [],
    subMenu: -1,
    init() {
        // console.log(this.$refs.item.innerText)

        let counter = 0;
        this
            .$refs
            .mitem
            .querySelectorAll('li.js-item-parent').forEach(i => {
                const m = { index: counter++ };
                m.text = i.querySelector('a').childNodes[0].textContent.trim();
                m.children = [];
                // debugger
                i.querySelectorAll("ul.js-item-child li").forEach(j => {
                    const n = { index: counter++ }
                    n.text = j.querySelector('a').childNodes[0].textContent.trim()
                    n.href = i.querySelector('a').href
                    m.children.push(n)
                })

                if (m.children.length === 0) {
                    m.href = i.querySelector('a').href;
                }

                // console.log(m)
                this.menu.push(m)
            })

        this.$refs.mitem.remove()
        console.log(this.menu)
    },
    taggleMobileMenu() {
        if (this.subMenu !== -1)
            this.subMenu = -1

        this.isOpen = !this.isOpen

    },
    toggleSelected(inx) {
        this.subMenu = inx
        if (inx !== -1)
            setTimeout(() => {
                this.subMenu = -1
            }, 60 * 1000);
    },
    get currentCategory() {
        return this.subMenu === -1 ?
            'منو'
            :
            this.menu[this.subMenu].text

    }
}