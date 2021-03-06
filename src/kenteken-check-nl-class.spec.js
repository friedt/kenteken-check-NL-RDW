import {KentekenCheck} from './kenteken-check-nl-class';


describe('kenteken-check-class.js', function () {

    let arrRegEx;
    let inputElm;
    let outputElm;



    beforeAll( function(){

        inputElm = document.createElement('input');
        outputElm = document.createElement('div');
        document.body.insertAdjacentHTML('afterbegin', inputElm);
        document.body.insertAdjacentHTML('afterbegin', outputElm);

        const kt = new KentekenCheck();
        arrRegEx = kt.arrRegEx;

    });

    it('method "formatLicense" should return string', function () {
        const kt2 = new KentekenCheck('GFYY54', inputElm);
        inputElm.value = 'GFYY54';
        const e = {
            'target': {
                value : 'GFYY54'
            }
        }
        kt2.bindInputListener();
        kt2.getValue(e);

        expect(kt2.formatLicense()).toEqual('GF-YY-54');

    });

    it('this.inputElm should return null', function () {
        const kt2 = new KentekenCheck('GFYY54', inputElm);
        kt2.inputElm = null;
        kt2.showLicense('GFYY54');

        expect(kt2.inputElm).toBeNull();
    });

    it('method "formatLicense" should return valid string', function () {
        // order of arr is important while corresponding index arrRegEx array
       const arr = ['AB5643', '8765AG', '56TE54', 'GF88YY', 'HFFF43', '12HHGG', '12PTT8', '1KHH39', 'HG123R', 'G123TT', 'SGJ12P','8DP786', '765TT9'];
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
        const kt2 = new KentekenCheck('GFYY54', inputElm, outputElm, true);
        const e = {
            'target': {
                value : 'GFYY54'
            }
        }
        kt2.bindInputListener();
        kt2.getValue(e);

        expect(kt2.output).toEqual(true);

    });

    it('should give classValid a classname to default "valid"', function () {

        const kt2 = new KentekenCheck('1kgh45', inputElm);
        const classN = kt2.classValid;
        expect(classN).toEqual('valid');

    });

    it('method "formatLicense" should return a invalid sign XX-XX-XX', function () {
       const arr = ['VVD56T', 'SGP56T', '12359T', 'SD6677', 'GHFRP5', 'U123TT', 'PVV23R', '65F9F9', 'SS9988', '8SS765', '765SD9'];
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
