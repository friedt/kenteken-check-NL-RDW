# dead simple valid kenteken-check-NL / licenseplate nl / licenseplate dutch
NL Kenteken-check formats 2020 RDW written in JavaScript, TypeScript or HTML5

# Information

Licenseplate-check / kenteken-check based on valid formats released by dutch RDW

# Toelichting

## Installation 

```shell
$ npm install
$ npm test


## JavaScript validatie oplossing

Ik heb deze kentekenCheck gebaseerd op de actuele formats(kentekencombinaties) uitgegeven door de RDW(Rijksdienst voor het Wegverkeer) welke zijn te vinden via bijgevoegde link. De open data API vd RDW 
retourneert geen koppeltekens in het kenteken voor zover bekend, dus vandaar deze oplossing.
De array van regex patronen correspondeert met de lijst van formats op de site vd RDW in bijgaande link.
De functie 'kentekenCheck' controleert of het ingevoerde kenteken correspondeert met het eerste valide patroon en retourneert vervolgens true en formatteert het kenteken. Indien false retourneert 'XX-XX-XX', er worden in de latere series geen klinkers gebruikt en geen karakters die de RDW voorschrijft. Kentekens met AA(Koningshuis) en CD(Corps Diplomatique) zijn in deze functie niet meegenomen, de letters C en Q mogen niet meer vd overheid ivm interpretatie problemen en zijn wel meegenomen.

Verboden combinaties: GVD, KKK, KVT, LPF, NSB, PKK, PSV, TBS, SS en SD (ook niet in lettercombinaties met 3 letters)
Verboden vanaf serie 11: PVV, SGP en VVD 

Array.some returns true wanneer eerste match is gevonden. Deze functie is legacy browser proof.
Een alternatief is Array.find of Array.findIndex (alleen moderne browsers), maar dan is een polyfill nodig, een 'for' loop met een break is bijv. ook een oplossing. 

https://www.rdw.nl/particulier/voertuigen/auto/de-kentekenplaat/het-kenteken-op-de-plaat/uitleg-over-de-cijfers-en-letters-op-de-kentekenplaat

## JavaScript methoden

Er is een keuzemogelijkheid geboden voor drie syntactische oplossingen, functionaliteit is hetzelfde:
- function (IIFE) 
- class declaratie
- TypeScript

## HTML5 validatie oplosssing

Het is ook mogelijk om HTML5 validatie middels het 'pattern' attribuut toe te passen, welke is toegevoegd in de broncode.

## Unit test in Jest/Jasmine

kenteken-check-nl-class.js is 100% covered by unit testing using Jest or Jasmine. 
`kenteken-check-nl-class.spec.js`will run in both frameworks without adaption of code.
These test frameworks are not part of the repository, `kenteken-check-nl-class.spec.js` contains the specs.

# English

Dutch(NL) licencecheck based on the official formats released by RDW (Rijksdienst voor het Wegverkeer) found behind the link added.
Two solutions are provided:

1. JavaScript/TypeScript(class or iife, with same functionality)
2. HTML5

The function 'kentekenCheck' returns true if a valid pattern is found and formats it, otherwise it returns 'XX-XX-XX', no vowels are accepted and no other characters that RDW described. Licenses with AA(Kingdome) and CD(corps diplomatique) are ignored in this function, characters C and Q are not allowed.

Forbidden combinations: GVD, KKK, KVT, LPF, NSB, PKK, PSV, TBS, SS en SD (also not in character combinations with 3 characters)

Forbidden as from latest serie 11: PVV, SGP and VVD 

# CSS

Some basic css

# Performance
It seems that using javascript class declaration is the less performant way (but most of times one uses babel to convert to es5)
https://jsperf.com/class-vs-iife/6
