import {KentekenCheck} from './kenteken-check-nl-class-ts';

describe('kenteken-check-class-ts.ts', function () {

    let arrRegEx: string[];
    let inputElm: HTMLInputElement;
    let outputElm: HTMLElement;

    beforeAll( function(){

        inputElm = document.createElement('input') as HTMLInputElement;
        outputElm = document.createElement('span') as HTMLElement;
        document.body.insertAdjacentElement('afterbegin', inputElm);
        document.body.insertAdjacentElement('afterbegin', outputElm);

        const kt = new KentekenCheck("");
        arrRegEx = kt.arrRegEx;

    });

    it('method "formatLicense" should return a valid dutch kenteken/license', function () {
        const kt2 = new KentekenCheck('GFPT54', inputElm);
        inputElm.value = 'GFPT54';
        const e = {
            'target': {
                value : 'GFPT54'
            }
        } as any;
        kt2.bindInputListener();
        kt2.getValue(e);

        expect(kt2.formatLicense()).toEqual('GF-PT-54');

    });

    it('this.inputElm should return null', function () {
        const kt2 = new KentekenCheck('GFYY54', inputElm);
        kt2.inputElm = null;
        kt2.showLicense('GFYY54');

        expect(kt2.inputElm).toBeNull();
    });

    it('method "formatLicense" should return valid dutch license(kenteken)', function () {
        // order of arr is important while corresponding index arrRegEx array
       const arr = ['AB5643', '8765AG', '56TE54', 'GF88YT', 'HSDF43', '12HHGG', '12PTT8', '1KHH39', 'VV123D', 'G123TT', 'SGJ12P','S88KKM','8DP786', '765PK9'];
        arr.forEach((item, index) => {
            const kt2 = new KentekenCheck(item, inputElm);

            const e = {
                'target': {
                    value : item
                }
            } as any
            kt2.bindInputListener();
            kt2.getValue(e);
            const valid = kt2.valid;

            const re = new RegExp(arrRegEx[index]);
            const newStr = item.replace(re, '$1-$2-$3');

            expect(kt2.formatLicense()).toEqual(newStr);
            expect(valid).toEqual(true);


        });

    });


    it('method "showInContainer" should display license/kenteken in the container', function () {
        const kt2 = new KentekenCheck('GFTR54', inputElm, outputElm);
        const e = {
            'target': {
                value : 'GFTR54'
            }
        } as any;
        kt2.bindInputListener();
        kt2.getValue(e);
        expect(outputElm.innerText).toEqual('GF-TR-54');


    });

    it('should give classValid a classname to default "valid"', function () {

        const kt2 = new KentekenCheck('1kgh45', inputElm);
        const classN = kt2.classValid;
        expect(classN).toEqual('valid');


    });

    it('method "formatLicense" should return a INVALID sign XX-XX-XX on all invalid licenses(kenteken)', function () {
       const arr = [ 'HJJ01I', 'VVD56R', 'VSP56O', 'SGP56T', '12359T', 'SD6677', 'P09988', 'GHFRP5', 'U123TT', 'PVV23R', '65F9F9', 'SS9988', '8SU765', '765IP9', 'TBS43P', 'PYYY0P', 'UKJJ99', 'KVT56R', 'KKK56R', 'LPF56R', 'NSB56R', 'PKK56R', 'PSV56R', 'PSS56R','S88KKK', 'P88SSD','1234YI', 'C69876', '654321', 'YT6765', '67C688', '87PO70', '4321OO', '5476P9', 'LYP66T','CP77PP', '', 'FVD23G', 'BBB99K'];
        arr.forEach(item => {
            const kt2 = new KentekenCheck(item, inputElm, outputElm);

            const e = {
                'target': {
                    value : item
                }
            } as any;
            kt2.bindInputListener();
            kt2.getValue(e);
            const valid = kt2.valid;
            expect(kt2.formatLicense()).toEqual('XX-XX-XX');
            expect(valid).toEqual(false);
            expect(outputElm.innerText).toEqual('XX-XX-XX');

        });


    })

    it('"outputElm" should return a INVALID text "Geen geldig kenteken"', function () {
        const arr = [ 'HJJ01U', 'VVD56R', 'VSP56O', '1BBB23']
        arr.forEach(item => {
            const kt2 = new KentekenCheck(item, inputElm, outputElm, 'valid', 'Geen geldig kenteken');

            const e = {
                'target': {
                    value : item
                }
            } as any;
            kt2.bindInputListener();
            kt2.getValue(e);
            const valid = kt2.valid;

            expect(valid).toEqual(false);
            expect(outputElm.innerText).toEqual('Geen geldig kenteken');
            //expect(outputElm).toMatchSnapshot()
        });
    })
});
