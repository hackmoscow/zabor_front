export function getKT(region, city) {
    if (city && region && KT_TABLE[region].children){
        return KT_TABLE[region].children[city];
    } else if (!city && region && KT_TABLE[region].children) {
        throw new Error("City not specified");
    } else if (!city && region && !KT_TABLE[region].children) {
        return KT_TABLE[region];
    } else {
        throw new Error("Unknown case");
    }
}

export function getTB(car_type, region, insurant) {
    if (Object.keys(TB_TABLE[car_type]).indexOf(region) === -1) {
        region = 'Другая';
    }
    return TB_TABLE[car_type][region][insurant];
}

export function getKPR(car_type, trailer) {
    if (Object.keys(KPR_TABLE).indexOf(car_type) !== -1) {
        return KPR_TABLE[car_type][trailer];
    }
    return 1;
}

export const TB_TABLE = {  //Базовая ставка для категории машины для каждого региона http://www.ingos.ru/upload/info/BaseOSAGO.pdf
    'b': {
        'Москва': {
                'Юридическое лицо': 2573,
                'Физическое лицо': 4118,
        },
        'Московская область': {
                'Юридическое лицо': 2573,
                'Физическое лицо': 4118,
        },
        'Краснодарский край': {
                'Юридическое лицо': 2573,
                'Физическое лицо': 4118,
        },
        'Ростовская область': {
                'Юридическое лицо': 2573,
                'Физическое лицо': 4118,
        },
        'Волгоградская область': {
                'Юридическое лицо': 2573,
                'Физическое лицо': 4118,
        },
        'Мурманская область': {
                'Юридическое лицо': 2573,
                'Физическое лицо': 4118,
        },
        'Челябинская область': {
                'Юридическое лицо': 2573,
                'Физическое лицо': 3912,
        },
        'Калининградская область': {
                'Юридическое лицо': 2573,
                'Физическое лицо': 4118,
        },
        'Другая': {
                'Юридическое лицо': 2573,
                'Физическое лицо': 4118,
        }
    },
    'a': { //мотоциклы, мопеды, квадроциклы
        'Москва': {
            'Физическое лицо': 867,
        },
        'Московская область': {
            'Физическое лицо': 867,
        },
        'Краснодарский край': {
            'Физическое лицо': 867,
        },
        'Ростовская область': {
            'Физическое лицо': 867,
        },
        'Волгоградская область': {
            'Физическое лицо': 867,
        },
        'Мурманская область': {
            'Физическое лицо': 867,
        },
        'Челябинская область': {
            'Физическое лицо': 867,
        },
        'Калининградская область': {
            'Физическое лицо': 867,
        },
        'Другая': {
            'Физическое лицо': 867,
        }
    },
    'c': { //грузовой автомобиль, max 16 тонн и менее
        'Москва': {
            'Физическое лицо': 3509,
        },
        'Московская область': {
            'Физическое лицо': 3509,
        },
        'Краснодарский край': {
            'Физическое лицо': 3509,
        },
        'Ростовская область': {
            'Физическое лицо': 3509,
        },
        'Волгоградская область': {
            'Физическое лицо': 3509,
        },
        'Мурманская область': {
            'Физическое лицо': 3509,
        },
        'Челябинская область': {
            'Физическое лицо': 3509,
        },
        'Калининградская область': {
            'Физическое лицо': 3509,
        },
        'Другая': {
            'Физическое лицо': 3509,
        }
    },
    'c-m': { //грузовой автомобиль, max 16 тонн и более
        'Москва': {
            'Физическое лицо': 5284,
        },
        'Московская область': {
            'Физическое лицо': 5284,
        },
        'Краснодарский край': {
            'Физическое лицо': 5284,
        },
        'Ростовская область': {
            'Физическое лицо': 5284,
        },
        'Волгоградская область': {
            'Физическое лицо': 5284,
        },
        'Мурманская область': {
            'Физическое лицо': 5284,
        },
        'Челябинская область': {
            'Физическое лицо': 5284,
        },
        'Калининградская область': {
            'Физическое лицо': 5284,
        },
        'Другая': {
            'Физическое лицо': 5284,
        }
    },
    'd': { //автобусы до 16 пассажиров включительно
        'Москва': {
            'Физическое лицо': 2808,
        },
        'Московская область': {
            'Физическое лицо': 2808,
        },
        'Краснодарский край': {
            'Физическое лицо': 2808,
        },
        'Ростовская область': {
            'Физическое лицо': 2808,
        },
        'Волгоградская область': {
            'Физическое лицо': 2808,
        },
        'Мурманская область': {
            'Физическое лицо': 2808,
        },
        'Челябинская область': {
            'Физическое лицо': 2808,
        },
        'Калининградская область': {
            'Физическое лицо': 2808,
        },
        'Другая': {
            'Физическое лицо': 2808,
        }
    },
    'd-m': { //автобусы более 16 пассажиров
        'Москва': {
            'Физическое лицо': 3509,
        },
        'Московская область': {
            'Физическое лицо': 3509,
        },
        'Краснодарский край': {
            'Физическое лицо': 3509,
        },
        'Ростовская область': {
            'Физическое лицо': 3509,
        },
        'Волгоградская область': {
            'Физическое лицо': 3509,
        },
        'Мурманская область': {
            'Физическое лицо': 3509,
        },
        'Челябинская область': {
            'Физическое лицо': 3509,
        },
        'Калининградская область': {
            'Физическое лицо': 3509,
        },
        'Другая': {
            'Физическое лицо': 3509,
        }
    },
    'd-t': { //маршрутные автобусы
        'Москва': {
            'Физическое лицо': 6166,
        },
        'Московская область': {
            'Физическое лицо': 6166,
        },
        'Краснодарский край': {
            'Физическое лицо': 6166,
        },
        'Ростовская область': {
            'Физическое лицо': 6166,
        },
        'Волгоградская область': {
            'Физическое лицо': 6166,
        },
        'Мурманская область': {
            'Физическое лицо': 6166,
        },
        'Челябинская область': {
            'Физическое лицо': 5138,
        },
        'Калининградская область': {
            'Физическое лицо': 5858,
        },
        'Другая': {
            'Физическое лицо': 6166,
        }
    }
};

