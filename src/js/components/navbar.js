


var navbar = {
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
    subMenu: [],
    tree: {},

    init() {
        // console.log(this.$refs.item.innerText)

        function traverse(el, index = 0) {
            // debugger
            const t = {}
            const name = el.querySelector(":scope > a");
            const els = el.querySelectorAll(":scope > ul > li");

            t.hasChildren = els.length > 0 ? true : false;
            t.name = name ? name.innerHTML.replace(/\s+/g, ' ').trim() : "ROOT";
            t.link = name ? name.href : "#";
            t.children = [];

            index++

            for (let i = 0; i < els.length; i++) {

                t.children.push(traverse(els[i], index))
            }

            return t

        }

        const el = document.querySelector(".menu-top_menu-container")

        this.tree = traverse(el, 0,)
    },
    get ch() {
        let l = this.tree.children

        for (let i = 0; i < this.subMenu.length; i++)
            l = l[this.subMenu[i]].children

        return l
    },
    taggleMobileMenu() {
        if (this.subMenu.length !== 0)
            this.subMenu.splice(0, this.subMenu.length)


        this.isOpen = !this.isOpen

    },
    toggleSelected(inx) {
        this.subMenu = inx
        if (inx !== -1)
            setTimeout(() => {
                this.subMenu = -1
            }, 60 * 1000);
    },

}