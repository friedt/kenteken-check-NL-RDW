# kenteken-check-NL
NL Kenteken-check formats 2020 RDW

# Toelichting
Ik heb deze kentekenCheck gebaseerd op de actuele formats uitgegeven vanuit de RDW lijst welke is te vinden op 
bijgevoegde link. Voor een project had ik deze nodig en wilde het zelf even uitzoeken. De open data API vd RDW 
retourneert geen koppeltekens in het kenteken voor zover ik weet, dus vandaar deze oplossing.
De array van regex patronen correspondeert exact met de lijst van formats op de site vd RDW in bijgaande link.
De functie 'kentekenCheck' kijkt of het een valide NL kenteken is, er worden geen klinkers gebruikt en geen tekens die de RDW voorschrijft. Kentekens met AA en CD zijn in deze functie niet meegenomen, de letters C en Q mogen niet meer vd overheid ivm interpretatie problemen en zijn wel meegenomen.

De functie kan nog wat geoptimaliseerd worden door Array.find of Array.some, maar dan is een polyfill nodig  een for loop met een break is ook een oplossing.

https://www.rdw.nl/particulier/voertuigen/auto/de-kentekenplaat/het-kenteken-op-de-plaat/uitleg-over-de-cijfers-en-letters-op-de-kentekenplaat

