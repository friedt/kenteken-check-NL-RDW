/* Ik heb deze kentekenCheck gebaseerd op de actuele formats(alle afgegeven kentekencombinaties) uitgegeven vanuit de RDW lijst welke is te vinden op bijgevoegde link. Voor een project had ik deze nodig en wilde het zelf even uitzoeken. Het doel was om het vooral simpel te houden. 
De open data API vd rdw retourneert geen koppeltekens in het kenteken voor zover ik weet, dus vandaar deze oplossing.
De array van regex patronen correspondeert exact met de lijst van formats op de site vd RDW in bijgaande link.
De functie 'kentekenCheck' kijkt of het een valide NL kenteken is, er worden geen klinkers gebruikt en geen tekens die de RDW voorschrijft. Kentekens met AA en CD zijn in deze functie niet meegenomen, de letters C en Q mogen niet meer vd overheid ivm interpretatie problemen en zijn wel meegenomen.

De functie kan nog wat geoptimaliseerd worden door Array.find of Array.some, maar dan is een polyfill nodig  een for loop met een break is ook een oplossing.

https://www.rdw.nl/particulier/voertuigen/auto/de-kentekenplaat/het-kenteken-op-de-plaat/uitleg-over-de-cijfers-en-letters-op-de-kentekenplaat

*/

let el = document.getElementById('kenteken');

// start function kentekenCheck
const kentekenCheck = (kenteken) => {
  
  if (typeof kenteken !== 'string') return;

  kenteken = kenteken.trim().split('-').join(''); // trim whitespace / strip dashes

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


    // returns true immediately when found match : legacy browser proof
    let matchLicense = arr.some(regEx => {

      const re = new RegExp(regEx);
      const res = re.test(str);

      // match on regex pattern 
      if (res === true){
        newStr = str.replace(re, '$1-$2-$3');
        return true;
      } 
    });
  
  if (matchLicense){
    return newStr;
  } else {
    return newStr = 'Ongeldig kenteken'
  }
    
}

// vervang het voorbeeld met een geldig kenteken zonder/met verkeerd geplaatste koppeltekens
// bijvoorbeeld 12TTHJ HFFF43 of 1KGF55 of G234TR H222GG, HF-FF43 , G-234-TR
// uncomment both rules below to not use the input field
//const result =  kentekenCheck('G244TR');
//el.innerHTML = result;


// om performance wat te verbeteren is het change event gebruikt
document.getElementById('input-kenteken').addEventListener('change', (e) => {
  el.innerHTML = kentekenCheck(e.target.value);
  
});



