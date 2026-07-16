# MindMark v0.000.002

Gratis Nederlandstalige mood- en gewoontetracker voor België.

## Publiceren op GitHub Pages
Upload de inhoud van deze map naar de root van `studiosampersand/mindmark` en publiceer de `main` branch via GitHub Pages.

## Routes
- `/` publieke homepage
- `/app/` stabiele app
- `/beta-test/` afzonderlijke testomgeving; bewust nergens gelinkt vanaf publieke pagina's
- `/faq/`
- `/privacy-legal/`
- `/contact/`

## Privacy
Alle check-ins, doelen en instellingen staan in IndexedDB op het toestel. Er is geen account of online back-up. Zelf geëxporteerde JSON-bestanden zijn de verantwoordelijkheid van de gebruiker.

## Talenarchitectuur
De huidige release is uitsluitend Nederlands/België. De taalvoorkeur wordt lokaal bewaard en `?lang=xx` is gereserveerd als toekomstige instap voor taalbestanden. UI-teksten moeten in een volgende internationaliseringsfase naar afzonderlijke locale-bestanden worden verplaatst zonder de datamodellen te wijzigen.

## Versie
`v0.000.002`
