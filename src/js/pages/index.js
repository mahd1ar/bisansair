

function getMounthLength(m) {
    if (m > 12)
        m = m % 12

    if (m < 1)
        m = m = 12

    if (m < 7) return 31
    else return 30
}

//main 


window.addEventListener('load', function () {

    new WOW({
        animateClass: 'animate__animated'
    }).init();

    // scale airplane
    (() => {

        const offsetTop = airplane.getBoundingClientRect().top + airplane.getBoundingClientRect().height - document.body.getBoundingClientRect().top  //airplane.y;//+ airplane.getBoundingClientRect().height;

        document.addEventListener('scroll', function (e) {

            const res = 1 - ((offsetTop - window.pageYOffset) / offsetTop)

            if (res < 1) {
                airplane.style.transform = `scale(${res / 2 + 1})`
            }

        })
    })()


    new Slider({
        containerSelectror: '.js-nowruz',
        nextSelector: '.js-slider-next',
        prvSelector: '.js-slider-prv',
        isBilateral: true
    });

    new Slider({
        containerSelectror: '.js-special-tours',
        nextSelector: '.js-next',
        prvSelector: '.js-prv',
        isBilateral: currentBrackPoint() === 'NONE' ? true : false,
    });




})




var fligthPicker = {
    showMem: false,
    showFrom: false,
    showDatePicker: false,
    toggleMem() {
        this.showDatePicker = false;
        this.showFrom = false;

        this.showMem = !this.showMem
    },
    toggleFrom() {
        this.showMem = false
        this.showDatePicker = false;

        this.showFrom = !this.showFrom
    },
    toggleDatePicker() {
        this.showMem = false
        this.showFrom = false;

        this.showDatePicker = !this.showDatePicker
    },
    days: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
    items: new Array(35).fill(0).map((_, i) => i),
    travelers: [
        {
            type: "adult",
            label: "بزرگسال",
            count: 0,
        },
        {
            type: "kid",
            label: "کودک",
            count: 0,
        },
        {
            type: "newborn",
            label: "نوزاد",
            count: 0,
        }
    ],
    travelType: 0,
    travelTypes: [
        'اکونومی', 'بیسنس', 'فرست کلاس'
    ],
    travelersInc(index) {
        this.travelers[index].count++
    },
    travelersDec(index) {
        this.travelers[index].count > 0 && this.travelers[index].count--
    },
    get totalTravelers() {
        let v = 0;
        this.travelers.forEach((i) => { v = v + i.count })

        return v !== 0 ?
            String(v).toIndiaDigits() + "نفر"
            : " نفرات"
    },
    init() {
        const cal = new Array(6).fill(0).map(() => new Array(7).fill(0))

        const today_miladi = {
            d: new Date().getDate(),
            m: new Date().getMonth() + 1,
            y: new Date().getFullYear(),
        }

        const today_shamsi = gregorian_to_jalali(today_miladi.y, today_miladi.m, today_miladi.d)

        const lengthOfMounth = getMounthLength(today_shamsi[1]);

        const firstDay_miladi = jalali_to_gregorian(today_shamsi[0], today_shamsi[1], 1);

        for (let i = 0; i < 3; i++) {

            firstDay_miladi[i] = firstDay_miladi[i] < 10 ? `0${firstDay_miladi[i]}` : String(firstDay_miladi[i])
        }

        const firstDayOfMounth = `${firstDay_miladi[1]} ${firstDay_miladi[2]} ${firstDay_miladi[0]}`
        const firstDayInWeek = (new Date(firstDayOfMounth).getDay() + 1) % 7

        cal[0][firstDayInWeek] = 1;

        const flatCal = cal.flat()
        let counter = 1
        for (let i = flatCal.indexOf(1); i < flatCal.length; i++) {

            flatCal[i] = counter++
            if (counter > lengthOfMounth) {
                counter = 1
            }
        }

        counter = getMounthLength(today_shamsi[1] - 1);

        for (let i = flatCal.indexOf(1) - 1; -1 < i; i--) {

            flatCal[i] = counter--

        }

        let monthIsBegan = false;
        let monthIsEnded = false;
        for (let i = 0; i < flatCal.length; i++) {

            const a = {
                origin: false,
                destination: false,
                isOutOfCurrentMonth: true,
                isToday: false,
                date: flatCal[i],
                isFri: false,
                calcStyle: ""
            }

            if ((i + 1) % 7 === 0) {
                a.isFri = true;
            }

            if (flatCal[i] === 1)
                monthIsBegan = true

            if (monthIsBegan && flatCal[i] === getMounthLength(today_shamsi[1]))
                monthIsEnded = true

            if (monthIsBegan && !monthIsEnded) {
                a.isOutOfCurrentMonth = false

                if (today_shamsi[2] === flatCal[i])
                    a.isToday = true
            }



            flatCal[i] = a
        }

        this.items.splice(0, this.items.length)
        flatCal.forEach(i => {

            this.items.push(i)
        })

    }




}


var alpineCloud = {

    clouds: [],
    mouseX: 0,
    mousey: 0,
    init() {

        new Array(44).fill(0).forEach((_, i) => {
            const props = {
                name: i + 1,
                style: {
                    left: ~~(Math.random() * 100) + '%',
                    top: ~~(Math.random() * 50) + '%',
                    zIndex: (~~(Math.random() * 10)) + 2,
                },
                data: { depth: Math.random().toFixed(2) },

            }
            this.clouds.push(props)
        })

        document.addEventListener('alpine:initialized', () => {
            var scene = document.getElementById('cloud-scene');
            var parallaxInstance = new Parallax(scene);
        })

    },


}
