

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




/**
 * 
 * @param {number} jy year
 * @param {number} jm month
 * @param {number} jd day
 * @returns {number} 
 */
function shamsi_to_epoch(jy, jm, jd) {
    const [gy, gm, gd] = jalali_to_gregorian(jy, jm, jd)
    return gregorian_to_epoch(gy, gm, gd)
}

/**
 * 
 * @param {number} gy year
 * @param {number} gm month
 * @param {number} gd day
 * @returns {number} 
 */
function gregorian_to_epoch(gy, gm, gd) {
    const d = new Date(`${gm} ${gd} ${gy}`);
    return d.getTime()
}

/**
 * 
 * @param {number} en_candidateMonth 
 * @param {number} en_candidateYear 
 * @returns 
 */
function en_getMounthLength(en_candidateMonth, en_candidateYear) {

    if (!en_candidateYear) {
        en_candidateYear = new Date().getFullYear()
    }

    if (en_candidateMonth < 1) {
        en_candidateMonth = en_candidateMonth + 12
        en_candidateYear--
    }

    let nextMonth = en_candidateMonth + 1
    let nextYear = en_candidateYear



    if (nextMonth > 12) {

        nextMonth = nextMonth % 12;
        nextYear++
    }

    return ~~((new Date(`${nextMonth} 1 ${nextYear}`) - new Date(`${en_candidateMonth} 1 ${en_candidateYear}`)) / 1000 / 3600 / 24)
}

function fa_getMounthLength(fa_candidateMonth, fa_candidateYear) {
    if (fa_candidateMonth > 12)
        fa_candidateMonth = fa_candidateMonth % 12

    if (fa_candidateMonth < 1)
        fa_candidateMonth = fa_candidateMonth + 12

    if (fa_candidateMonth < 7) return 31
    else
        return fa_candidateMonth === 12 ? fa_candidateYear % 4 === 3 ? 30 : 29 : 30
}





