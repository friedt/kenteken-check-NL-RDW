import {KentekenCheck} from './kenteken-check-nl-class.js';

const outputElm = document.getElementById('kenteken');
const inputElm = document.getElementById('input-kenteken');

const kt = new KentekenCheck('S007JB', inputElm, outputElm);
kt.formatLicense();
kt.bindInputListener();

// format only
const kt2 = new KentekenCheck('JFK01P')
outputElm.innerHTML = kt2.formatLicense();