// http://autodrop.ru/autopravo/1000-koyefficient-territorii-osago-2015.html
export const KT_TABLE = { "Республика Адыгея": 1.1, "Республика Алтай": { children: { "Горно-Алтайск": 1.3, "Прочие города и населенные пункты": 0.7 } }, "Республика Башкортостан": { children: { "Благовещенск": 1.2, "Октябрьский": 1.2, "Уфа": 1.8, "Прочие города и населенные пункты": 1, "Ишимбай": 1.1, "Кумертау": 1.1, "Салават": 1.1, "Стерлитамак": 1.3, "Туймазы": 1.3 } }, "Республика Бурятия": { children: { "Улан-Удэ": 1.3, "Прочие города и населенные пункты": 0.6 } }, "Республика Дагестан": { children: { "Буйнакск": 1, "Дербент": 1, "Каспийск": 1, "Махачкала": 1, "Хасавюрт": 1, "Прочие города и населенные пункты": 0.7 } }, "Республика Ингушетия": { children: { "Малгобек": 1.2, "Назрань": 1, "Прочие города и населенные пункты": 0.7 } }, "Кабардино-Балкарская Республика": { children: { "Прочие города и населенные пункты": 0.7, "Нальчик": 1, "Прохладный": 1 } }, "Республика Калмыкия": { children: { "Элиста": 1.3, "Прочие города и населенные пункты": 0.6 } }, "Карачаево-Черкесская Республика": 1, "Республика Карелия": { children: { "Петрозаводск": 1.3, "Прочие города и населенные пункты": 0.8 } }, "Республика Коми": { children: { "Сыктывкар": 1.6, "Ухта": 1.3, "Прочие города и населенные пункты": 1 } }, "Республика Крым": { children: { "Симферополь": 0.6, "Прочие города и населенные пункты": 0.6 } }, "Республика Марий Эл": { children: { "Волжск": 1, "Йошкар-Ола": 1.3, "Прочие города и населенные пункты": 0.7 } }, "Республика Мордовия": { children: { "Рузаевка": 1, "Саранск": 1.2, "Прочие города и населенные пункты": 0.7 } }, "Республика Саха (Якутия)": { children: { "Нерюнгри": 1.3, "Якутск": 2, "Прочие города и населенные пункты": 0.8 } }, "Республика Северная Осетия — Алания": { children: { "Владикавказ": 1, "Прочие города и населенные пункты": 0.8 } }, "Республика Татарстан": { children: { "Елабуга": 1.2, "Казань": 2, "Набережные Челны": 1.7, "Прочие города и населенные пункты": 1.1, "Альметьевск": 1.3, "Зеленодольск": 1.3, "Нижнекамск": 1.3, "Бугульма": 1, "Лениногорск": 1, "Чистополь": 1 } }, "Республика Тыва": { children: { "Кызыл": 1, "Прочие города и населенные пункты": 0.6}}, "Удмуртская Республика": { children: { "Воткинск": 1.1, "Ижевск": 1.6, "Прочие города и населенные пункты": 0.8, "Глазов": 1, "Сарапул": 1 } }, "Республика Хакасия": { children: { "Прочие города и населенные пункты": 0.6, "Абакан": 1, "Саяногорск": 1, "Черногорск": 1 } }, "Чеченская Республика": 0.7, "Чувашская Республика": { children: { "Канаш": 1, "Новочебоксарск": 1.1, "Чебоксары": 1.6, "Прочие города и населенные пункты": 0.8 } }, "Алтайский край": { children: { "Барнаул": 1.7, "Бийск": 1.2, "Прочие города и населенные пункты": 0.7, "Заринск": 1.1, "Новоалтайск": 1.1, "Рубцовск": 1.1 } }, "Забайкальский край": { children: { "Краснокаменск": 1, "Чита": 1.1, "Прочие города и населенные пункты": 0.7 } }, "Камчатский край": { children: { "Петропавловск-Камчатский": 1.1, "Прочие города и населенные пункты": 0.8 } }, "Краснодарский край": { children: { "Прочие города и населенные пункты": 1, "Анапа": 1.3, "Геленджик": 1.3, "Армавир": 1.2, "Сочи": 1.2, "Туапсе": 1.2, "Белореченск": 1.1, "Ейск": 1.1, "Кропоткин": 1.1, "Крымск": 1.1, "Курганинск": 1.1, "Лабинск": 1.1, "Славянск-на-Кубани": 1.1, "Тимашевск": 1.1, "Тихорецк": 1.1, "Краснодар": 1.8, "Новороссийск": 1.8 } }, "Красноярский край": { children: { "Красноярск": 1.8, "Прочие города и населенные пункты": 0.9, "Ачинск": 1.1, "Зеленогорск": 1.1, "Железногорск": 1.3, "Норильск": 1.3, "Канск": 1, "Лесосибирск": 1, "Минусинск": 1, "Назарово": 1 } }, "Пермский край": { children: { "Пермь": 2, "Соликамск": 1.2, "Прочие города и населенные пункты": 1.1, "Березники": 1.3, "Краснокамск": 1.3, "Лысьва": 1, "Чайковский": 1 } }, "Приморский край": { children: { "Владивосток": 1.4, "Прочие города и населенные пункты": 0.7, "Арсеньев": 1, "Артем": 1, "Находка": 1, "Спасск-Дальний": 1, "Уссурийск": 1 } }, "Ставропольский край": { children: { "Прочие города и населенные пункты": 0.7, "Буденновск": 1, "Георгиевск": 1, "Ессентуки": 1, "Минеральные воды": 1, "Невинномысск": 1, "Пятигорск": 1, "Кисловодск": 1.2, "Михайловск": 1.2, "Ставрополь": 1.2 } }, "Хабаровский край": { children: { "Амурск": 1, "Комсомольск-на-Амуре": 1.3, "Хабаровск": 1.7, "Прочие города и населенные пункты": 0.8 } }, "Амурская область": { children: { "Благовещенск": 1.4, "Прочие города и населенные пункты": 0.8, "Белогорск": 1, "Свободный": 1 } }, "Архангельская область": { children: { "Архангельск": 1.8, "Котлас": 1.6, "Северодвинск": 1.7, "Прочие города и населенные пункты": 0.8 } }, "Астраханская область": { children: { "Астрахань": 1.4, "Прочие города и населенные пункты": 0.8 } }, "Белгородская область": { children: { "Белгород": 1.3, "Прочие города и населенные пункты": 0.8, "Губкин": 1, "Старый Оскол": 1 } }, "Брянская область": { children: { "Брянск": 1.5, "Клинцы": 1, "Прочие города и населенные пункты": 0.7 } }, "Владимирская область": { children: { "Владимир": 1.6, "Гусь-Хрустальный": 1.1, "Муром": 1.2, "Прочие города и населенные пункты": 1 } }, "Волгоградская область": { children: { "Волгоград": 1.3, "Волжский": 1.1, "Прочие города и населенные пункты": 0.7, "Камышин": 1, "Михайловка": 1 } }, "Вологодская область": { children: { "Вологда": 1.7, "Череповец": 1.8, "Прочие города и населенные пункты": 0.9 } }, "Воронежская область": { children: { "Воронеж": 1.4, "Прочие города и населенные пункты": 0.7, "Борисоглебск": 1, "Лиски": 1, "Россошь": 1 } }, "Ивановская область": { children: { "Иваново": 1.8, "Кинешма": 1.1, "Шуя": 1, "Прочие города и населенные пункты": 0.9 } }, "Иркутская область": { children: { "Ангарск": 1.2, "Иркутск": 1.7, "Усолье-Сибирское": 1.1, "Шелехов": 1.3, "Прочие города и населенные пункты": 0.8, "Братск": 1, "Тулун": 1, "Усть-Илимск": 1, "Усть-Кут": 1, "Черемхово": 1 } }, "Калининградская область": { children: { "Калининград": 1.1, "Прочие города и населенные пункты": 0.8 } }, "Калужская область": { children: { "Калуга": 1.2, "Обнинск": 1.3, "Прочие города и населенные пункты": 0.9 } }, "Кемеровская область": { children: { "Кемерово": 1.9, "Новокузнецк": 1.8, "Прочие города и населенные пункты": 1.1, "Анжеро-Судженск": 1.2, "Киселевск": 1.2, "Юрга": 1.2, "Белово": 1.3, "Березовский": 1.3, "Междуреченск": 1.3, "Осинники": 1.3, "Прокопьевск": 1.3 } }, "Кировская область": { children: { "Киров": 1.4, "Кирово-Чепецк": 1.2, "Прочие города и населенные пункты": 0.8 } }, "Костромская область": { children: { "Кострома": 1.3, "Прочие города и населенные пункты": 0.7 } }, "Курганская область": { children: { "Курган": 1.3, "Шадринск": 1, "Прочие города и населенные пункты": 0.6 } }, "Курская область": { children: { "Железногорск": 1, "Курск": 1.2, "Прочие города и населенные пункты": 0.7 } }, "Ленинградская область": 1.6, "Липецкая область": { children: { "Елец": 1, "Липецк": 1.5, "Прочие города и населенные пункты": 0.8 } }, "Магаданская область": { children: { "Магадан": 1.2, "Прочие города и населенные пункты": 0.6 } }, "Московская область": 1.7, "Мурманская область": { children: { "Мурманск": 1.7, "Североморск": 1.3, "Прочие города и населенные пункты": 1, "Апатиты": 1.1, "Мончегорск": 1.1 } }, "Нижегородская область": { children: { "Кстово": 1.2, "Нижний Новгород": 1.8, "Прочие города и населенные пункты": 1, "Арзамас": 1.1, "Выкса": 1.1, "Саров": 1.1, "Балахна": 1.3, "Бор": 1.3, "Дзержинск": 1.3 } }, "Новгородская область": { children: { "Боровичи": 1, "Великий Новгород": 1.3, "Прочие города и населенные пункты": 0.9 } }, "Новосибирская область": { children: { "Бердск": 1.3, "Искитим": 1.2, "Куйбышев": 1, "Новосибирск": 1.7, "Прочие города и населенные пункты": 0.9 } }, "Омская область": { children: { "Омск": 1.6, "Прочие города и населенные пункты": 0.9 } }, "Оренбургская область": { children: { "Оренбург": 1.7, "Орск": 1.1, "Прочие города и населенные пункты": 0.8, "Бугуруслан": 1, "Бузулук": 1, "Новотроицк": 1 } }, "Орловская область": { children: { "Орел": 1.2, "Прочие города и населенные пункты": 0.7, "Ливны": 1, "Мценск": 1 } }, "Пензенская область": { children: { "Заречный": 1.2, "Кузнецк": 1, "Пенза": 1.4, "Прочие города и населенные пункты": 0.7 } }, "Псковская область": { children: { "Великие Луки": 1, "Псков": 1.2, "Прочие города и населенные пункты": 0.7 } }, "Ростовская область": { children: { "Азов": 1.2, "Батайск": 1.3, "Ростов-на-Дону": 1.8, "Шахты": 1.1, "Прочие города и населенные пункты": 0.8, "Волгодонск": 1, "Гуково": 1, "Каменск-Шахтинский": 1, "Новочеркасск": 1, "Новошахтинск": 1, "Сальск": 1, "Таганрог": 1 } }, "Рязанская область": { children: { "Рязань": 1.4, "Прочие города и населенные пункты": 0.9 } }, "Самарская область": { children: { "Самара": 1.6, "Тольятти": 1.5, "Чапаевск": 1.2, "Прочие города и населенные пункты": 0.9, "Новокуйбышевск": 1.1, "Сызрань": 1.1 } }, "Саратовская область": { children: { "Саратов": 1.6, "Энгельс": 1.2, "Прочие города и населенные пункты": 0.7, "Балаково": 1, "Балашов": 1, "Вольск": 1 } }, "Сахалинская область": { children: { "Южно-Сахалинск": 1.5, "Прочие города и населенные пункты": 0.9 } }, "Свердловская область": { children: { "Екатеринбург": 1.8, "Прочие города и населенные пункты": 1, "Асбест": 1.1, "Ревда": 1.1, "Березовский": 1.3, "Верхняя Пышма": 1.3, "Новоуральск": 1.3, "Первоуральск": 1.3, "Верхняя Салда": 1.2, "Полевской": 1.2 } }, "Смоленская область": { children: { "Смоленск": 1.2, "Прочие города и населенные пункты": 0.7, "Вязьма": 1, "Рославль": 1, "Сафоново": 1, "Ярцево": 1 } }, "Тамбовская область": { children: { "Мичуринск": 1, "Тамбов": 1.2, "Прочие города и населенные пункты": 0.8 } }, "Тверская область": { children: { "Тверь": 1.5, "Прочие города и населенные пункты": 0.8, "Вышний Волочек": 1, "Кимры": 1, "Ржев": 1 } }, "Томская область": { children: { "Северск": 1.2, "Томск": 1.6, "Прочие города и населенные пункты": 0.9 } }, "Тульская область": { children: { "Тула": 1.5, "Прочие города и населенные пункты": 0.9, "Алексин": 1, "Ефремов": 1, "Новомосковск": 1, "Узловая": 1.2, "Щекино": 1.2 } }, "Тюменская область": { children: { "Тобольск": 1.3, "Тюмень": 2, "Прочие города и населенные пункты": 1.1 } }, "Ульяновская область": { children: { "Димитровград": 1.1, "Ульяновск": 1.4, "Прочие города и населенные пункты": 0.8 } }, "Челябинская область": { children: { "Копейск": 1.5, "Магнитогорск": 1.7, "Челябинск": 2, "Прочие города и населенные пункты": 1, "Златоуст": 1.3, "Миасс": 1.3, "Сатка": 1.1, "Чебаркуль": 1.1 } }, "Ярославская область": { children: { "Ярославль": 1.5, "Прочие города и населенные пункты": 0.9 } }, "Москва": 2, "Санкт-Петербург": 1.8, "Севастополь": 0.6, "Еврейская автономная область": { children: { "Биробиджан": 1, "Прочие города и населенные пункты": 0.7 } }, "Ненецкий автономный округ": 0.8, "Ханты-Мансийский автономный округ — Югра": { children: { "Когалым": 1, "Сургут": 2, "Нижневартовск": 1.8, "Ханты-Мансийск": 1.5, "Прочие города и населенные пункты": 1.1, "Нефтеюганск": 1.3, "Нягань": 1.3 } }, "Чукотский автономный округ": 0.7, "Ямало-Ненецкий автономный округ": { children: { "Новый Уренгой": 1, "Ноябрьск": 1.7, "Прочие города и населенные пункты": 1.1, "Байконур": 1 } } }

