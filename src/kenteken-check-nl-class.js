export class KentekenCheck {

    constructor(kenteken = '', inputElm = null, outputElm = null, classValid = 'valid', message = 'XX-XX-XX') {
        this.newStr = '';
        this.kenteken = kenteken;
        this.valid = false;
        this.inputElm = inputElm;
        this.outputElm = outputElm;
        this.classValid = classValid;
        this.errorMessage = message;
        this.matchedPattern = "";
        this.arrRegEx = ['^([A-Z]|[^0-9CIOQ]{2})([0-9]{2})([0-9]{2})$', // XX9999 1951
            '^([0-9]{2})([0-9]{2})([A-Z]|[^0-9CIOQ]{2})$', // 9999XX 1965
            '^([0-9]{2})([A-Z]|[^0-9CIOQ]{2})([0-9]{2})$', // 99XX99 1973
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

        this.forbiddenCharacters = /^((?!GVD|KKK|KVT|LPF|NSB|PKK|PSV|TBS|SS|SD|PVV|SGP|VVD|FVD|BBB).){8}$/;
    }

    formatLicense() {
        if (typeof this.kenteken !== 'string') return;

        const str = this.kenteken.toUpperCase()
            .trim()
            .split('-')
            .join(''); // trim whitespace / strip dashes
        return this.showLicense(str);
    }

    matchLicense(str) {
        return this.arrRegEx.some((regEx) => {

            const re = new RegExp(regEx);
            const result = re.test(str);


            // match on regex pattern
            if (result) {
                this.matchedPattern = re;
                return true;
            }
            return false
        });
    }

    checkForbiddenCharacters(str) {
        return this.forbiddenCharacters.test(str);
    }

    showLicense(str) {

        // based on rdw demands
        // returns true immediately when found match : legacy browser proof IE 9/10/11, no polyfill needed
        const matchLicense = this.matchLicense(str);

        if (matchLicense) {
            this.valid = matchLicense;

            if (this.inputElm !== null) {
                this.inputElm.value = str.replace( this.matchedPattern, '$1-$2-$3');
                this.inputElm.classList.add(this.classValid);
            }
            this.newStr = str.replace( this.matchedPattern, '$1-$2-$3');

            const notForbidden = this.checkForbiddenCharacters(this.newStr)
            if (notForbidden) {
                this.showInContainer(this.newStr);
                return this.newStr;
            }

        }
        if (this.inputElm !== null) {
            this.inputElm.classList.remove(this.classValid);
        }
        this.valid = false;
        return this.showInContainer(this.errorMessage);

    }

    showInContainer(str) {
        if (this.outputElm !== null) {
            this.outputElm.innerText = str;
        }
        return str;
    }

    getValue(e) {
        if (e.target.value.length >= 6) {
            this.kenteken = e.target.value;
            this.formatLicense();
        }

    }

    bindInputListener(event = 'input') {
        if (this.inputElm !== null){
            this.inputElm.addEventListener(event, this.getValue.bind(this));
        }
    }

}

