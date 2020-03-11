# dead simple kenteken-check-NL / licenseplate nl / licenseplate dutch
NL Kenteken-check formats 2020 RDW written in javascript

# Information

Based regex licenseplate check on formats released by dutch RDW

# Toelichting

Ik heb deze kentekenCheck gebaseerd op de actuele formats(kentekencombinaties) uitgegeven door de RDW welke is te vinden op bijgevoegde link. Voor een project had ik deze nodig en wilde het zelf even uitzoeken. De open data API vd RDW 
retourneert geen koppeltekens in het kenteken voor zover ik weet, dus vandaar deze oplossing.
De array van regex patronen correspondeert exact met de lijst van formats op de site vd RDW in bijgaande link.
De functie 'kentekenCheck' kijkt of het een valide NL kenteken is, er worden geen klinkers gebruikt en geen tekens die de RDW voorschrijft. Kentekens met AA en CD zijn in deze functie niet meegenomen, de letters C en Q mogen niet meer vd overheid ivm interpretatie problemen en zijn wel meegenomen.

Array.some returns true wanneer eerste match is gevonden.
De functie Array.find kan ook, maar dan is een polyfill nodig, een 'for' loop met een break is bijv. ook een oplossing. 

https://www.rdw.nl/particulier/voertuigen/auto/de-kentekenplaat/het-kenteken-op-de-plaat/uitleg-over-de-cijfers-en-letters-op-de-kentekenplaat