const fligthPicker = {
    travelersPicker: {
        show: false,
        togglePanel(val) {
            this.show = (typeof val === 'undefined')
                ? !this.show
                : val
        },
        state: [
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
        type: 0,
        types: [
            'اکونومی', 'بیسنس', 'فرست کلاس'
        ],
        inc(index) {
            this.state[index].count++
        },
        dec(index) {
            this.state[index].count > 0 && this.state[index].count--
        },
        get totalTravelers() {
            let v = 0;
            this.state.forEach((i) => { v = v + i.count })

            return v !== 0 ?
                String(v).toIndiaDigits() + "نفر"
                : " نفرات"
        },
    },
    travelPicker: {
        destination: {
            show: false,
            togglePanel(val) {
                this.show = (typeof val === 'undefined')
                    ? !this.show
                    : val
            },
            model: "",
            is: "",
            _options: [],
            get options() {
                return this.model ?
                    this._options.filter(({ text }) => text.search(this.model) > -1)
                    :
                    this._options

            },
            pick(itemId) {
                this.is = itemId
                this.model = this._options.find(({ id }) => id === itemId).text
            },
            clear() {
                this.model = "";
                this.is = "";
            }
        },
        starting: {
            show: false,
            togglePanel(val) {
                this.show = (typeof val === 'undefined')
                    ? !this.show
                    : val
            },
            model: "",
            is: "",
            _options: [],
            get options() {
                return this.model ?
                    this._options.filter(({ text }) => text.search(this.model) > -1)
                    :
                    this._options

            },
            pick(itemId) {
                this.is = itemId
                this.model = this._options.find(({ id }) => id === itemId).text
            },
            clear() {
                this.model = "";
                this.is = "";
            }
        }
    },
    datePicker: {
        show: false,
        togglePanel(val) {
            this.show = (typeof val === 'undefined')
                ? !this.show
                : val
        },
        get weekDays() {

            return this.mode ?
                ['Sa', 'Su', 'M', 'T', 'W', 'T', 'F']
                :
                ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']
        },
        get formattedFirstDayOftravel() {

            const dot = this.firstDayOftravel
            if (!dot)
                return ""

            return this.mode ? dot.map((i, inx) => inx === 1 ? this.formateMonth(i) : i).join(" ")
                : dot.reverse().map((i, inx) => (inx == 1) ? this.formateMonth(i) : String(i).toIndiaDigits()).join(" ");

        },
        get formattedLastDayOftravel() {

            const dot = this.lastDayOftravel
            if (!dot)
                return ""

            return this.mode ? dot.map((i, inx) => inx === 1 ? this.formateMonth(i) : i).join(" ")
                : dot.reverse().map((i, inx) => (inx == 1) ? this.formateMonth(i) : String(i).toIndiaDigits()).join(" ");

        },
        get firstDayOftravel() {
            if (this._firstDayOftravel_epoch === 0)
                return null

            const date = new Date(this._firstDayOftravel_epoch)
            const day = date.getDate(),
                month = date.getMonth() + 1,
                year = date.getFullYear();

            return (this.mode) ? [year, month, day] : gregorian_to_jalali(year, month, day);


        },
        get lastDayOftravel() {
            if (this._lastDayOftravel_epoch === 0)
                return null

            const date = new Date(this._lastDayOftravel_epoch),
                day = date.getDate(),
                month = date.getMonth() + 1,
                year = date.getFullYear();

            return (this.mode) ? [year, month, day] : gregorian_to_jalali(year, month, day)


        },
        _firstDayOftravel_epoch: 0, // Y-M-D
        _lastDayOftravel_epoch: 0,

        mode: 0, // 0 for shamsi 1 for miladi,
        modeLabel: [
            "شمسی",
            "میلادی"
        ],
        today_shamsi: [],
        today_miladi: [],

        en_today: 16,
        en_candidateMonth: 2, // Feb
        en_candidateYear: 2022,
        fa_today: 27,
        fa_candidateMonth: 11, // bahman
        fa_candidateYear: 1400,

        pick(day) {

            const month = this.mode ? this.en_candidateMonth : this.fa_candidateMonth;
            const year = this.mode ? this.en_candidateYear : this.fa_candidateYear;
            const unixtime = this.mode ? gregorian_to_epoch(year, month, day) : shamsi_to_epoch(year, month, day);

            if (this._firstDayOftravel_epoch && this._lastDayOftravel_epoch) {
                this._firstDayOftravel_epoch = this._lastDayOftravel_epoch = 0
                return
            }

            if (this._firstDayOftravel_epoch === 0) {

                this._firstDayOftravel_epoch = unixtime;
                console.log(this._firstDayOftravel_epoch)
            } else {

                if (unixtime < this._firstDayOftravel_epoch)
                    this._firstDayOftravel_epoch = 0
                else
                    this._lastDayOftravel_epoch = unixtime

            }


            // is it 
        },
        nextMonth() {
            if (++this.fa_candidateMonth > 12) {

                this.fa_candidateMonth %= 12
                this.fa_candidateYear++
            }

            if (++this.en_candidateMonth > 12) {
                this.en_candidateMonth %= 12
                this.en_candidateYear++
            }

        },
        prevMonth() {
            if (--this.fa_candidateMonth < 1) {

                this.fa_candidateMonth += 12
                this.fa_candidateYear--
            }

            if (--this.en_candidateMonth < 1) {
                this.en_candidateMonth += 12
                this.en_candidateYear--
            }

        },
        get candidateFullDate() {
            const months = this.mode ?
                ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                :
                [
                    "فروردین",
                    "اردیبهشت",
                    "خرداد",
                    "تیر",
                    "مرداد",
                    "شهریور",
                    "مهر",
                    "آبان",
                    "آذر",
                    "دی",
                    "بهمن",
                    "اسفند"]


            if (this.mode) {

                return [this.en_candidateYear, months[this.en_candidateMonth - 1], this.en_today]
            } else {
                return [String(this.fa_candidateYear).toIndiaDigits(), months[this.fa_candidateMonth - 1], String(this.fa_today).toIndiaDigits()]

            }
        },

        formateMonth(monthNum) {
            const months = this.mode ?
                ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                :
                [
                    "فروردین",
                    "اردیبهشت",
                    "خرداد",
                    "تیر",
                    "مرداد",
                    "شهریور",
                    "مهر",
                    "آبان",
                    "آذر",
                    "دی",
                    "بهمن",
                    "اسفند"]

            return months[monthNum - 1]

        },
        get days() {


            const cal = new Array(6).fill(0).map(() => new Array(7).fill(0))

            // if shamsi {
            if (this.mode === 0) {

                const lengthOfMounth = fa_getMounthLength(this.fa_candidateMonth, this.fa_candidateYear);

                const firstDay_miladi = jalali_to_gregorian(this.fa_candidateYear, this.fa_candidateMonth, 1);

                // just formating...
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

                counter = fa_getMounthLength(this.fa_candidateMonth - 1, this.fa_candidateYear);

                for (let i = flatCal.indexOf(1) - 1; -1 < i; i--) {

                    flatCal[i] = counter--

                }

                let monthIsBegan = false;
                let monthIsEnded = false;
                const fdot = this.firstDayOftravel,
                    ldot = this.lastDayOftravel

                for (let i = 0; i < flatCal.length; i++) {

                    const a = {
                        origin: false,
                        destination: false,
                        inRange: false,
                        isOutOfCurrentMonth: true,
                        isToday: false,
                        date: flatCal[i],
                        formatedDate: String(flatCal[i]).toIndiaDigits(),
                        isFri: false,
                        calcStyle: ""
                    }

                    if ((i + 1) % 7 === 0) {
                        a.isFri = true;
                    }


                    if (monthIsBegan && flatCal[i - 1].date === fa_getMounthLength(this.fa_candidateMonth, this.fa_candidateYear)) {

                        monthIsEnded = true
                    }

                    if (flatCal[i] === 1)
                        monthIsBegan = true

                    if (monthIsBegan && !monthIsEnded) {
                        a.isOutOfCurrentMonth = false

                        if (this.fa_today === flatCal[i]) {
                            if (this.today_shamsi[0] === this.fa_candidateYear && this.today_shamsi[1] === this.fa_candidateMonth)
                                a.isToday = true
                        }


                        if (fdot && this.fa_candidateMonth === fdot[1] && this.fa_candidateYear === fdot[0] && flatCal[i] === fdot[2])
                            a.origin = true


                        if (ldot && this.fa_candidateMonth === ldot[1] && this.fa_candidateYear === ldot[0] && flatCal[i] === ldot[2]) {
                            a.destination = true

                        }
                    }



                    flatCal[i] = a
                }

                if (this._lastDayOftravel_epoch && this._firstDayOftravel_epoch) {

                    const startedDay = flatCal.find(i => i.origin) ? flatCal.find(i => i.origin).date : null
                        , endedDay = flatCal.find(i => i.destination) ? flatCal.find(i => i.destination).date : null

                    if (startedDay && endedDay) {

                        flatCal.forEach(j => {
                            if (j.isOutOfCurrentMonth === false && startedDay < j.date && j.date < endedDay)
                                j.inRange = true;
                        })
                    } else if (startedDay) {
                        flatCal.forEach(j => {
                            if (j.isOutOfCurrentMonth === false && startedDay < j.date)
                                j.inRange = true;
                        })

                    } else {
                        flatCal.forEach(j => {
                            if (j.isOutOfCurrentMonth === false && j.date < endedDay)
                                j.inRange = true;
                        })
                    }


                }

                return flatCal
            }
            else {

                const lengthOfMounth = en_getMounthLength(this.en_candidateMonth, this.en_candidateYear);

                const firstDayOfMounth = `${this.en_candidateMonth} 1 ${this.en_candidateYear}`
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

                counter = en_getMounthLength(this.en_candidateMonth - 1, this.en_candidateYear);

                for (let i = flatCal.indexOf(1) - 1; -1 < i; i--) {

                    flatCal[i] = counter--

                }

                let monthIsBegan = false;
                let monthIsEnded = false;

                const fdot = this.firstDayOftravel
                const ldot = this.lastDayOftravel

                for (let i = 0; i < flatCal.length; i++) {

                    const a = {
                        origin: false,
                        destination: false,
                        isOutOfCurrentMonth: true,
                        isToday: false,
                        date: flatCal[i],
                        formatedDate: flatCal[i],
                        isFri: false,
                        calcStyle: ""
                    }

                    if ((i + 1) % 7 === 0) {
                        a.isFri = true;
                    }


                    if (monthIsBegan && flatCal[i - 1].date === en_getMounthLength(this.en_candidateMonth, this.en_candidateYear))
                        monthIsEnded = true


                    if (flatCal[i] === 1)
                        monthIsBegan = true

                    if (monthIsBegan && !monthIsEnded) {
                        a.isOutOfCurrentMonth = false

                        if (this.en_today === flatCal[i]) {
                            if (this.today_miladi[0] === this.en_candidateYear && this.today_miladi[1] === this.en_candidateMonth)
                                a.isToday = true
                        }


                        if (fdot && this.en_candidateMonth === fdot[1] && this.en_candidateYear === fdot[0] && flatCal[i] === fdot[2])
                            a.origin = true


                        if (ldot && this.en_candidateMonth === ldot[1] && this.en_candidateYear === ldot[0] && flatCal[i] === ldot[2])
                            a.destination = true
                    }




                    flatCal[i] = a
                }
                console.log(flatCal)
                return flatCal
            }
        }
    },
    init() {

        const d = new Date()
        const today_miladi = [d.getFullYear(), d.getMonth() + 1, d.getDate()]
        const today_shamsi = gregorian_to_jalali(today_miladi[0], today_miladi[1], today_miladi[2])
        console.log(today_shamsi)
        this.datePicker.en_today = today_miladi[2];
        this.datePicker.en_candidateMonth = today_miladi[1];
        this.datePicker.en_candidateYear = today_miladi[0];
        this.datePicker.fa_today = today_shamsi[2]
        this.datePicker.fa_candidateMonth = today_shamsi[1]
        this.datePicker.fa_candidateYear = today_shamsi[0]

        this.datePicker.today_shamsi = today_shamsi
        this.datePicker.today_miladi = today_miladi



        this.$refs.startingFrom.querySelectorAll(".js-starting-option").forEach((node, index) => {
            this.travelPicker.starting._options.push({
                id: index,
                text: node.querySelector(".js-starting-text").innerText.replace(/\s+/g, ' ').trim(),
                // html: node.outerHTML,
                icon: node.querySelector("img").src
            })

            node.remove()
        })

        this.$refs.destinationCity.querySelectorAll(".js-destination-option").forEach((node, index) => {
            this.travelPicker.destination._options.push({
                id: index,
                text: node.querySelector(".js-destination-text").innerText.replace(/\s+/g, ' ').trim(),
                // html: node.outerHTML,
                icon: node.querySelector("img").src
            })

            node.remove()
        })


    }
}





const alpineCloud = {

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


const alpineFAQs = {

    init() {
        const items = []
        let id = 0
        this.$root.querySelectorAll(".js-faq-item").forEach(element => {
            const excerpt = element.querySelector(".js-faq-excerpt").innerHTML.replace(/\s+/g, ' ').trim()
            const body = element.querySelector(".js-faq-body").innerHTML.replace(/\s+/g, ' ').trim()
            items.push({ excerpt, body, id: id++ })
            element.remove()
        });
        items.forEach(i => {
            this.items.push(i)
        })
    },
    selected: -1,
    items: [],
};