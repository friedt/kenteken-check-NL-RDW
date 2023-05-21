/**
 * @jest-environment jsdom
 */

import {KentekenCheck} from './kenteken-check-nl-class';

describe('kenteken-check-class.js', function () {

    let arrRegEx;
    let inputElm;
    let outputElm;

    beforeAll( function(){

        inputElm = document.createElement('input');
        outputElm = document.createElement('div');
        document.body.insertAdjacentElement('afterbegin', inputElm);
        document.body.insertAdjacentElement('afterbegin', outputElm);

        const kt = new KentekenCheck();
        arrRegEx = kt.arrRegEx;

    });

    it('method "formatLicense" should return string', function () {
        const kt2 = new KentekenCheck('GFPT54', inputElm);
        inputElm.value = 'GFPT54';
        const e = {
            'target': {
                value : 'GFPT54'
            }
        }
        kt2.bindInputListener();
        kt2.getValue(e);

        expect(kt2.formatLicense()).toEqual('GF-PT-54');

    });

    it('this.inputElm should return null', function () {
        const kt2 = new KentekenCheck('GFPT54', inputElm);
        kt2.inputElm = null;
        kt2.showLicense('GFPT54');

        expect(kt2.inputElm).toBeNull();
    });

    it('method "formatLicense" should return valid string', function () {
        // order of arr is important while corresponding index arrRegEx array
        const arr = ['AB5643', '8765AG', '56TE54', 'GF88YY', 'HSDF43', '12HHGG', '12PTT8', '1KHH39', 'VV123D', 'G123TT', 'SGJ12P','S88KKM','8DP786', '765PK9'];
        arr.forEach((item, index) => {
            const kt2 = new KentekenCheck(item, inputElm);

            const e = {
                'target': {
                    value : item
                }
            }
            kt2.bindInputListener();
            kt2.getValue(e);
            const valid = kt2.valid;

            const re = new RegExp(arrRegEx[index]);
            const newStr = item.replace(re, '$1-$2-$3');

            expect(kt2.formatLicense()).toEqual(newStr);
            expect(valid).toEqual(true);
        });

    });

    it('method "formatLicense" should return undefined when not string', function () {
        const kt2 = new KentekenCheck(987, inputElm);
        //jest.spyOn(kt2, 'license', 'get').mockReturnValue('GFYY54');
        expect(kt2.formatLicense()).toBeUndefined();

    });

    it('method "showInContainer" should display license in the container', function () {
        const kt2 = new KentekenCheck('GFPT54', inputElm, outputElm, true);
        const e = {
            'target': {
                value : 'GFPT54'
            }
        }
        kt2.bindInputListener();
        kt2.getValue(e);

        expect(kt2.outputElm.innerHTML).toEqual('GF-PT-54');

    });

    it('should give classValid a classname to default "valid"', function () {

        const kt2 = new KentekenCheck('1kgh45', inputElm);
        const classN = kt2.classValid;
        expect(classN).toEqual('valid');

    });

    it('method "formatLicense" should return a INVALID sign XX-XX-XX', function () {
        const arr = [ 'HJJ01L', 'VVD56R', 'VSP56T', 'SGP56T', '12359T', 'SD6677', 'P09988', 'GHFRP5', 'U123TT', 'PVV23R', '65F9F9', 'SS9988', '8ST765', '765LP9', 'TBS43P', 'PYYY0P', 'UKJJ99', 'KVT56R', 'KKK56R', 'LPF56R', 'NSB56R', 'PKK56R', 'PSV56R', 'PSS56R','S88KKK', 'P88SSD','1234YI', 'C69876', '654321', 'YT6765', '67C688', '87PO70', '4321OO', '5476P9', 'LYP66T', 'CP77PP'];
        arr.forEach(item => {
            const kt2 = new KentekenCheck(item, inputElm);

            const e = {
                'target': {
                    value : item
                }
            }
            kt2.bindInputListener();
            kt2.getValue(e);
            const valid = kt2.valid;
            expect(kt2.formatLicense()).toEqual('XX-XX-XX');
            expect(valid).toEqual(false);
        });


    })
});
