/* Ik heb deze kentekenCheck gebaseerd op de actuele formats(alle afgegeven kentekencombinaties) uitgegeven door de RDW, welke lijst is te vinden via bijgevoegde link. De oplossing kan ook ingezet worden als HTML5 validation only in het 'pattern' attribuut, zie html.
De open data API vd rdw retourneert geen koppeltekens in het kenteken voor zover bekend, dus vandaar deze oplossing.
De array van regex patronen correspondeert met de lijst van formats op de site vd RDW in bijgaande link.
De class declaratie 'KentekenCheck' kijkt of het een valide NL kenteken is, er worden geen klinkers meer gebruikt in de latere series en geen tekens die de RDW voorschrijft. Kentekens met AA en CD zijn in deze functie niet meegenomen, de letters C en Q mogen niet meer vd overheid ivm interpretatie problemen en zijn wel meegenomen.
Babel is nodig voor ondersteuning van legacy browsers zoals IE 10 /IE 11/Edge 13 etc.

Verboden combinaties: GVD, KKK, KVT, LPF, NSB, PKK, PSV, TBS, SS en SD (ook niet in lettercombinaties met 3 letters)
Vanaf serie 11: PVV, SGP en VVD verboden

De function Array.some is legacy browser proof.
https://www.rdw.nl/particulier/voertuigen/auto/de-kentekenplaat/het-kenteken-op-de-plaat/uitleg-over-de-cijfers-en-letters-op-de-kentekenplaat
 note: 'HTML5 input patterns don't accept flags so to get lowercase letters we need to add the uppercase and lowercase range (e.g. A-Za-z).'

 default parameters : use babel when support legacy IE
 https://babeljs.io/docs/en/babel-plugin-transform-parameters

MIT License
Copyright (c) 2020 Pepijn Friederichs
*/

const el = document.getElementById('kenteken') as HTMLDivElement;
const inputElm = document.getElementById('input-kenteken') as HTMLInputElement;


// start class KentekenCheck
class KentekenCheck {

  newStr: string;
  index: number;
  kenteken: string;
  inputElm: HTMLInputElement;
  output: boolean;
  outputElm: HTMLDivElement;
  classValid: string;
  arrRegEx: Array<string>;
  forbiddenCharacters: RegExp;

  constructor(kenteken: string, inputElm: HTMLInputElement, outputElm: HTMLDivElement, output = false, classValid = 'valid'){
      this.newStr = '';
      this.index = 0;
      this.output = output;
      this.kenteken = kenteken;
      this.inputElm = inputElm;
      this.outputElm = outputElm;
      this.classValid = classValid;
      this.arrRegEx = ['^([A-Z]{2})([0-9]{2})([0-9]{2})$', // XX9999
          '^([0-9]{2})([0-9]{2})([A-Z]{2})$', // 9999XX
          '^([0-9]{2})([A-Z]{2})([0-9]{2})$', // 99XX99
          '^([BDFGHJKLMNPRSTVWXYZ]{2})([0-9]{2})([BDFGHJKLMNPRSTVWXYZ]{2})$',// XX99XX
          '^([BDFGHJKLMNPRSTVWXYZ]{2})([BDFGHJKLMNPRSTVWXYZ]{2})([0-9]{2})$',// XXXX99
          '^([0-9]{2})([BDFGHJKLMNPRSTVWXYZ]{2})([BDFGHJKLMNPRSTVWXYZ]{2})$',// 99XXXX
          '^([0-9]{2})([BDFGHJKLMNPRSTVWXYZ]{3})([0-9]{1})$',// 99XXX9
          '^([0-9]{1})([BDFGHJKLMNPRSTVWXYZ]{3})([0-9]{2})$',// 9XXX99
          '^([BDFGHJKLMNPRSTVWXYZ]{2})([0-9]{3})([BDFGHJKLMNPRSTVWXYZ]{1})$',// XX999X
          '^([BDFGHJKLMNPRSTVWXYZ]{1})([0-9]{3})([BDFGHJKLMNPRSTVWXYZ]{2})$',// X999XX
          '^((?!PVV|VVD|SGP)[BDFGHJKLMNPRSTVWXYZ]{3})([0-9]{2})([BDFGHJKLMNPRSTVWXYZ]{1})$'];// XXX99X

      this.forbiddenCharacters = /^((?!GVD|KKK|KVT|LPF|NSB|PKK|PSV|TBS|SS|SD).){6}$/;
  }

    formatLicense() {
        if (typeof this.kenteken !== 'string') return;

        const str = this.kenteken.toUpperCase()
            .trim()
            .split('-')
            .join(''); // trim whitespace / strip dashes
        return this.showLicense(str);
    }

    matchLicense(str: string) {
        return this.arrRegEx.some(regEx => {

            const re = new RegExp(regEx);
            const res = re.test(str);
            const resLegal = this.forbiddenCharacters.test(str);

            // match on regex pattern
            if (res === true && resLegal === true) {
                this.inputElm.value = str.replace(re, '$1-$2-$3');
                this.inputElm.classList.add(this.classValid);
                this.newStr = str.replace(re, '$1-$2-$3');
                //console.log('new', this.newStr);
                return true;
            }
        });
    }

    showLicense(str: string) {

        // based on rdw demands
        // returns true immediately when found match : legacy browser proof IE 9/10/11, no polyfill needed
        const matchLicense = this.matchLicense(str);
        //console.log('match', matchLicense);
        if (matchLicense) {
            this.showInContainer(this.newStr);
            return this.newStr;
        }
        this.inputElm.classList.remove(this.classValid);
        this.showInContainer('XX-XX-XX')
        return 'XX-XX-XX';
    }

    showInContainer(str: string) {
        if (this.output) {
            this.outputElm.innerHTML = str;
        }
    }

    getValue(e: Event) {
        if ((e.target as HTMLInputElement).value.length >= 6) {
            this.kenteken = (e.target as HTMLInputElement).value;
            this.formatLicense();
        }

    }

    bindInputListener(event = 'input') {
        this.inputElm.addEventListener(event, this.getValue.bind(this));

    }

}

// vervang het voorbeeld met een geldig kenteken zonder/met verkeerd geplaatste koppeltekens
// bijvoorbeeld 12TTHJ HFFF43 of 1KGF55 of G234TR H222GG, HF-FF43 , G-234-TR
// om met performance rekening te houden kan wellicht het change event worden gebruikt

// let kt2 = new KentekenCheck('GFYY54', inputElm);
// kt2.license;
//
// inputElm.addEventListener('input', (e) => {
//
//   let kt = new KentekenCheck((e.target as HTMLInputElement).value, inputElm);
//   el.innerHTML = kt.license as string;
//
//  });





