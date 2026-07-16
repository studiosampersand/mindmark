# MindMark v0.000.006

Gratis Nederlandstalige mood- en gewoontetracker voor België.

## Routes
- `/` publieke homepage
- `/app/` stabiele app
- `/faq/`
- `/privacy-legal/`
- `/contact/`

## Privacy
Alle check-ins, doelen en instellingen staan in IndexedDB op het toestel. Er is geen account of online back-up. Zelf geëxporteerde JSON-bestanden zijn de verantwoordelijkheid van de gebruiker.

## Talenarchitectuur
De huidige release is uitsluitend Nederlands/België. De taalvoorkeur wordt lokaal bewaard en `?lang=xx` is gereserveerd als toekomstige instap voor taalbestanden. UI-teksten moeten in een volgende internationaliseringsfase naar afzonderlijke locale-bestanden worden verplaatst zonder de datamodellen te wijzigen.