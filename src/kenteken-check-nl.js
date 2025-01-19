const el = document.getElementById('kenteken');
const inputElm = document.getElementById('input-kenteken');

// start function kentekenCheck
const kentekenCheck = ((elm) => {

    let classValid = '';
    let classInvalid = '';
    let invalidString = '';
    let newStr = '';
    let matchedPattern = "";
    const arrRegEx = ['^([A-Z]|[^0-9CIOY]{2})([0-9]{2})([0-9]{2})$', // XX9999 1951
        '^([0-9]{2})([0-9]{2})([A-Z]|[^0-9CIOY]{2})$', // 9999XX 1965
        '^([0-9]{2})([A-Z]|[^0-9CIOY]{2})([0-9]{2})$', // 99XX99 1973
        '^([BDFGHJKLMNPRSTVWXYZ]{2})([0-9]{2})([BDFGHJKLMNPRSTVWXYZ]{2})$',// XX99XX 1978
        '^([BDFGHJKLMNPRSTVWXZ]{2})([BDFGHJKLMNPRSTVWXZ]{2})([0-9]{2})$',// XXXX99 1991
        '^([0-9]{2})([BDFGHJKLMNPRSTVWXZ]{2})([BDFGHJKLMNPRSTVWXZ]{2})$',// 99XXXX 1999
        '^([0-9]{2})([BDFGHJKLMNPRSTVWXZ]{3})([0-9]{1})$',// 99XXX9 2008
        '^([0-9]{1})([BDFGHJKLMNPRSTVWXZ]{3})([0-9]{2})$',// 9XXX99 2013
        '^([BDFGHJKLMNPRSTVWXZ]{2})([0-9]{3})([BDFGHJKLMNPRSTVWXZ]{1})$',// XX999X 2015
        '^([BDFGHJKLMNPRSTVWXZ]{1})([0-9]{3})([BDFGHJKLMNPRSTVWXZ]{2})$',// X999XX 2019
        '^([BDFGHJKLMNPRSTVWXZ]{3})([0-9]{2})([BDFGHJKLMNPRSTVWXZ]{1})$',// XXX99X 11 2024
        '^([BDFGHJKMNPRSVWXZ]{1})([0-9]{2})([BDFGHJKLMNPRSTVWXZ]{3})$',// X99XXX 12 2021
        '^([0-9]{1})([BDFGHJKLMNPRSTVWXZ]{2})([0-9]{3})$',//9XX999 13
        '^([0-9]{3})([BDFGHJKLMNPRSTVWXZ]{2})([0-9]{1})$'//999XX9 14
    ];

    const forbiddenCharacters = /^((?!GVD|KKK|KVT|LPF|NSB|PKK|PSV|TBS|SS|SD|PVV|SGP|VVD|FVD|BBB).){8}$/;

    // based on rdw demands
    // returns true immediately when found match : legacy browser proof IE 9/10/11, no polyfill needed
    const matchLicense = str => {
        return arrRegEx.some((regEx) => {

            const re = new RegExp(regEx);
            const result = re.test(str);


            // match on regex pattern
            if (result) {
                matchedPattern = re;
                return true;
            }
        });
    };

    const checkForbiddenCharacters = (str) => {
        return forbiddenCharacters.test(str);
    }


    const showLicense = (str) => {
        const match = matchLicense(str);

        if (match) {


            elm.value = str.replace(matchedPattern, '$1-$2-$3');
            elm.classList.remove(classInvalid);
            elm.classList.add(classValid);

            newStr = str.replace(matchedPattern, '$1-$2-$3');
            const notForbidden = checkForbiddenCharacters(newStr)
            if (notForbidden) {
                return newStr;
            }
        }

        elm.classList.remove(classValid);
        elm.classList.add(classInvalid);

        return invalidString; // XX-XX-XX
    };

    const getLicense = (license, classV = 'valid', classInv = 'invalid', invalidStr = 'XX-XX-XX') => {
        if (typeof license !== 'string') return;

        classValid = classV;
        classInvalid = classInv;
        invalidString = invalidStr;
        const str = license.toUpperCase()
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


// om met performance rekening te houden kan wellicht ook het change event worden gebruikt

//default example

el.innerHTML = kentekenCheck.getLicense('S007JB');


inputElm.addEventListener('input', (e) => {
    // returns string
    if (e.target.value.length >= 6){
        const license =  kentekenCheck.getLicense(e.target.value);
        el.innerHTML = license;
    }
});
