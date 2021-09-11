import {KentekenCheck} from './kenteken-check-nl-class';
//import Vue from 'vue';

//console.log(KentekenCheck);
//console.log(Vue);

const outputElm = document.getElementById('kenteken') as HTMLDivElement;
const inputElm = document.getElementById('input-kenteken') as HTMLInputElement;


const kt = new KentekenCheck('S007HH', inputElm, outputElm, true);
kt.formatLicense();
kt.bindInputListener();

// format only
const kt2 = new KentekenCheck('JFK01P');
outputElm.innerHTML = kt2.formatLicense() as string;
