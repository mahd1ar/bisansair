


window.navbar = {
    _isOpen: false,
    scrollThreshhold: 112,
    fixedPosition: true,


    // watch: {
    //     scroll() {
    //         console.log("scroll")
    //     }
    // },
    get isOpen() {
        return this._isOpen
    },
    set isOpen(input) {
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

    subMenu: [],
    tree: {},

    init() {

        // homepage mode
        function homeMode() {
            if (["lg", "xl"].includes(currentBrackPoint()) === false) return
            document.querySelector("#navigation__bar").classList.remove("bg-white")
            document.querySelector("#navigation__bisanseir-logo").classList.remove("w-9")
            document.querySelector("#navigation__bisanseir-logo").classList.add("w-20")
        }

        // normal mode
        function normalMode() {
            document.querySelector("#navigation__bar").classList.add("bg-white")
            document.querySelector("#navigation__bisanseir-logo").classList.add("w-9")
            document.querySelector("#navigation__bisanseir-logo").classList.remove("w-20")
        }

        homeMode()


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




        function placeNavbarFixed() {
            homeMode()
            document.querySelector("#navigation-placeholder").appendChild(document.querySelector("#navigation"));
            document.querySelector("#navigation-placeholder").style.height = 'auto';
            document.querySelector("#navigation-sticky-placeholder").style.transform = "translate(0,-100%)";
        }


        function placeNavbarSticky() {
            normalMode()
            document.querySelector("#navigation-placeholder").style.height = document.getElementById('navigation').getBoundingClientRect().height + 'px';
            document.querySelector("#navigation-sticky-placeholder").appendChild(document.querySelector("#navigation"));
            document.querySelector("#navigation-sticky-placeholder").style.transform = "translate(0,0%)"
        }



        this.$watch('fixedPosition', (n) => {
            if (n) placeNavbarFixed()
            else placeNavbarSticky()
        })

        if (window.pageYOffset > this.scrollThreshhold) {
            this.fixedPosition = false
        }

        window.addEventListener('scroll', e => {
            if (window.pageYOffset > this.scrollThreshhold) {

                this.fixedPosition = false
            } else {
                this.fixedPosition = true

            }

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
        console.log(input)

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