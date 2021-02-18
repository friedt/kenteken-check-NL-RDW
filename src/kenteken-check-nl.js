

const el = document.getElementById('kenteken');
const inputElm = document.getElementById('input-kenteken');

// start function kentekenCheck
const kentekenCheck = ((elm) => {

    let classValid = '';
    let classInvalid = '';
    let invalidString = '';
    let newStr = '';
    let index = 0;
    const arrRegEx = ['^([A-Z]{2})([0-9]{2})([0-9]{2})$', // XX9999
        '^([0-9]{2})([0-9]{2})([A-Z]{2})$', // 9999XX
        '^([0-9]{2})([A-Z]{2})([0-9]{2})$', // 99XX99
        '^([BDFGHJKLMNPRSTVWXYZ]{2})([0-9]{2})([BDFGHJKLMNPRSTVWXYZ]{2})$',// XX99XX
        '^([BDFGHJKLMNPRSTVWXYZ]{2})([BDFGHJKLMNPRSTVWXYZ]{2})([0-9]{2})$',// XXXX99
        '^([0-9]{2})([BDFGHJKLMNPRSTVWXYZ]{2})([BDFGHJKLMNPRSTVWXYZ]{2})$',// 99XXXX
        '^([0-9]{2})([BDFGHJKLMNPRSTVWXYZ]{3})([0-9]{1})$',// 99XXX9
        '^([0-9]{1})([BDFGHJKLMNPRSTVWXYZ]{3})([0-9]{2})$',// 9XXX99
        '^([BDFGHJKLMNPRSTVWXYZ]{2})([0-9]{3})([BDFGHJKLMNPRSTVWXYZ]{1})$',// XX999X
        '^([BDFGHJKLMNPRSTVWXYZ]{1})([0-9]{3})([BDFGHJKLMNPRSTVWXYZ]{2})$',// X999XX
        '^((?!PVV|VVD|SGP)[BDFGHJKLMNPRSTVWXYZ]{3})([0-9]{2})([BDFGHJKLMNPRSTVWXYZ]{1})$',// XXX99X 11
        '^([0-9]{1})([BDFGHJKLMNPRSTVWXYZ]{2})([0-9]{3})$',//9XX999 13
        '^([0-9]{3})([BDFGHJKLMNPRSTVWXYZ]{2})([0-9]{1})$'//999XX9 14
    ];

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
            elm.classList.remove(classInvalid);
            elm.classList.add(classValid);

            newStr = str.replace(re, '$1-$2-$3');
            return newStr; //kenteken
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
