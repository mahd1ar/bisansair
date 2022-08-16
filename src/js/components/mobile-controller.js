
window.mobile_controller = {
    _isOpen: false,
    scrollThreshhold: 112,
    fixedPosition: true,


    subMenu: [],
    tree: {},
    animationIndex: true,

    get isOpen() {
        return this._isOpen
    },
    set isOpen(input) {

        if (input) {
            this.$root.classList.remove('h-20')
            this.$root.classList.add('h-full')
        } else {
            setTimeout(() => {

                this.$root.classList.add('h-20')
                this.$root.classList.remove('h-full')
            }, 300);

        }

        if (input && !this.fixedPosition)
            document.querySelector('#navigation-sticky-placeholder').style.height = '100%'
        else
            document.querySelector('#navigation-sticky-placeholder').style.height = ''

        const indexPageHeroSection = document.querySelector('.js-hero')

        if (indexPageHeroSection)
            if (input)
                indexPageHeroSection.classList.add('-z-10')
            else
                indexPageHeroSection.classList.remove('-z-10')

        document.body.style.overflow = input ? 'hidden' : ''

        this._isOpen = input
    },

    init() {
        // this.taggleMobileMenu()

        function traverse(el, index = 0) {

            const t = {}
            const name = el.querySelector(":scope > a");
            const icon = el.querySelector(":scope > a > i");
            const els = el.querySelectorAll(":scope > ul > li");
            t.icon = icon ? icon.innerHTML : null
            icon && icon.remove()
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

        this.tree = traverse(el, 0)

    },
    get currentSubmenu() {
        let el = this.tree;

        for (let i = 0; i < this.subMenu.length; i++)

            el = el.children[this.subMenu[i]]


        return el
    },
    get ch() {

        let l = this.tree.children

        for (let i = 0; i < this.subMenu.length; i++) {
            l = l[this.subMenu[i]].children
        }


        return l
    },
    taggleMobileMenu() {
        if (this.subMenu.length !== 0)
            this.subMenu.splice(0, this.subMenu.length)


        this.isOpen = !this.isOpen

    },
    changeSubMenu(index) {
        this.animationIndex = false
        setTimeout(() => {
            this.subMenu.push(index)
            this.animationIndex = true
        }, 500);
    },
    back() {
        this.animationIndex = false
        setTimeout(() => {
            this.subMenu.pop()
            this.animationIndex = true
        }, 500);

    },
    openlink(link) {

        window.open(link, '_self')
    },

}