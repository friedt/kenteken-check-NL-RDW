import {KentekenCheck} from './kenteken-check-nl-class-ts';

const outputElm = document.getElementById('kenteken') as HTMLDivElement;
const inputElm = document.getElementById('input-kenteken') as HTMLInputElement;


const kt = new KentekenCheck('S007HH', inputElm, outputElm);
kt.formatLicense();
kt.bindInputListener();

// format only
const kt2 = new KentekenCheck('JFK01P');
outputElm.innerHTML = kt2.formatLicense() as string;
