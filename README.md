# dead simple valid kenteken-check-NL / licenseplate nl / licenseplate dutch
NL Kenteken-check formats 2020 RDW written in JavaScript and HTML5

# Information

Licenseplate-check / kenteken-check based on valid formats released by dutch RDW

# Toelichting

## JavaScript validatie oplossing

Ik heb deze kentekenCheck gebaseerd op de actuele formats(kentekencombinaties) uitgegeven door de RDW(Rijksdienst voor het Wegverkeer) welke is te vinden op bijgevoegde link. Voor een project had ik deze nodig en wilde het zelf even uitzoeken. De open data API vd RDW 
retourneert geen koppeltekens in het kenteken voor zover ik weet, dus vandaar deze oplossing.
De array van regex patronen correspondeert exact met de lijst van formats op de site vd RDW in bijgaande link.
De functie 'kentekenCheck' kijkt of het een valide NL kenteken is and retourneert meteen true als een patroon valide is, en zo niet 'XX-XX-XX', er worden geen klinkers gebruikt en geen karakters die de RDW voorschrijft. Kentekens met AA(Koningshuis) en CD(Corps Diplomatique) zijn in deze functie niet meegenomen, de letters C en Q mogen niet meer vd overheid ivm interpretatie problemen en zijn wel meegenomen.

Verboden combinaties: GVD, KKK, KVT, LPF, NSB, PKK, PSV, TBS, SS en SD (ook niet in lettercombinaties met 3 letters)

Array.some returns true wanneer eerste match is gevonden. Deze functie is legacy browser proof.
De functie Array.find is een andere optie(moderne browsers), maar dan is een polyfill nodig, een 'for' loop met een break is bijv. ook een oplossing. 

https://www.rdw.nl/particulier/voertuigen/auto/de-kentekenplaat/het-kenteken-op-de-plaat/uitleg-over-de-cijfers-en-letters-op-de-kentekenplaat

## javascript methoden

Er is een keuzemogelijkheid geboden voor twee syntactische oplossingen:
- function (IIFE) 
- class declaratie

## HTML5 validatie oplosssing

Het is ook mogelijk om HTML5 validatie middels het 'pattern' attribuut toe te passen, welke is toegevoegd in de broncode.

# English

Dutch(NL) licencecheck based on the official formats released by RDW (Rijksdienst voor het Wegverkeer) found behind the link added.
There are two solutions:

1. JavaScript
2. HTML5

The function 'kentekenCheck' returns true if a valid pattern is found, otherwise it returns 'XX-XX-XX', no vowels are accepted and no other characters that RDW described. Licenses with AA(Kingdome) and CD(corps diplomatique) are ignored in this function, characters C and Q are not allowed.

# CSS

Some basic css
