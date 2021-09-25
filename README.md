# dead simple valid kenteken-check-NL / licenseplate nl / licenseplate dutch
NL Kenteken-check formats 2020 RDW written in JavaScript, TypeScript or HTML5. Since it is a es6 module, it can also be easily integrated in a js framework, like Vue, React or Angular.

### update 2021: 
series 13 + 14 added, serie 12 is not yet released by RDW. 
Character L and T not allowed from serie 11

# Information

Licenseplate-check / kenteken-check based on valid formats which have been released by the dutch RDW. The voertuigcategorie "personen auto's" has only been taken into account, so 'bestelwagens' and other categories are not yet taken into account

# Toelichting

## Installation 

```shell
$ npm install

```

## Import as npm module in your project

Om browser import issues te voorkomen van npm modules is het aanbevolen om een module bundler zoals Webpack te gebruiken.

```shell

npm install rdw-kenteken-check --save

import {KentekenCheck} from 'rdw-kenteken-check'
```
## Import typescript as npm module
```shell
import {KentekenCheck} from 'rdw-kenteken-check/src/kenteken-check-nl-class'
```

## Example

Start lokaal een webserver en open index.html in een browser
Moderne browsers ondersteunen es6 modules (import, export) out of the box.

```shell
import {KentekenCheck} from './kenteken-check-nl-class.js';


const outputElm = document.getElementById('kenteken');
const inputElm = document.getElementById('input-kenteken');

const kt = new KentekenCheck('', inputElm, outputElm, true);
kt.formatLicense();
kt.bindInputListener();

// format only
const kt2 = new KentekenCheck('JFK01P')
outputElm.innerHTML = kt2.formatLicense();

```

## Webpack server
start de webserver in js of ts mode, ga naar http://localhost:8080/
```shell

$ npm start
$ npm run start-ts

```

 
## Webpack builds
Om een build bundle te creëeren via Webpack zijn er twee mogelijkheden:
- build typescript
- build javascript

```shell
$ npm run build
$ npm run build-ts
```
Open index.html in de 'dist' folder in een browser
## JavaScript validatie oplossing

Deze kentekenCheck is gebaseerd op de actuele formats(kentekencombinaties) welke zijn uitgegeven door de RDW(Rijksdienst voor het Wegverkeer) en welke zijn te vinden via bijgevoegde link. De open data API vd RDW 
retourneert geen koppeltekens in het kenteken voor zover bekend, dus vandaar deze oplossing.
De array van regex patronen correspondeert met de lijst van formats op de site vd RDW in bijgaande link.
De functie 'kentekenCheck' controleert of het ingevoerde kenteken correspondeert met het eerste valide patroon en retourneert vervolgens true en formatteert het kenteken. Indien false retourneert 'XX-XX-XX', er worden in de latere series geen klinkers gebruikt en geen karakters die de RDW voorschrijft. Kentekens met AA(Koningshuis) en CD(Corps Diplomatique) zijn in deze functie niet meegenomen, de letters C en Q mogen niet meer vd overheid ivm interpretatie problemen en zijn wel meegenomen.

Verboden combinaties: GVD, KKK, KVT, LPF, NSB, PKK, PSV, TBS, SS en SD (ook niet in lettercombinaties met 3 letters)
Verboden vanaf serie 11: PVV, SGP en VVD 
https://www.rdw.nl/particulier/voertuigen/auto/de-kentekenplaat/het-kenteken-op-de-plaat/uitleg-over-de-cijfers-en-letters-op-de-kentekenplaat

## JavaScript methoden

Er is een keuzemogelijkheid geboden voor drie syntactische oplossingen, functionaliteit is hetzelfde:
- function (IIFE) 
- class declaratie (es6 module)
- TypeScript (class declaratie / es6 module)
 

## HTML5 validatie oplosssing

Het is ook mogelijk om HTML5 validatie middels het 'pattern' attribuut toe te passen, welke is toegevoegd in de broncode.

## Unit test in Jest/Jasmine

kenteken-check-nl-class.js is 100% gecovered door unit testing met gebruik van Jest or Jasmine. 
`kenteken-check-nl-class.spec.js` runt in beide frameworks zonder aanpassingen.
Jest is onderdeel van de repository, `kenteken-check-nl-class.spec.js` bevat de specs.

```shell
$ npm test
```

## Linters

om compile errors te triggeren in TypeScript files is het 'tsc' commando nauwkeuriger

```shell
$ npm run eslint
$ npm run tslint
$ tsc
```

# English

Dutch(NL) licencecheck based on the official formats which are released by the RDW (Rijksdienst voor het Wegverkeer) found behind the link added.
Two solutions are provided:

1. JavaScript/TypeScript(class or iife, with same functionality)
2. HTML5

The function 'kentekenCheck' returns true if a valid pattern is found and formats it, otherwise it returns 'XX-XX-XX', no vowels are accepted and no other characters that RDW described. Licenses with AA(Kingdome) and CD(corps diplomatique) are ignored in this function, characters C and Q are not allowed.

Forbidden combinations: GVD, KKK, KVT, LPF, NSB, PKK, PSV, TBS, SS en SD (also not in character combinations with 3 characters)

Forbidden as from latest serie 11: PVV, SGP and VVD 

# CSS

Some basic css

# Font

Used font:
LeFly Fonts
https://www.dafont.com/kenteken.font  


