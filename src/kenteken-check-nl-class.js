
export class KentekenCheck {

    constructor(kenteken = '', inputElm = null, outputElm = null, output = false, classValid = 'valid') {
        this.newStr = '';
        this.output = output;
        this.kenteken = kenteken;
        this.index = 0;
        this.valid = false;
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
            '^((?!PVV|VVD|SGP)[BDFGHJKMNPRSVWXYZ]{3})([0-9]{2})([BDFGHJKMNPRSVWXYZ]{1})$',// XXX99X 11
            '^([0-9]{1})([BDFGHJKMNPRSVWXYZ]{2})([0-9]{3})$',//9XX999 13
            '^([0-9]{3})([BDFGHJKMNPRSVWXYZ]{2})([0-9]{1})$'//999XX9 14
        ];

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

    matchLicense(str) {
        return this.arrRegEx.some((regEx, i) => {

            const re = new RegExp(regEx);
            const res = re.test(str);
            const resLegal = this.forbiddenCharacters.test(str);

            // match on regex pattern
            if (res === true && resLegal === true) {
                this.index = i;
                return true;
            }
        });
    }

    showLicense(str) {

        // based on rdw demands
        // returns true immediately when found match : legacy browser proof IE 9/10/11, no polyfill needed
        const matchLicense = this.matchLicense(str);

        if (matchLicense) {
            this.valid = matchLicense;
            const re = new RegExp(this.arrRegEx[this.index]);
            if (this.inputElm !== null) {
                this.inputElm.value = str.replace(re, '$1-$2-$3');
                this.inputElm.classList.add(this.classValid);
            }
            this.newStr = str.replace(re, '$1-$2-$3');
            this.showInContainer(this.newStr);
            return this.newStr;
        }
        if (this.inputElm !== null) {
            this.inputElm.classList.remove(this.classValid);
        }
        this.valid = false;
        this.showInContainer('XX-XX-XX')
        return 'XX-XX-XX';
    }

    showInContainer(str) {
        if (this.output && this.outputElm !== null) {
            this.outputElm.innerHTML = str;
        }
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