export const KVS_TABLE = {
    "возраст больше 22 лет, стаж от 3 лет": 1,
    "возраст больше 22 лет, стаж до 3 лет": 1.7,
    "возраст до 22 лет, стаж от 3 лет": 1.6,
    "возраст до 22 лет, стаж до 3 лет": 1.8
}

export const KO_TABLE = {
    "Ограниченный список": 1,
    "Без ограничений": 1.8,
}

export const KM_TABLE = {
    'до 50 л.с.':0.6,
    'от 51 до 70 л.с.':1 ,
    'от 71 до 100 л.с.':1.1 ,
    'от 101 до 120 л.с.':1.2 ,
    'от 121 до 150 л.с.':1.4 ,
    'от 151 л.с.':1.6 ,  
}

export const KC_TABLE = {
    "1 год": 1, 
    "9 месяцев": 0.95, 
    "8 месяцев": 0.9, 
    "7 месяцев": 0.8, 
    "6 месяцев": 0.7, 
    "5 месяцев": 0.65, 
    "4 месяца": 0.6, 
    "3 месяца": 0.5, 
}

export const KN_TABLE = {
    'Да': 1.5,
    'Нет': 1,
}

export const KPR_TABLE = {
    'a': {
        'Да': 1.16,
        'Нет': 1,
    },
    'c': {
        'Да': 1.4,
        'Нет': 1,
    },
    'c-m': {
        'Да': 1.25,
        'Нет': 1,
    },
}


export const KBM_TABLE = {
    'Были аварии по моей вине': 2.45,
    'Не страховался ранее':1,
    '1 год':0.95,
    '2 года':0.9,
    '3 года ':0.85,
    '4 года':0.8,
    '5 лет ':0.75,
    '6 лет':0.7,
    '7 лет':0.65,
    '8 лет':0.6,
    '9 лет':0.55,
    '10 лет и больше':0.5,
    // 'М': 2.45,
    // '0': 2.3,
    // '1': 1.55,
    // '2': 1.4,
}


/* export const KBM_TABLE = {
    'Не страховался ранее': 1,
    'М': 2.45,
    '0': 2.3,
    '1': 1.55,
    '2': 1.4,
    '3': 1,
    '4': 0.95,
    '5': 0.9,
    '6': 0.85,
    '7': 0.8,
    '8': 0.75,
    '9': 0.7,
    '10': 0.65,
    '11': 0.6,
    '12': 0.55,
    '13': 0.5
} */