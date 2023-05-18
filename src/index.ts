import {KentekenCheck} from './kenteken-check-nl-class-ts';

const outputElm = document.getElementById('kenteken') as HTMLDivElement;
const inputElm = document.getElementById('input-kenteken') as HTMLInputElement;
const label = document.createElement('label');
label.setAttribute("style", 'margin-top: 1rem; border-top: 2px dashed')
label.innerText = "Voer kenteken in";
const containerInput = document.createElement('input');
const containerOutput = document.createElement('div');
document.body.appendChild(label);
document.body.appendChild(containerInput);
document.body.appendChild(containerOutput);

const kt = new KentekenCheck('S007HH', inputElm, outputElm);
kt.formatLicense();
kt.bindInputListener();

// format only
const kt2 = new KentekenCheck('JFK01P');
outputElm.innerHTML = kt2.formatLicense() as string;

//another example
const kt3 = new KentekenCheck('hfff43', containerInput, containerOutput, 'valid', "Kenteken bestaat niet");
kt3.formatLicense();
kt3.bindInputListener();
