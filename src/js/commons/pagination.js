
function pagination() {
    const paginationEl = document.querySelector(".js-pagination")
    const cardsContainer = document.querySelector(".js-cards-container")

    if (paginationEl) {

        let maxCartAvailable = 10;
        const getsPerFetch = 3;

        respondToVisibility(paginationEl, isVisible => {

            if (isVisible) {

                if (maxCartAvailable >= 0) {

                    maxCartAvailable -= getsPerFetch;

                    // AJAX REQ SIMULATION
                    setTimeout(() => {
                        console.log("FETCHING")
                        const template = new Array(getsPerFetch).fill("").map((i, index) => {
                            return `  
                                <div class="flex flex-wrap mb-2 lg:p-6 md:p-3 p-6 rounded-2xl shadow-md hover:shadow-xl">

                                <div class="md:border-l-2 border-b-2 md:border-b-0 w-1/2 md:w-4/12 flex items-center ">
                                    <div>
                                      ${index}  پاریسگردی با بیسان سیر
                                    </div>
                                </div>

                                <div class="flex-center md:border-l-2 border-b-2 md:border-b-0 w-1/2 py-4 md:py-0 md:w-3/12">
                                    <div class="w-full flex-col px-3">

                                        <div class="flex justify-between mb-2">
                                            <span class="">
                                                کوالالامپور
                                            </span>
                                            <span class="text-xs flex-center">1400,10,04</span>
                                        </div>


                                        <div class="flex justify-between">
                                            <span>تهران</span>
                                            <span class="text-xs flex-center">1400,10,04</span>
                                        </div>

                                    </div>
                                </div>

                                <div class="flex-center mb:border-l-2 w-1/2 md:w-2/12 py-4 md:py-0">
                                    <div class="bg-gray-200 px-3 py-1 rounded-3xl text-sm">
                                        5 شب و 5 روز
                                    </div>
                                </div>

                                <div class="flex-center w-1/2 md:w-3/12">
                                    <div class="flex gap-2">
                                        <span class="font-bold">55555555</span>
                                        <span>تومان</span>
                                    </div>
                                </div>

                            </div>
                        `
                        })

                        cardsContainer.insertAdjacentHTML("beforeend", template)
                    }, 1000);

                } else {

                    paginationEl.remove()
                }
            }

        })

    }

}