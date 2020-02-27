var app = new Vue({
    el: "#app",
    data: {
        showModal: !1,
        phones: ["+77013222137"],
        emails: ["avgmclean@mail.ru"],
        offers: {
            house: {
                value: "Уборка домов в Атырау от ",
                description: "Профессиональная генеральная уборка по стоимости частной домработницы",
                withPrice: !0
            },
            apartment: {
                value: "Уборка квартир в Атырау от ",
                description: "Профессиональная генеральная уборка по стоимости частной домработницы",
                withPrice: !0
            },
            office: {
                value: "Уборка офисов в Атырау",
                description: "Профессиональная уборка по цене приходящей уборщицы",
                withPrice: !1
            },
            renovation: {
                value: "Уборка после ремонта в квартирах, домах и офисах Атырау",
                description: null,
                withPrice: !1
            }
        },
        pages: ["house", "apartment", "office", "renovation"],
        russianPages: {
            house: "Дом",
            apartment: "Квартира",
            office: "Офис",
            renovation: "После ремонта"
        },
        initialPrices: {
            house: 9000,
            apartment: 6500,
            office: 160,
            renovation: 350
        },
        
        
    },
    methods: {
        printOffer(e) {
            return this.offers[e].withPrice ? this.offers[e].value + " " + this.initialPrices[e] + " тг" : this.offers[e].value
        },
        formatPhoneNumber(e) {
            var t = ("" + e).replace(/\D/g, "").match(/^(7|)?(\d{3})(\d{3})(\d{4})$/);
            return t ? [t[1] ? "+7 " : "", "(", t[2], ") ", t[3], "-", t[4]].join("") : null
        },
        getPageLink: e => "apartment" == e ? "uborka-kvartiry.html" : "office" == e ? "uborka-ofisa.html" : "renovation" == e ? "uborka-posle-remonta.html" : "uborka-doma.html",
        menu: function(e) {
            this.showModal = e, document.getElementById("sidemenu").style.display = e ? "block" : "none"
        }
    },
    created() {

    }
});