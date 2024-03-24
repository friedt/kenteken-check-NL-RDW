export declare class KentekenCheck {
    newStr: string;
    matchedPattern: RegExp | string;
    kenteken: string;
    valid: boolean;
    inputElm: HTMLInputElement | null;
    outputElm: HTMLElement | null;
    classValid: string;
    arrRegEx: Array<string>;
    forbiddenCharacters: RegExp;
    errorMessage: string;
    constructor(kenteken: string, inputElm?: HTMLInputElement, outputElm?: HTMLElement, classValid?: string, errorMessage?: string);
    formatLicense(): string;
    matchLicense(str: string): boolean;
    checkForbiddenCharacters(str: string): boolean;
    showLicense(str: string): string;
    showInContainer(str: string): string;
    getValue(e: Event): void;
    bindInputListener(event?: string): void;
}
