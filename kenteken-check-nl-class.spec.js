import {KentekenCheck} from "./kenteken-check-class.js";


describe('kenteken-check-class.js', function () {

    let arrRegEx;

    beforeAll( function(){
        let kt = new KentekenCheck();
        arrRegEx = kt.arrRegEx;
    });

    it('getter method "license" should return string', function () {
        let kt2 = new KentekenCheck('GFYY54');
        kt2.license;
        
        expect(kt2.license).toEqual('GF-YY-54');

    });

    it('getter method "license" should return valid string', function () {
        // order of arr is important while corresponding index arrRegEx array
        const arr = ['AF5643', '8765GE', '56TU54', 'GF88YZ', 'HFFF43', '12HHGG', '12PTT8', '1KHH39', 'HG123R', 'G123TT', 'TRF12P'];
        arr.forEach((item, index) => {

            const re = new RegExp(arrRegEx[index]);
            const newStr = item.replace(re, '$1-$2-$3');
            let kt2 = new KentekenCheck(item);
            kt2.license;

            expect(kt2.license).toEqual(newStr);
        });

    });

    it('getter method "license" should return undefined when not string', function () {
        let kt2 = new KentekenCheck(987);
        kt2.license;
       
        expect(kt2.license).toBeUndefined();

    });

    it('getter method "license" should return a invalid sign XX-XX-XX', function () {
        const arr = ['VVD56T', '12359T', 'SD6677', 'GHFRP5', 'HUFF34', '987JK9', 'U123TT', 'PVV23R', 'SSHH77', 'A675PP'];
        arr.forEach(item => {
            let kt2 = new KentekenCheck(item);
            kt2.license;

            expect(kt2.license).toEqual('XX-XX-XX');
        });


    })
});
