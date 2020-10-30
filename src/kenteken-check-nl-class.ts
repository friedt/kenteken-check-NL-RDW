
// start class KentekenCheck
export class KentekenCheck {

    newStr: string;
    index: number;
    kenteken: string;
    valid: boolean;
    inputElm: HTMLInputElement | undefined;
    output: boolean;
    outputElm: HTMLDivElement | undefined;
    classValid: string;
    arrRegEx: Array<string>;
    forbiddenCharacters: RegExp;

    constructor(kenteken: string, inputElm?: HTMLInputElement, outputElm?: HTMLDivElement, output = false, classValid = 'valid'){
        this.newStr = '';
        this.index = 0;
        this.output = output;
        this.kenteken = kenteken;
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

    showLicense(str: string) {

        // based on rdw demands
        // returns true immediately when found match : legacy browser proof IE 9/10/11, no polyfill needed
        const matchLicense = this.matchLicense(str);

        if (matchLicense) {
            this.valid = matchLicense;
            const re = new RegExp(this.arrRegEx[this.index]);
            if (this.inputElm !== undefined) {
                this.inputElm.value = str.replace(re, '$1-$2-$3');
                this.inputElm.classList.add(this.classValid);
            }
            this.newStr = str.replace(re, '$1-$2-$3');
            this.showInContainer(this.newStr);
            return this.newStr;
        }
        if (this.inputElm !== undefined) {
            this.inputElm.classList.remove(this.classValid);
        }
        this.valid = false;
        this.showInContainer('XX-XX-XX')
        return 'XX-XX-XX';
    }

    showInContainer(str: string) {
        if (this.output && this.outputElm !== undefined) {
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
        if (this.inputElm !== undefined) {
            this.inputElm.addEventListener(event, this.getValue.bind(this));
        }
    }

}





