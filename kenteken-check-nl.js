  /* Ik heb deze kentekenCheck gebaseerd op de actuele formats(alle afgegeven kentekencombinaties) uitgegeven vanuit de RDW lijst welke is te vinden op bijgevoegde link. Voor een project had ik deze nodig en wilde het zelf even uitzoeken. Het doel was om het vooral simpel te houden. De oplossing kan ook ingezet worden als HTML5 validation only in het 'pattern' attribuut, zie html.
De open data API vd rdw retourneert geen koppeltekens in het kenteken voor zover ik weet, dus vandaar deze oplossing.
De array van regex patronen correspondeert exact met de lijst van formats op de site vd RDW in bijgaande link.
De functie 'kentekenCheck' kijkt of het een valide NL kenteken is, er worden geen klinkers gebruikt en geen tekens die de RDW voorschrijft. Kentekens met AA en CD zijn in deze functie niet meegenomen, de letters C en Q mogen niet meer vd overheid ivm interpretatie problemen en zijn wel meegenomen.

Verboden combinaties: GVD, KKK, KVT, LPF, NSB, PKK, PSV, TBS, SS en SD (ook niet in lettercombinaties met 3 letters)

De functie is legacy browser proof en kan ook door Array.find in te zetten, maar dan is een polyfill nodig, een 'for' loop met een break is ook een oplossing.

https://www.rdw.nl/particulier/voertuigen/auto/de-kentekenplaat/het-kenteken-op-de-plaat/uitleg-over-de-cijfers-en-letters-op-de-kentekenplaat

 note: 'HTML5 input patterns don't accept flags so to get lowercase letters we need to add the uppercase and lowercase range (e.g. A-Za-z).'

 default parameters : use babel when support legacy IE
 https://babeljs.io/docs/en/babel-plugin-transform-parameters

MIT License
Copyright (c) 2020 Pepijn Friederichs

*/

    const el = document.getElementById('kenteken');
    const inputEl = document.getElementById('input-kenteken');

    // start function kentekenCheck
    const kentekenCheck = (() => {

        let classValid = '';
        let newStr = '';
        let arrRegEx = ['^([BDFGHJKLMNPRSTVWXYZ]{2})([0-9]{2})([0-9]{2})$',
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

        let forbiddenCharacters = /^((?!GVD|KKK|KVT|LPF|NSB|PKK|PSV|TBS|SS|SD).){6}$/;

        // based on rdw demands
        // returns true immediately when found match : legacy browser proof IE 9/10/11, no polyfill needed
        const matchLicense = str => {
            return arrRegEx.some(regEx => {

                const re = new RegExp(regEx);
                const res = re.test(str);
                const resLegal = forbiddenCharacters.test(str);

                // match on regex pattern
                if (res === true && resLegal === true) {
                    inputEl.value = str.replace(re, '$1-$2-$3');
                    inputEl.classList.add(classValid);
                    newStr = str.replace(re, '$1-$2-$3');
                    return true;
                }
            });
        };


        const showLicense = (str) => {
            const match = matchLicense(str);

            if (match) {
                return newStr;
            }
            inputEl.classList.remove(classValid);
            return 'XX-XX-XX';
        };

        const getLicence = (licence, classV = 'valid') => {
            if (typeof licence !== 'string') return;

            classValid = classV;
            let str = licence.toUpperCase()
                .trim()
                .split('-')
                .join(''); // trim whitespace / strip dashes
            return showLicense(str);
        };

        return {
            getLicence,
        }


    })();

    // vervang het voorbeeld met een geldig kenteken zonder/met verkeerd geplaatste koppeltekens
    // bijvoorbeeld 12TTHJ HFFF43 of 1KGF55 of G234TR H222GG, HF-FF43 , G-234-TR
    
    // om met performance rekening te houden kan wellicht het change event worden gebruikt


    inputEl.addEventListener('input', (e) => {
        el.innerHTML = kentekenCheck.getLicence(e.target.value);
    });
