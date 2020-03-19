/* Ik heb deze kentekenCheck gebaseerd op de actuele formats(alle afgegeven kentekencombinaties) uitgegeven vanuit de RDW lijst welke is te vinden op bijgevoegde link. Voor een project had ik deze nodig en wilde het zelf even uitzoeken. Het doel was om het vooral simpel te houden. De oplossing kan ook ingezet worden als HTML5 validation only in het 'pattern' attribuut, zie html.
De open data API vd rdw retourneert geen koppeltekens in het kenteken voor zover ik weet, dus vandaar deze oplossing.
De array van regex patronen correspondeert exact met de lijst van formats op de site vd RDW in bijgaande link.
De functie 'kentekenCheck' kijkt of het een valide NL kenteken is, er worden geen klinkers gebruikt en geen tekens die de RDW voorschrijft. Kentekens met AA en CD zijn in deze functie niet meegenomen, de letters C en Q mogen niet meer vd overheid ivm interpretatie problemen en zijn wel meegenomen.

Verboden combinaties: GVD, KKK, KVT, LPF, NSB, PKK, PSV, TBS, SS en SD (ook niet in lettercombinaties met 3 letters)

De functie is legacy browser proof en kan ook door Array.find in te zetten, maar dan is een polyfill nodig, een 'for' loop met een break is ook een oplossing.


note: default parameters : use babel when support legacy IE 10/11
      https://babeljs.io/docs/en/babel-plugin-transform-parameters
 
note: 'HTML5 input patterns don't accept flags so to get lowercase letters we need to add the uppercase and lowercase range (e.g. A-Za-z).'
 
rdw documentation:
https://www.rdw.nl/particulier/voertuigen/auto/de-kentekenplaat/het-kenteken-op-de-plaat/uitleg-over-de-cijfers-en-letters-op-de-kentekenplaat

MIT License
Copyright (c) 2020 Pepijn Friederichs

*/

const el = document.getElementById('kenteken');
const inputEl = document.getElementById('input-kenteken');

// start function kentekenCheck
const kentekenCheck = (kenteken, classValid = 'valid') => {
  
  if (typeof kenteken !== 'string') return;
  
  let str = kenteken.toUpperCase();
  let newStr = '';
  // based on rdw demands
  const arrRegEx = ['^([BDFGHJKLMNPRSTVWXYZ]{2})([0-9]{2})([0-9]{2})$',
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
  
  const forbiddenCharacters = /^((?!GVD|KKK|KVT|LPF|NSB|PKK|PSV|TBS|SS|SD).){6}$/;

  str = str.trim()
           .split('-')
           .join(''); // trim whitespace / strip dashes

  // returns true immediately when found match : legacy browser proof, no polyfill needed
    let matchLicense = arrRegEx.some(regEx => {

      const re = new RegExp(regEx);
      const res = re.test(str);
      const resLegal = forbiddenCharacters.test(str);

      // match on regex pattern 
      if (res === true && resLegal === true){
        inputEl.value = str.replace(re, '$1-$2-$3'); 
        inputEl.classList.add(classValid);
        newStr = str.replace(re, '$1-$2-$3');
        return true;
      } 
    });
  
  if (matchLicense){
    return newStr;
  } 
  inputEl.classList.remove(classValid);
  return 'XX-XX-XX';
}

// vervang het voorbeeld met een geldig kenteken zonder/met verkeerd geplaatste koppeltekens
// bijvoorbeeld 12TTHJ HFFF43 of 1KGF55 of G234TR H222GG, HF-FF43 , G-234-TR
// uncomment both rules below to not use the input field
//const result =  kentekenCheck('G244TR');
//el.innerHTML = result;

// om met performance rekening te houden kan wellicht het change event worden gebruikt
inputEl.addEventListener('input', (e) => {
  
  let val = e.target.value;
  el.innerHTML = kentekenCheck(val);
  
 });


