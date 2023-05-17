export class KentekenCheck {

    newStr: string;
    index: number;
    kenteken: string;
    valid: boolean;
    inputElm: HTMLInputElement | null;
    output: boolean;
    outputElm: HTMLDivElement | null;
    classValid: string;
    arrRegEx: Array<string>;
    forbiddenCharacters: RegExp;
    errorMessage: string;

    constructor(kenteken: string, inputElm?: HTMLInputElement, outputElm?: HTMLDivElement, output = false, classValid = 'valid', errorMessage = 'XX-XX-XX') {
        this.newStr = '';
        this.index = 0;
        this.output = output;
        this.kenteken = kenteken;
        this.valid = false;
        this.inputElm = inputElm ?? null;
        this.outputElm = outputElm ?? null;
        this.classValid = classValid;
        this.errorMessage = errorMessage;
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
            '^([BDFGHJKMNPRSVWXYZ]{3})([0-9]{2})([BDFGHJKMNPRSVWXYZ]{1})$',// XXX99X 11
            '^([BDFGHJKLMNPRSTVWXYZ]{1})([0-9]{2})([BDFGHJKLMNPRSTVWXYZ]{3})$',// X99XXX 12
            '^([0-9]{1})([BDFGHJKMNPRSVWXYZ]{2})([0-9]{3})$',//9XX999 13
            '^([0-9]{3})([BDFGHJKMNPRSVWXYZ]{2})([0-9]{1})$'//999XX9 14
        ];

        this.forbiddenCharacters = /^((?!GVD|KKK|KVT|LPF|NSB|PKK|PSV|TBS|SS|SD|PVV|SGP|VVD).){8}$/;
    }

    formatLicense(): string {
        const str = this.kenteken.toUpperCase()
            .trim()
            .split('-')
            .join(''); // trim whitespace / strip dashes
        return this.showLicense(str);
    }

    matchLicense(str: string): boolean {
        return this.arrRegEx.some((regEx, i) => {

            const re = new RegExp(regEx);
            const result = re.test(str);


            // match on regex pattern
            if (result) {
                this.index = i;
                return true;
            }

            return false;
        });
    }

    checkForbiddenCharacters(str: string): boolean {
        return this.forbiddenCharacters.test(str);
    }

    showLicense(str: string): string {

        // based on rdw demands
        // returns true immediately when found match : legacy browser proof IE 9/10/11, no polyfill needed
        const matchLicense = this.matchLicense(str);

        if (matchLicense) {
            this.valid = matchLicense;
            const re = new RegExp(this.arrRegEx[this.index]);
            if (this.inputElm) {
                this.inputElm.value = str.replace(re, '$1-$2-$3');
                this.inputElm.classList.add(this.classValid);
            }
            this.newStr = str.replace(re, '$1-$2-$3');
            const notForbidden = this.checkForbiddenCharacters(this.newStr)
            if (notForbidden) {
                this.showInContainer(this.newStr);
                return this.newStr;
            }
        }

        this.inputElm?.classList.remove(this.classValid);

        this.valid = false;
        return this.showInContainer(this.errorMessage);

    }

    showInContainer(str: string): string {
        if (this.output && this.outputElm) {
            this.outputElm.innerHTML = str;
        }
        return str;
    }


    getValue(e: Event): void {
        if ((e.target as HTMLInputElement).value.length >= 6) {
            this.kenteken = (e.target as HTMLInputElement).value;
            this.formatLicense();
        }

    }


    bindInputListener(event = 'input'): void {
        this.inputElm?.addEventListener(event, this.getValue.bind(this));
    }

}





