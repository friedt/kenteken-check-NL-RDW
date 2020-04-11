  /* Ik heb deze kentekenCheck gebaseerd op de actuele formats(alle afgegeven kentekencombinaties), uitgegeven door de RDW, welke lijst is te vinden via bijgevoegde link. Voor een project had ik deze nodig en wilde het zelf even uitzoeken. De oplossing kan ook ingezet worden als HTML5 validation only in het 'pattern' attribuut, zie html.
De open data API vd rdw retourneert geen koppeltekens in het kenteken voor zover bekend, dus vandaar deze oplossing.
De array van regex patronen correspondeert exact met de lijst van formats op de site vd RDW in bijgaande link.
De functie 'kentekenCheck' kijkt of het een valide NL kenteken is, er worden geen klinkers gebruikt en geen tekens die de RDW voorschrijft. Kentekens met AA en CD zijn in deze functie niet meegenomen, de letters C en Q mogen niet meer vd overheid ivm interpretatie problemen en zijn wel meegenomen.

Verboden combinaties: GVD, KKK, KVT, LPF, NSB, PKK, PSV, TBS, SS en SD (ook niet in lettercombinaties met 3 letters)

serie 11: PVV, SGP en VVD verboden

De functie Array.some is legacy browser proof.

https://www.rdw.nl/particulier/voertuigen/auto/de-kentekenplaat/het-kenteken-op-de-plaat/uitleg-over-de-cijfers-en-letters-op-de-kentekenplaat

 note: 'HTML5 input patterns don't accept flags so to get lowercase letters we need to add the uppercase and lowercase range (e.g. A-Za-z).'
 
 default className: 'valid' can be overwritten in function call

 default parameters: use babel when support legacy IE
 https://babeljs.io/docs/en/babel-plugin-transform-parameters

MIT License
Copyright (c) 2020 Pepijn Friederichs

*/

    const el = document.getElementById('kenteken');
    const inputElm = document.getElementById('input-kenteken');

    // start function kentekenCheck
    const kentekenCheck = ((elm) => {

        let classValid = '';
        let newStr = '';
        let index = 0;
        const arrRegEx = ['^([BDFGHJKLMNPRSTVWXYZ]{2})([0-9]{2})([0-9]{2})$', // XX9999 
               '^([0-9]{2})([0-9]{2})([BDFGHJKLMNPRSTVWXYZ]{2})$', // 9999XX 
               '^([0-9]{2})([BDFGHJKLMNPRSTVWXYZ]{2})([0-9]{2})$', // 99XX99 
               '^([BDFGHJKLMNPRSTVWXYZ]{2})([0-9]{2})([BDFGHJKLMNPRSTVWXYZ]{2})$',// XX99XX 
               '^([BDFGHJKLMNPRSTVWXYZ]{2})([BDFGHJKLMNPRSTVWXYZ]{2})([0-9]{2})$',// XXXX99 
               '^([0-9]{2})([BDFGHJKLMNPRSTVWXYZ]{2})([BDFGHJKLMNPRSTVWXYZ]{2})$',// XX9999
               '^([0-9]{2})([BDFGHJKLMNPRSTVWXYZ]{3})([0-9]{1})$',// 99XXX9
               '^([0-9]{1})([BDFGHJKLMNPRSTVWXYZ]{3})([0-9]{2})$',// 9XXX99
               '^([BDFGHJKLMNPRSTVWXYZ]{2})([0-9]{3})([BDFGHJKLMNPRSTVWXYZ]{1})$',// XX999X
               '^([BDFGHJKLMNPRSTVWXYZ]{1})([0-9]{3})([BDFGHJKLMNPRSTVWXYZ]{2})$',// X999XX
               '^((?!PVV|VVD|SGP)[BDFGHJKLMNPRSTVWXYZ]{3})([0-9]{2})([BDFGHJKLMNPRSTVWXYZ]{1})$'];// XXX99X

        const forbiddenCharacters = /^((?!GVD|KKK|KVT|LPF|NSB|PKK|PSV|TBS|SS|SD).){6}$/;

        // based on rdw demands
        // returns true immediately when found match : legacy browser proof IE 9/10/11, no polyfill needed
        const matchLicense = str => {
            return arrRegEx.some((regEx, i) => {

                const re = new RegExp(regEx);
                const res = re.test(str);
                const resLegal = forbiddenCharacters.test(str);

                // match on regex pattern
                if (res === true && resLegal === true) {
                    index = i;
                    return true;
                }
            });
        };


        const showLicense = (str) => {
            const match = matchLicense(str);

            if (match) {
                const re = new RegExp(arrRegEx[index]);
                elm.value = str.replace(re, '$1-$2-$3');
                elm.classList.add(classValid);
                newStr = str.replace(re, '$1-$2-$3');
                return newStr;
            }
            elm.classList.remove(classValid);
            return 'XX-XX-XX';
        };

        const getLicense = (license, classV = 'valid') => {
            if (typeof license !== 'string') return;

            classValid = classV;
            let str = license.toUpperCase()
                .trim()
                .split('-')
                .join(''); // trim whitespace / strip dashes
            return showLicense(str);
        };

        return {
            getLicense,
        }


    })(inputElm);

    // vervang het voorbeeld met een geldig kenteken zonder/met verkeerd geplaatste koppeltekens
    // bijvoorbeeld 12TTHJ HFFF43 of 1KGF55 of G234TR H222GG, HF-FF43 , G-234-TR
    

    // om met performance rekening te houden kan wellicht het change event worden gebruikt


    inputElm.addEventListener('input', (e) => {
        el.innerHTML = kentekenCheck.getLicense(e.target.value);
    });
