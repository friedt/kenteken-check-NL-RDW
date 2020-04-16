import {KentekenCheck} from "./kenteken-check-class";

//jest.mock('./kenteken-check-class');


describe('kenteken-check-class.js', function () {

    let arrRegEx;
    let inputElm;
    let outputElm;



    beforeAll( function(){

        inputElm = document.createElement('input');
        outputElm = document.createElement('div');
        document.body.insertAdjacentHTML('afterbegin', inputElm);
        document.body.insertAdjacentHTML('afterbegin', outputElm);

        let kt = new KentekenCheck();
        arrRegEx = kt.arrRegEx;

    });

    it('method "license" should return string', function () {
        let kt2 = new KentekenCheck('GFYY54', inputElm);
        inputElm.value = 'GFYY54';
        const e = {
            'target': {
                value : 'GFYY54'
            }
        }
        kt2.bindInputListener();
        kt2.getValue(e);


        //jest.spyOn(kt2, 'license', 'get').mockReturnValue('GFYY54');
        expect(kt2.license()).toEqual('GF-YY-54');

    });

    it('method "license" should return valid string', function () {
        // order of arr is important while corresponding index arrRegEx array
        const arr = ['GF5643', '8765GG', '56TT54', 'GF88YY', 'HFFF43', '12HHGG', '12PTT8', '1KHH39', 'HG123R', 'G123TT', 'TRF12P'];
        arr.forEach((item, index) => {
            let kt2 = new KentekenCheck(item, inputElm);

            const e = {
                'target': {
                    value : item
                }
            }
            kt2.bindInputListener();
            kt2.getValue(e);

            const re = new RegExp(arrRegEx[index]);
            //jest.spyOn(kt2, 'license', 'get').mockReturnValue('GFYY54');
            const newStr = item.replace(re, '$1-$2-$3');


            //kt2.license;

            expect(kt2.license()).toEqual(newStr);
        });

    });

    it('method "license" should return undefined when not string', function () {
        let kt2 = new KentekenCheck(987, inputElm);


        //jest.spyOn(kt2, 'license', 'get').mockReturnValue('GFYY54');
        expect(kt2.license()).toBeUndefined();

    });

    it('method "showInContainer" should display license in the container', function () {
        let kt2 = new KentekenCheck('GFYY54', inputElm, outputElm, true);
        const e = {
            'target': {
                value : 'GFYY54'
            }
        }
        kt2.bindInputListener();
        kt2.getValue(e);


        //jest.spyOn(kt2, 'license', 'get').mockReturnValue('GFYY54');
        expect(kt2.output).toEqual(true);

    });

    it('method "license" should return a invalid sign XX-XX-XX', function () {
        const arr = ['VVD56T', '12359T', 'SD6677', 'GHFRP5', 'UF4534', '987JK9', 'U123TT', 'PVV23R', 'QG6544'];
        arr.forEach(item => {
            let kt2 = new KentekenCheck(item, inputElm);

            const e = {
                'target': {
                    value : item
                }
            }
            kt2.bindInputListener();
            kt2.getValue(e);

            //jest.spyOn(kt2, 'license', 'get').mockReturnValue('GFYY54');

            expect(kt2.license()).toEqual('XX-XX-XX');
        });


    })
});
