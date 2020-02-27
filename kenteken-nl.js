/* 
Ik heb deze kentekenCheck gebaseerd op de actuele formats uitgegeven vanuit de RDW lijst welke is te vinden op 
bijgevoegde link. Voor een project had ik deze nodig en wilde het zelf even uitzoeken. De open data API vd RDW 
retourneert geen koppeltekens in het kenteken voor zover ik weet, dus vandaar deze oplossing.
De array van regex patronen correspondeert exact met de lijst van formats op de site vd RDW in bijgaande link.
De functie 'kentekenCheck' kijkt of het een valide NL kenteken is, er worden geen klinkers gebruikt en geen tekens die de RDW voorschrijft. Kentekens met AA en CD zijn in deze functie niet meegenomen, de letters C en Q mogen niet meer vd overheid ivm interpretatie problemen en zijn wel meegenomen.

De functie kan nog wat geoptimaliseerd worden door Array.find of Array.some, maar dan is een polyfill nodig  een for loop met een break is ook een oplossing.

https://www.rdw.nl/particulier/voertuigen/auto/de-kentekenplaat/het-kenteken-op-de-plaat/uitleg-over-de-cijfers-en-letters-op-de-kentekenplaat

*/

let el = document.getElementById('kenteken');
// start check
export const kentekenCheck = (kenteken) => {
  
if (typeof kenteken !== 'string') return;

// array regex patronen welke corresponderen met de formats uitgegegeven vanuit RDW
  
const arr = ['^([BDFGHJKLMNPRSTVWXYZ]{2})([0-9]{2})([0-9]{2})$',
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
const str = kenteken.toUpperCase();
let newStr = '';

  arr.forEach(regEx => {
 
    const re = new RegExp(regEx);
    const res = re.test(str);
  
    // match on regex pattern 
    if (res === true){
      newStr = str.replace(re, '$1-$2-$3');
      console.log(newStr);
    } 
  });
  
  return newStr;
}

// vervang het voorbeeld met een geldig kenteken zonder koppeltekens
// bijvoorbeeld 12TTHJ HFFF43 of 1KGF55 of G234TR H222GG
const result =  kentekenCheck('hfff43');
el.innerHTML = result;

