/**
 * 
 * @param {string[]} listOfElements 
 */
function createAnchor(listOfElements) {

    listOfElements.forEach(i => {

        if (document.querySelector('#' + i) === null)
            throw new Error('[bisan Error] there is no element with id "' + i + '"')

        if (document.querySelector(`[data-guide=${i}]`) === null)
            throw new Error('[bisan Error] there is no anchor that points to this id "' + i + '"')

    })

    // observer
    let options = {
        root: null,
        rootMargin: "10px",
        threshold: 1.0
    };

    document.querySelector(".js-timeline ").style.height =
        Math.ceil(
            ((listOfElements.length - 1) /
                listOfElements.length) *
            100
        ) + "%";

    const observer = new IntersectionObserver(entreis => {
        entreis.forEach(entry => {
            if (entry.isIntersecting) {
                const { id } = entry.target;

                const elements = document.querySelectorAll(
                    "#guide [data-guide]"
                );

                for (
                    let i = 0;
                    i < elements.length;
                    i++
                ) {
                    const ballEl = elements[
                        i
                    ].querySelector(".js-ball");
                    const indicatorEl = elements[
                        i
                    ].querySelector(
                        ".js-indicator"
                    );

                    ballEl.style.background =
                        "#D7D7D7";

                    indicatorEl.classList.add(
                        "hidden"
                    );

                    indicatorEl.classList.remove(
                        "inline-block"
                    );

                    try {
                        document
                            .querySelectorAll(
                                ".js-tabs-container .js-tab-item"
                            )
                        [
                            i
                        ].classList.remove(
                            "bg-slate-200"
                        );
                    } catch (error) {
                        console.log(error);
                    }
                }

                for (
                    let i = 0;
                    i <
                    document.querySelectorAll(
                        "#guide [data-guide]"
                    ).length;
                    i++
                ) {
                    const elem = document.querySelectorAll(
                        "#guide [data-guide]"
                    )[i];

                    elem.querySelector(
                        "i"
                    ).style.background = "#EDE059";

                    if (elem.dataset.guide === id) {
                        document.querySelector(
                            ".js-timeline .js-timeline__progress"
                        ).style.height =
                            (i * 100) /
                            (listOfElements.length -
                                1) +
                            "%";

                        elem.querySelector(
                            ".js-indicator"
                        ).classList.remove(
                            "hidden"
                        );

                        elem.querySelector(
                            ".js-indicator"
                        ).classList.add(
                            "inline-block"
                        );

                        break;
                    }
                }
            }
        });
    }, options);

    listOfElements.forEach(i => {
        observer.observe(
            document.querySelector(
                "#" + i.replace("#", "")
            )
        );
    });
}


