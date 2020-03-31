/* Ik heb deze kentekenCheck gebaseerd op de actuele formats(alle afgegeven kentekencombinaties) uitgegeven vanuit de RDW lijst welke is te vinden op bijgevoegde link. Voor een project had ik deze nodig en wilde het zelf even uitzoeken. Het doel was om het vooral simpel te houden. De oplossing kan ook ingezet worden als HTML5 validation only in het 'pattern' attribuut, zie html.
De open data API vd rdw retourneert geen koppeltekens in het kenteken voor zover ik weet, dus vandaar deze oplossing.
De array van regex patronen correspondeert exact met de lijst van formats op de site vd RDW in bijgaande link.

De class declaratie 'KentekenCheck' kijkt of het een valide NL kenteken is, er worden geen klinkers gebruikt en geen tekens die de RDW voorschrijft. Kentekens met AA en CD zijn in deze functie niet meegenomen, de letters C en Q mogen niet meer vd overheid ivm interpretatie problemen en zijn wel meegenomen.
Babel is nodig voor ondersteuning van legacy browsers zoals IE 10 /IE 11/Edge 13 etc.

Verboden combinaties: GVD, KKK, KVT, LPF, NSB, PKK, PSV, TBS, SS en SD (ook niet in lettercombinaties met 3 letters)

De function Array.some is legacy browser proof, Array.find is ook mogelijk, maar dan is een polyfill nodig, een 'for' loop met een break is ook een oplossing.

https://www.rdw.nl/particulier/voertuigen/auto/de-kentekenplaat/het-kenteken-op-de-plaat/uitleg-over-de-cijfers-en-letters-op-de-kentekenplaat

 note: 'HTML5 input patterns don't accept flags so to get lowercase letters we need to add the uppercase and lowercase range (e.g. A-Za-z).'
 
 default parameters : use babel when support legacy IE
 https://babeljs.io/docs/en/babel-plugin-transform-parameters
 
MIT License
Copyright (c) 2020 Pepijn Friederichs

*/

const el = document.getElementById('kenteken');
const inputEl = document.getElementById('input-kenteken');


// start class KentekenCheck
class KentekenCheck {
  
  constructor(kenteken, classValid  = 'valid'){
   	this.kenteken = kenteken;
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
               '^([BDFGHJKLMNPRSTVWXYZ]{3})([0-9]{2})([BDFGHJKLMNPRSTVWXYZ]{1})$'];
  
  this.forbiddenCharacters = /^((?!GVD|KKK|KVT|LPF|NSB|PKK|PSV|TBS|SS|SD).){6}$/;
  }
  
  
  
  get license(){
    if (typeof this.kenteken !== 'string') return;
    
    let str = this.kenteken.toUpperCase()
                        .trim()
                        .split('-')
                        .join(''); // trim whitespace / strip dashes
	return this.convertKenteken(str);
  }
  
  convertKenteken(str){
    
    let newStr = '';
    // based on rdw demands
    // returns true immediately when found match : legacy browser proof IE 9/10/11, no polyfill needed
    let matchLicense = this.arrRegEx.some(regEx => {

      const re = new RegExp(regEx);
      const res = re.test(str);
      const resLegal = this.forbiddenCharacters.test(str);

      // match on regex pattern 
      if (res === true && resLegal === true){
        inputEl.value = str.replace(re, '$1-$2-$3'); 
        inputEl.classList.add(this.classValid);
        newStr = str.replace(re, '$1-$2-$3');
        return true;
      } 
    });
  
  if (matchLicense){
    return newStr;
  } 
  inputEl.classList.remove(this.classValid);
  return 'XX-XX-XX';
  }
  
}

// vervang het voorbeeld met een geldig kenteken zonder/met verkeerd geplaatste koppeltekens
// bijvoorbeeld 12TTHJ HFFF43 of 1KGF55 of G234TR H222GG, HF-FF43 , G-234-TR

// om met performance rekening te houden kan wellicht het change event worden gebruikt





let kt2 = new KentekenCheck('GFYY54');
kt2.license;

inputEl.addEventListener('input', (e) => {
  
  let val = e.target.value;
  let kt = new KentekenCheck(val);
  el.innerHTML = kt.license;
  
 });




