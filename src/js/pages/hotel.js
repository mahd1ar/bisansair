function createAnchor(listOfElements) {
    // observer
    let options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
    };

    const observer = new IntersectionObserver((entreis) => {

        entreis.forEach((entry) => {

            if (entry.isIntersecting) {
                const { id } = entry.target;

                for (let i = 0; i < document.querySelectorAll(".js-tab-item").length; i++) {

                    const elem = document.querySelectorAll(".js-tab-item")[i];

                    elem.classList.remove('bg-slate-200')

                }

                document.querySelector(`.js-tab-item[data-guide=${id}]`).classList.add("bg-slate-200")
            }
        });
    }, options);

    listOfElements.forEach((i) => {
        const elem = document.querySelector("#" + i.replace("#", ""));

        observer.observe(elem);
    });
}

document.addEventListener('DOMContentLoaded', function () {

    const splide = new Splide("#main-slider", {
        width: "100%",
        height: 378,
        pagination: false,
        cover: true,
    });

    const thumbnails = document.getElementsByClassName("thumbnail");
    let current;

    for (let i = 0; i < thumbnails.length; i++) {
        initThumbnail(thumbnails[i], i);
    }

    function initThumbnail(thumbnail, index) {
        thumbnail.addEventListener("click", function () {
            splide.go(index);
        });
    }

    splide.on("mounted move", function () {
        const thumbnail = thumbnails[splide.index];

        if (thumbnail) {
            if (current) {
                current.classList.remove("is-active");
            }

            thumbnail.classList.add("is-active");
            thumbnail.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" })
            current = thumbnail;
        }
    });

    splide.mount();

    createAnchor([
        "description",
        "facilities",
        "flags"
    ]);


});