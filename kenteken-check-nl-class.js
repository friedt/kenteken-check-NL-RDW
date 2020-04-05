/* Ik heb deze kentekenCheck gebaseerd op de actuele formats(alle afgegeven kentekencombinaties) uitgegeven door de RDW, welke lijst is te vinden via bijgevoegde link. Voor een project had ik deze nodig en wilde het zelf even uitzoeken. De oplossing kan ook ingezet worden als HTML5 validation only in het 'pattern' attribuut, zie html.
De open data API vd rdw retourneert geen koppeltekens in het kenteken voor zover bekend, dus vandaar deze oplossing.
De array van regex patronen correspondeert exact met de lijst van formats op de site vd RDW in bijgaande link.
De class declaratie 'KentekenCheck' kijkt of het een valide NL kenteken is, er worden geen klinkers gebruikt en geen tekens die de RDW voorschrijft. Kentekens met AA en CD zijn in deze functie niet meegenomen, de letters C en Q mogen niet meer vd overheid ivm interpretatie problemen en zijn wel meegenomen.
Babel is nodig voor ondersteuning van legacy browsers zoals IE 10 /IE 11/Edge 13 etc.

Verboden combinaties: GVD, KKK, KVT, LPF, NSB, PKK, PSV, TBS, SS en SD (ook niet in lettercombinaties met 3 letters)
Vanaf serie 11: PVV, SGP en VVD verboden

De function Array.some is legacy browser proof, Array.find is ook mogelijk, maar dan is een polyfill nodig, een 'for' loop met een break is ook een oplossing.
https://www.rdw.nl/particulier/voertuigen/auto/de-kentekenplaat/het-kenteken-op-de-plaat/uitleg-over-de-cijfers-en-letters-op-de-kentekenplaat
 note: 'HTML5 input patterns don't accept flags so to get lowercase letters we need to add the uppercase and lowercase range (e.g. A-Za-z).'
 
 default parameters : use babel when support legacy IE
 https://babeljs.io/docs/en/babel-plugin-transform-parameters
 
MIT License
Copyright (c) 2020 Pepijn Friederichs
*/

const el = document.getElementById('kenteken');
const inputElm = document.getElementById('input-kenteken');


// start class KentekenCheck
class KentekenCheck {
  
  constructor(kenteken, inputElm, classValid  = 'valid'){
    this.newStr = '';
    this.index = 0;
   	this.kenteken = kenteken;
    this.inputElm = inputElm;
    this.classValid = classValid;
    this.arrRegEx = ['^([BDFGHJKLMNPRSTVWXYZ]{2})([0-9]{2})([0-9]{2})$',
               '^([0-9]{2})([0-9]{2})([BDFGHJKLMNPRSTVWXYZ]{2})$',
               '^([0-9]{2})([BDFGHJKLMNPRSTVWXYZ]{2})([0-9]{2})$',
               '^([BDFGHJKLMNPRSTVWXYZ]{2})([0-9]{2})([BDFGHJKLMNPRSTVWXYZ]{2})$',
               '^([BDFGHJKLMNPRSTVWXYZ]{2})([BDFGHJKLMNPRSTVWXYZ]{2})([0-9]{2})$',
               '^([0-9]{2})([BDFGHJKLMNPRSTVWXYZ]{2})([BDFGHJKLMNPRSTVWXYZ]{2})$',
               '^([0-9]{2})([BDFGHJKLMNPRSTVWXYZ]{3})([0-9]{1})$',
               '^([0-9]{1})([BDFGHJKLMNPRSTVWXYZ]{3})([0-9]{2})$',
               '^([BDFGHJKLMNPRSTVWXYZ]{2})([0-9]{3})([BDFGHJKLMNPRSTVWXYZ]{1})$',
               '^([BDFGHJKLMNPRSTVWXYZ]{1})([0-9]{3})([BDFGHJKLMNPRSTVWXYZ]{2})$',
               '^((?!PVV|VVD|SGP)[BDFGHJKLMNPRSTVWXYZ]{3})([0-9]{2})([BDFGHJKLMNPRSTVWXYZ]{1})$'];
  
  this.forbiddenCharacters = /^((?!GVD|KKK|KVT|LPF|NSB|PKK|PSV|TBS|SS|SD).){6}$/;
  }
  
  
  
  get license(){
    if (typeof this.kenteken !== 'string') return;
    
    let str = this.kenteken.toUpperCase()
                        .trim()
                        .split('-')
                        .join(''); // trim whitespace / strip dashes
	return this.showLicense(str);
  }
  
  matchLicense(str) {
    return this.arrRegEx.some((regEx, i) => {

      const re = new RegExp(regEx);
      const res = re.test(str);
      const resLegal = this.forbiddenCharacters.test(str);

      // match on regex pattern 
      if (res === true && resLegal === true){
        this.index = i;
        return true;
      } 
    });
  }
  
  showLicense(str){
    
    // based on rdw demands
    // returns true immediately when found match : legacy browser proof IE 9/10/11, no polyfill needed
    let match = this.matchLicense(str);
  
    if (match){
      const re = new RegExp(this.arrRegEx[this.index]);
      this.inputElm.value = str.replace(re, '$1-$2-$3'); 
      this.inputElm.classList.add(this.classValid);
      this.newStr = str.replace(re, '$1-$2-$3');
      return this.newStr;
    } 
    this.inputElm.classList.remove(this.classValid);
    return 'XX-XX-XX';
  }
  
}

// vervang het voorbeeld met een geldig kenteken zonder/met verkeerd geplaatste koppeltekens
// bijvoorbeeld 12TTHJ HFFF43 of 1KGF55 of G234TR H222GG, HF-FF43 , G-234-TR

// om met performance rekening te houden kan wellicht het change event worden gebruikt

let kt2 = new KentekenCheck('GFYY54', inputElm);
kt2.license;

inputElm.addEventListener('input', (e) => {
  
  let val = e.target.value;
  let kt = new KentekenCheck(val, inputElm);
  el.innerHTML = kt.license;
  
 });




