### Käynnistä sovellus (vaatii Docker)

Ajaa juuri kansiossa:

``docker compose up``

- Mene http://localhost:5173/ (sivusto)
- Mene http://localhost:8080/ (rajapinta)

### Dokumentaatio

[Frontend](https://github.com/MikhailDeriabin/phonium/tree/master/frontend/docs) (Figma)

[Backend](https://github.com/MikhailDeriabin/phonium/tree/master/phonium/docs) (Tietokanta + swagger)

### Yleinen kuvaus

Sovellus tarjoaa mahdollisuuden hallita puhelinluetteloa.

Se on kevyt ja nopea, suunniteltu toimimaan yksityisessä (lokaalisessa) ympäristössä. 
Koska sovellus ei ole tarkoitettu verkkoon, se ei sisällä tietoturvaan liittyviä toimintoja tai ratkaisuja.

#### Terminologia

1. Contact – Yksi puhelinluetteloon tallennettu henkilö, jolle sovelluksen käyttäjä voi soittaa.
   Contact sisältää seuraavat tiedot:
    - _name_, vapaaehtoinen, henkilön etu- ja sukunimi, 1-50 merkkinen string
    - _phone_, pakollinen, henkilö puhelinnumero kansanvälisessä tai yleisessä muodossa, 4-31 merkkinen string
    - _description_, vapaaehtoinen, kuvaus henkilöstä, 1-200 merkkinen string
    - _id_, pakollinen, uniikki tunnus, automaattisesti generoitu, int

#### Sovelluksen toiminnot

- Käyttäjä voi luoda uusia yhteystietoja
- Käyttäjä voi lukea kaikki tallennetut yhteystiedot
- Käyttäjä voi hakea yksittäisen yhteystiedon id-tunnuksen perusteella
- Käyttäjä voi päivittää yhteystietoja 
- Käyttäjä voi poistaa yhteystiedon id-tunnuksen perusteella

### Teknologiat ja riipuvuudet

#### Frontend

- TypeScript
- React
- Material UI

#### Backend

- Java 17
- Spring Boot
- Hibernate
- PostgresSQL

#### Työkalut

- Figma
- Swagger
- ERD plus

#### Muu

- Docker

### AWS suunnitelma

Jos päätetään käyttää pilvipalveluita, järkevintä olisi hyödyntää mahdollisimman paljon AWS:n dedikoituja palveluita. Tämä vähentäisi konfigurointiin ja ylläpitoon kuluvaa aikaa. Alla on lista palveluista, jotka tässä alkuvaiheessa tulevat mieleen.

#### Mini vaatimukset

  - Konttien hallinta rajapintaa ja käyttöliittymää varten (jos molemmat ovat dokerisoituja): Amazon Elastic Container Registry
  - Tietokanta tietojen säilyttämiseen: Amazon Relational Database Service

  Jos skaalautuminen on tarpeen, voidaan käyttää myös Amazon Elastic Kubernetes Service.

#### Extra

  - CDN nopeuttamaan verkkosivujen latautumista: Amazon CloudFront
  - Välimuisti (caching) rajapintakutsujen optimointiin: Amazon ElastiCache for Redis 

#### CI/CD

  - AWS CodePipeline
  - AWS CodeBuild

#### Tietoturva

  - DDoS-suojaus: AWS Shield
  - Palomuuri: AWS Web Application Firewall
  - Tietokannan varmuuskopiointi: Amazon RDS Automated Backups
  - SIEM (monitorointi): AWS Security Hub
  - Tunkeutumisen havaitseminen (IDS): AWS GuardDuty
