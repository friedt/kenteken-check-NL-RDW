import {KentekenCheck} from './kenteken-check-nl-class.js';


const outputElm = document.getElementById('kenteken');
const inputElm = document.getElementById('input-kenteken');
const kt = new KentekenCheck('S007JB', inputElm, outputElm, true);
kt.formatLicense();
kt.bindInputListener();
