


var navbar = {
    _isOpen: false,
    get isOpen() {
        return this._isOpen
    },
    set isOpen(input) {

        const indexPageHeroSection = document.querySelector('.js-hero')

        if (indexPageHeroSection)
            if (input)
                indexPageHeroSection.classList.add('-z-10')
            else
                indexPageHeroSection.classList.remove('-z-10')

        document.body.style.overflow = input ? 'hidden' : ''

        this._isOpen = input
    },
    // menu: [],
    subMenu: [],
    tree: {},

    init() {

        function traverse(el, index = 0) {

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

        this.tree = traverse(el, 0)



        // const newnav = navigation.cloneNode().outerHTML
        // console.log(navigation.outerHTML)
        // document.body.insertAdjacentNode(
        //     "beforeend",
        //     // newnav
        //     navigation
        // );
        // newnav.id = "floatNav"

        // document.body.appendChild(navigation);

        // document.querySelector("header").appendChild(navigation)

        window.addEventListener('scroll', e => {
            console.log(window.pageYOffset)
        })

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
    toggleSelected(inx) {
        this.subMenu = inx
        if (inx !== -1)
            setTimeout(() => {
                this.subMenu = -1
            }, 60 * 1000);
    },

}