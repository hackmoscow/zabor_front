//import axios from 'axios'
import { TB_TABLE, getTB, KT_TABLE, getKT, KVS_TABLE, KO_TABLE, KM_TABLE, KC_TABLE, KN_TABLE, KBM_TABLE, KPR_TABLE, getKPR } from './lookup.js'
//const API_URL = process.env.API_URL || '';

function objKeysToString(o, k, sep) {
  return k.map(key => key+'='+o[key]).filter(v => v).join(sep);
}

export function calculateOsagoPrice(data) {
    let price = null;
    if (data.insurant == 'Физическое лицо') {
        let TB = getTB(data.car_type, data.registration_region, data.insurant);
        let KT = getKT(data.registration_region, data.registration_city);
        let KBM = KBM_TABLE[data.drivers_class]; // TODO use class
        let KVS = 1;
        if (data.drivers_limit == 'Ограниченный список'){
            KVS = KVS_TABLE[data.drivers_age_experience];
        }

        let KO = KO_TABLE[data.drivers_limit];
        let KM = KM_TABLE[data.engine_power];
        let KC = KC_TABLE[data.exploitation_period];
        let KN = 1 //KN_TABLE[data.violations];
        
        let KPR = getKPR(data.car_type, data.trailer);

        
        if (data.car_type == 'b'){
            // ТБ × КТ × КБМ × КВС × КО × КМ × КС × КН
            price = TB * KT * KBM * KVS * KO * KM * KC * KN;
        } else if (['a', 'c', 'c-m', 'd', 'd-t'].indexOf(data.car_type) !== -1){
            // ТБ × КТ × КБМ × КВС × КО × КС × КН × КПр
            price = TB * KT * KBM * KVS * KO * KC * KN * KPR;
        } else if (data.car_type == 'd-m'){
            //ТБ × КТ × КБМ × КО × КС × КН × КПр
            price = TB * KT * KBM * KO * KC * KN * KPR;
        } 
        //console.log({TB: TB,KT: KT,KBM: KBM,KVS: KVS,KO: KO,KM: KM,KC: KC,KN: KN, KPR: KPR, price: price})

        return Math.min(price, TB*KT*3);
    }

    
}

export function getRegionList() {
    return Object.keys(KT_TABLE);
}

export function getCityList(region) {
    if (KT_TABLE[region].children) {
        return Object.keys(KT_TABLE[region].children);
    } else {
        return false;
    } 
}

export function getEngineChoices() {
    return Object.keys(KM_TABLE);
}

export function getAgeExperienceChoices() {
    return Object.keys(KVS_TABLE);
}

export function getPeriodChoices() {
    return Object.keys(KC_TABLE);
}

export function getDriversLimitChoices() {
    return Object.keys(KO_TABLE);
}

export function getViolationsChoices() {
    return Object.keys(KN_TABLE);
}

export function getClassChoices() {
    return Object.keys(KBM_TABLE);
}

export function getTrailerChoices() {
    return Object.keys(KPR_TABLE['a']);
}

export function getCarTypeChoices() {
    return [
        {"value":"a", "label": "Мотоцикл, мопед, квадроцикл"},
        {"value":"b", "label": "Легковой автомобиль"},
        {"value":"c", "label": "Грузовой автомобиль, 16 тонн и менее"},
        {"value":"c-m", "label": "Грузовой автомобиль, 16 тонн и более"},
        {"value":"d", "label": "Автобус до 16 пассажиров включительно"},
        {"value":"d-m", "label": "Автобус более 16 пассажиров"},
        {"value":"d-t", "label": "Маршрутный автобус"},
    ];
}


