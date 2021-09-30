# Oslo bysykkel applikasjon

Dette er en applikasjon som henter sanntidsdata fra Oslo Bysykkel sitt sanntidsapi, og viser alle stasjoner samt ledige sykler på et kart. Brukere kan også søke etter nærmeste stasjon ved å bruke søkefunksjonaliteten på høyre sidebar.

## Oppgavebeskrivelse
*Oslo city bikes has an open API showing real-time data on location and state of the bike stations.*

*Your task is to create a small application that utilizes this api to show the stations and the amount of available bikes and free spots a station currently has. You’re free to choose which language and libraries you use. How you show the stations and status is also up to you.*

## Forhåndsvisning
![Forhåndsvisning](https://github.com/simenkristoff/ardoq_task/blob/main/app/Preview.jpg)


## Miljøvariabler
For å kjøre prosjektet må du først ha en *.env* fil. Denne filen kan du lage ved å kopiere innholdet fra [.env.example](./.env.example).

## Kommandoer

### `npm run start`

Starter både klient og server i utviklermodus.
Klienten kan sees på url-en: [http://localhost:3000](http://localhost:3000).

### `npm run client`

Kjører klienten på [http://localhost:3000](http://localhost:3000).

### `npm run server`

Starter Express-serveren lokalt på *porten* spesifisert i *.env*-filen.
Serveren kjøres i *watch*-mode og vil restartes når den oppdager endringer i koden.


