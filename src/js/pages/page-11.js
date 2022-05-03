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

    const tabItems = document.querySelectorAll(".js-tab-item")
    tabItems.forEach(i => {
        i.addEventListener("click", () => {
            i.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" })
        })
    })


});