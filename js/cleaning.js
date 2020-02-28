var app = new Vue({
    el: "#app",
    data: {
        showModal: !1,
        selectedPage: "house",
        pages: ["house", "apartment", "office", "renovation","dryCleaning","payment"],
        russianPages: {
            house: "Дом",
            apartment: "Квартира",
            office: "Офис",
            renovation: "После ремонта"
        },
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
            },
            dryCleaning: {
                value: "Химчистка мебели и ковров",
            },
            payment:{
                value: "Способы оплаты",
            },
        },
        name: null,
        phone: null,
        phones: ["+77013222137"],
        emails: ["avgmclean@mail.ru"],
        todos: {
            house: [{
                image: "howroom.jpg",
                title: "в комнате",
                text: ["Протрём стеклянные поверхности и зеркала", "Вытрем пыль с доступных поверхностей, включая подоконники и радиаторы", "Застелим постель", "Пропылесосим ковры и пол", "Соберём и вынесем мусор"]
            }, {
                image: "howkitchen.jpg",
                title: "на кухне",
                text: ["Протираем фасады шкафов, наводим порядок внутри", "Моем грязную посуду, чистим раковину", "Отмываем плиту", "Протираем столешницы и наводим порядок", "Моем пол и плинтусы, собираем и выкидываем мусор", "Чистим духовку, микроволновку и холодильник снаружи и внутри"]
            }, {
                image: "howbathroom.jpg",
                title: "в ванной",
                text: ["Протрём зеркала и стеклянные поверхности", "Почистим раковину и смеситель", "Почистим и продезинфицируем унитаз", "Вымоем пол с плинтусами", "Почистим ванную"]
            }],
            office: [{
                image: "howoffice.jpg",
                title: "в офисе",
                text: ["Вымоем окна снаружи и внутри", "Протрём от пыли все доступные поверхности", "Вымоем пол с плинтусами", "Соберём и вынесем мусор", "Помоем и продезинфицируем санузлы"]
            }],
            renovation: [{
                image: "howrenovation.jpg",
                title: "после ремонта",
                text: ["Вымоем окна снаружи и внутри", "Очистим поверхности от загрязнений, следов клея, побелки, лаков и красок", "Отмоем радиаторы, трубы и двери", "Вымоем стены и полы", "Очистим помещение от пыли с помощью промышленного пылесоса", "Соберем и вынесем строительный мусор"]
            }]
        },
        selectedHow: 0,
        selectedType: 0,
        types: [
        {
            description: "Наведем общий порядок, пропылесосим в комнатах, протрем зеркала, мебель, плинтусы, застелим постель, вымоем пол.",
            todos: ["Соберём и вынесем мусор", "Наведём порядок", "Вытрем пыль с доступных поверхностей, включая подоконники и радиаторы", "Протрём зеркала и стеклянные поверхности", "Пропылесосим ковры и пол", "Вымоем пол с плинтусами", "Застелим постель", "Вытрем пыль на фасадах кухни", "Почистим столешницу, плиту, смеситель, раковину и рабочий рукав", "Почистим ванную", "Почистим и продезинфицируем унитаз"]
        }, 
        {
            description: "Полная влажная уборка всей квартиры, включая окна, кухню и балкон.",
            todos: ["Соберём мусор", "Наведём порядок", "Протрём все доступные поверхности, включая подоконники и радиаторы", "Протрём зеркала и стеклянные поверхности", "Пропылесосим пол и ковры", "Протрём выключатели и розетки", "Вымоем пол с плинтусами", "Застелим кровать", "Протрём верхние и нижние фасады кухни", "Почистим плиту, столешницу, смеситель, раковину и рабочий рукав", "Аккуратно расставим обувь", "Помоем и почистим ванную, душевую кабину и кафель", "Помоем и продезинфицируем унитаз и биде", "Наведём порядок на балконе, вымоем полы и стены", "Протрём двери, входные группы и ручки", "Обеспылим потолок, стены и люстры", "Вымоем окна снаружи и внутри, включая рамы, торцы и подоконник. В холодное время года моем окна только внутри", "Вымоем снаружи и внутри холодильник, духовку и микроволновку"]
        }
        ],
        calcDescription:{
        	description1: "Перезвоним в течение часа, чтобы договориться о месте и времени — точный расчет сделаем после бесплатного выезда менеджера на место.",
        	description2: "Расчет стоимости на длительный срок оговаривается индивидуально. Постоянным клиентам делаем скидки.",
        },
        showServicesList: !1,
        area: 30,
        roomsNumber: 1,
        bathroomsNumber: 1,
        initialPrices: {
            house: 9000,
            apartment: 6500,
            office: 160,
            renovation: 350
        },
        pricePerSquareMeter: {
        	house:450,
        	apartment: 450,
        	office: 160,
        	renovation: 350,
        },
        pricePerRoom: 2000,
        pricePerBathroom: 1000,
        cash: !0,
        bonuses: [
            [{
                name: "Холодильник",
                image: "img/calculator/fridge.svg",
                type: "number",
                value: 0,
                step: 1,
                description: "Вымоем снаружи и внутри, выкинем пропавшее. Морозильную камеру размораживает клиент.",
                price: 1500
            }, {
                name: "Духовка",
                image: "img/calculator/oven.svg",
                type: "boolean",
                value: !1,
                description: "Вымоем снаружи и внутри.",
                price: 1500
            }, {
                name: "Посуда",
                image: "img/calculator/plate.svg",
                type: "boolean",
                value: !1,
                price: 1e3,
                description: "Помоем всю грязную посуду, высушим и аккуратно расставим."
            }, {
                name: "Глажка",
                image: "img/calculator/laundry.svg",
                type: "number",
                value: 0,
                step: 10,
                price: 140,
                description: "Погладим всё, что оставите, кроме нижнего белья и верхней одежды."
            }, {
                name: "Питомец",
                image: "img/calculator/cat.svg",
                type: "number",
                value: 0,
                step: 1,
                price: 1e3,
                description: "Почистим и продезинфицируем лоток, сменим наполнитель, помоем мисочки."
            }, {
                name: "Кухонные шкафы",
                image: "img/calculator/kitchen.svg",
                type: "number",
                value: 0,
                step: 1,
                price: 1200,
                description: "Вымоем снаружи и внутри, наведём порядок."
            }, {
                name: "Окна",
                image: "img/calculator/window.svg",
                type: "number",
                value: 0,
                step: 1,
                price: 1e3,
                description: "Вымоем снаружи и внутри, включая рамы, торцы и подоконник. Одно окно — 2-3 секции общей площадью ~3 кв. м."
            }, {
                name: "Шкафы",
                image: "img/calculator/cupboard.svg",
                type: "number",
                value: 0,
                step: 1,
                price: 1600,
                description: "Вымоем снаружи и внутри, наведём порядок, аккуратно сложим вещи. Делаем только в присутствии клиента."
            }, {
                name: "Балкон",
                image: "img/calculator/balcony.svg",
                type: "number",
                value: 0,
                step: 1,
                price: 1900,
                description: "Наведём порядок, вымоем полы и стены. Окна считаем отдельно."
            }, {
                name: "Микроволновка",
                image: "img/calculator/microwave.svg",
                type: "number",
                value: 0,
                step: 1,
                price: 700,
                description: "Вымоем снаружи и внутри"
            }],
            [{
                name: "Шкафы и гардероб",
                image: "img/calculator/cupboard.svg",
                type: "number",
                value: 0,
                step: 1,
                price: 1600,
                description: "Вымоем снаружи и внутри, наведём порядок, аккуратно сложим вещи. Делаем только в присутствии клиента."
            }, {
                name: "Обработка штор от пыли",
                image: "img/calculator/steam-iron.svg",
                type: "number",
                value: 0,
                step: 1,
                price: 500,
                description: "Обработаем шторы и тюль от пыли парогенератором. Считаем поштучно."
            }, {
                name: "Снять и повесить шторы",
                image: "img/calculator/window.svg",
                type: "number",
                value: 0,
                step: 1,
                price: 700,
                description: "Снимем старые шторы и тюль, повесим новые. Считаем комплектами, комплект — всё, что висит на одном окне."
            }, {
                name: "Глажка",
                image: "img/calculator/laundry.svg",
                type: "number",
                value: 0,
                step: 10,
                price: 140,
                description: "Погладим всё, что оставите, кроме нижнего белья и верхней одежды."
            }]
        ],
        requestSend: !1
    },
    methods: {
        getPageType() {
            var e = "house",
                t = window.location.pathname.split("/").pop();
            return "uborka-kvartiry.html" == t ? e = "apartment" 
            : "uborka-ofisa.html" == t ? e = "office" 
            : "himchistka-mebeli-kovrov.html" == t ? e = "dryCleaning" 
            : "oplata.html" == t ? e = "payment"
            : "uborka-posle-remonta.html" == t && (e = "renovation"), 
            e
        },
        getPageLink: e => "apartment" == e ? "uborka-kvartiry.html" 
        : "office" == e ? "uborka-ofisa.html" 
        : "renovation" == e ? "uborka-posle-remonta.html" 
        : "dryCleaning" == e ? "himchistka-mebeli-kovrov.html"
        : "payment" == e ? "oplata.html"
        : "uborka-doma.html",
        anyBonusSelected: function() {
            for (var e, t = !1, a = 0; a < this.bonuses[this.selectedType].length; a++)
                if ("number" == (e = this.bonuses[this.selectedType][a]).type && e.value > 0 || "boolean" == e.type && 1 == e.value) {
                    t = !0;
                    break
                } return t
        },
        toggle: function(e) {
            "number" == e.type ? e.value = e.value > 0 ? 0 : e.step : e.value = !e.value
        },
        totalFromBonuses: function() {
            var e = 0;
            return this.bonuses[this.selectedType].forEach(t => {
                e += t.value * t.price
            }), e
        },
        baseTotal: function() {
            return 0 == this.selectedType ? 
            this.initialPrices[this.selectedPage] + (this.roomsNumber - 1) * this.pricePerRoom + (this.bathroomsNumber - 1) * this.pricePerBathroom : 
            this.area * this.pricePerSquareMeter[this.selectedPage] + (this.bathroomsNumber - 1) * this.pricePerBathroom
        },
        total: function() {
            return this.baseTotal() + this.totalFromBonuses()
        },
        formatPhoneNumber(e) {
            var t = ("" + e).replace(/\D/g, "").match(/^(7|)?(\d{3})(\d{3})(\d{4})$/);
            return t ? [t[1] ? "+7 " : "", "(", t[2], ") ", t[3], "-", t[4]].join("") : null
        },
        printOffer(e) {
            return this.offers[e].withPrice ? this.offers[e].value + " " + this.initialPrices[e] + " тг" : this.offers[e].value
        },
        getTodos: function() {
            return "house" == this.selectedPage || "apartment" == this.selectedPage ? this.todos.house : this.todos[this.selectedPage]
        },
        phoneIsEmpty: function() {
            return null == this.phone || 0 == this.phone.length || 1 == this.requestSend
        },
        submitRequest: function() {
            grecaptcha.execute("6LfSR9oUAAAAAKCclvFZNhmokgzi4QGO8HdKKPDt", {
                action: "homepage"
            }).then(e => {
                var t = this.constructMailBody(),
                    a = new URLSearchParams;
                a.append("email", t), a.append("token", e), axios.post("backend.php", a).then(e => {
                    console.log(e), "success" == e.data ? alert("Заявка принята! Мы свяжемся с Вами в ближайщее время") : "retry" == e.data && alert("Ошибка Google Recaptcha! Пожалуйста попробуйте снова"), this.requestSend = !1
                }).catch(function(e) {
                    console.log(e), this.requestSend = !1
                })
            }), this.requestSend = !0
        },
        constructMailBody: function() {
            var e = [];
            this.anyBonusSelected() && this.bonuses[this.selectedType].forEach(t => {
                ("number" == t.type && t.value > 0 || "boolean" == t.type && 1 == t.value) && e.push({
                    name: t.name,
                    type: t.type,
                    value: t.value,
                    price: t.price
                })
            });
            var t = {
                typeNameInRU: this.russianPages[this.selectedPage],
                typeName: this.selectedPage,
                typeCode: this.selectedType,
                roomsNumber: this.roomsNumber,
                area: this.area,
                bathroomsNumber: this.bathroomsNumber,
                baseTotal: this.baseTotal(),
                anyBonusSelected: this.anyBonusSelected(),
                bonuses: e,
                total: this.total(),
                phone: this.phone,
                name: this.name,
                cash: this.cash
            };
            return JSON.stringify(t)
        },
        submitName: function() {
            return this.requestSend ? "Принимаем вашу заявку..." : 1 == this.cash ? "Оформить заявку" : "Оплатить"
        },
        menu: function(e) {
            this.showModal = e, document.getElementById("sidemenu").style.display = e ? "block" : "none"
        }
    },
    created() {
        //this.selectedPage = 'office'
        this.selectedPage = this.getPageType(), "house" != this.selectedPage && "apartment" != this.selectedPage && (this.selectedType = 1)
        if(['office','renovation'].includes(this.selectedPage)){
        	this.selectedType=1
        	this.area=50
        }
        //document.title = this.printOffer(this.selectedPage) + " - AVGM LTD"
        /*var meta = document.createElement('meta');
        meta.name = "description";
        meta.content = this.printOffer(this.selectedPage)+". 📞 "+this.formatPhoneNumber(this.phones[0]);
        document.getElementsByTagName('head')[0].appendChild(meta);
        meta = document.createElement('meta');
        meta.name = "keywords";
        meta.content = "уборка,клининг,Атырау,"+this.russianPages(this.selectedPage);
        document.getElementsByTagName('head')[0].appendChild(meta);*/
    }
});