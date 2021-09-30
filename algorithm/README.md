# Største produkt algoritme

## Oppgavebeskrivelse
*Create a function that, given a list of integers, returns the highest product between three of those numbers.
For example, given the list [1, 10, 2, 6, 5, 3] the highest product would be 10 * 6 * 5 = 300*

## Tanker
Gitt at listen også kan inneholde negative heltall er det viktig at algoritmen sjekker om de to laveste tallene er høyere enn to av de tre høyeste tallene.
Dette gjøres ved å først sortere listen i stigende rekkefølge, for så å sammenligne produktet av de to laveste tallene multiplisert med det høyeste vs. 
produktet av de tre høyeste tallene. Deretter returneres det høyeste produktet.
