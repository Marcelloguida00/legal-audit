# Ricognizione e data map

Obiettivo: sapere esattamente quali dati entrano, dove vanno, perché e per quanto, **prima** di giudicare i documenti. Una policy si valuta solo contro la realtà che descrive.

## 1. Inventario delle fonti

Raccogli e annota versione/data di ciascuno:

- Privacy policy / informativa (anche quelle specifiche: newsletter, candidature, form contatti, app mobile)
- Cookie policy e configurazione del banner (CMP: Iubenda, Cookiebot, OneTrust, custom)
- Termini di servizio, EULA, condizioni di vendita, AUP, SLA
- DPA firmati con i fornitori; elenco sub-responsabili
- Registro dei trattamenti (Art. 30), DPIA (Art. 35), LIA (bilanciamento legittimo interesse)
- Schermate dei flussi: registrazione, login social, onboarding, checkout, newsletter, cancellazione account, impostazioni privacy
- Store listing (App Store "Privacy Nutrition Label", Google Play "Data safety"): devono coincidere con la policy

## 2. Scansione del codice (se disponibile)

Cerca, e annota file:riga di ciascun risultato:

| Cosa | Dove/come cercare |
|---|---|
| SDK di terze parti | `package.json`, `Podfile`, `build.gradle`, `requirements.txt`, `composer.json`: analytics, ads, attribution (AppsFlyer, Adjust), crash (Sentry, Crashlytics), session replay (Hotjar, Clarity, FullStory, LogRocket), chat (Intercom), AI (openai, anthropic, google-genai) |
| Script iniettati | `<script src=` nei layout/template, Google Tag Manager, pixel (Meta, TikTok, LinkedIn), `gtag(`, `fbq(` |
| Cookie e storage | `document.cookie`, `setCookie`, `localStorage`, `sessionStorage`, `IndexedDB`, header `Set-Cookie`, durata (`max-age`/`expires`) |
| Fingerprinting | canvas, `navigator.*` raccolti in blocco, librerie fingerprint |
| Chiamate di rete in uscita | `fetch(`, `axios`, client HTTP, webhook, URL hard-coded di domini terzi |
| Schema dati | migrazioni, modelli ORM: campi personali, campi Art. 9, campi in chiaro che dovrebbero essere cifrati |
| Logging | cosa finisce nei log (email, IP, body delle richieste, prompt AI), retention dei log |
| Cancellazione | esiste un endpoint/job di delete account? cancella anche backup, analytics, CRM, vector store? |
| Consenso | dove è salvato, con timestamp e versione del testo? è verificato server-side prima delle azioni di marketing? |
| Età | esiste un age gate? è bypassabile? |
| Regione dati | config cloud (region), bucket, DB, CDN |
| Permessi mobile | `Info.plist` (NS*UsageDescription), `AndroidManifest.xml` (location, contacts, camera, mic, ad ID) |

Se puoi eseguire il sito in un browser controllato (profilo pulito, senza cookie), esegui **tre passaggi** e registra per ciascuno cookie e richieste verso domini terzi:

1. **Primo caricamento senza interagire** col banner, su home **e** sulle pagine più sensibili (pagine cliniche, form, checkout). Ciò che parte qui parte senza consenso.
2. **Dopo "Rifiuta"**: ricarica e naviga su una pagina sensibile. Molti siti rispettano il primo passaggio e falliscono questo.
3. **Dopo "Accetta tutti"**: verifica che cosa ricevono i tracker (URL completi, page_title, parametri, eventi dei form).

Non basta controllare i cookie: con **Google Consent Mode "avanzato"** non si scrive alcun cookie, ma partono comunque richieste `.../g/collect` e `pagead2.googlesyndication.com/ccm/collect` con parametro `gcs=G100` (consenso negato) che contengono IP, user-agent e l'URL della pagina (`dl=`). Cerca nella rete le stringhe `collect`, `gcs=`, `dl=`, `tr?id=`, `pixel`.

Ispeziona anche il container GTM pubblico (`https://www.googletagmanager.com/gtm.js?id=GTM-XXXX`): la presenza di `generate_lead`, `user_data`, `fbq`, `ttq` indica quali tag ed eventi sono configurati anche se non li hai visti scattare.

## 3. Data map

Una riga per trattamento:

| # | Punto di raccolta | Dati | Interessati | Finalità | Base giuridica dichiarata | Base giuridica corretta | Destinatari / sub-responsabili | Paese | Meccanismo trasferimento | Conservazione dichiarata | Conservazione reale | Fonte (file:riga / §) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|

Compila "Base giuridica corretta" e "Conservazione reale" con la tua valutazione: le divergenze con le colonne "dichiarata" sono candidati finding.

## 4. Controllo di coerenza (fonte primaria di 🔴)

Per ogni riga confronta quattro versioni della verità:

1. **Ciò che il documento dichiara**
2. **Ciò che il codice/rete mostra**
3. **Ciò che l'utente vede nella UI**
4. **Ciò che dicono gli altri documenti e la comunicazione commerciale**: privacy vs ToS vs cookie policy vs home page vs store listing

Ogni divergenza è un finding. Costruisci una piccola matrice per i fatti che compaiono in più documenti: ragione sociale e indirizzo, dominio, ruoli privacy (titolare/contitolare/responsabile), funzioni AI, servizi offerti, età minima, Paese dei server. Le contraddizioni tra documenti dello stesso titolare sono tra i finding più facili da provare.

Tipiche:
- SDK presente nel codice ma assente da policy e elenco sub-responsabili
- Policy dice "non vendiamo né condividiamo dati" ma ci sono pixel pubblicitari (rilevante anche per CCPA "sharing")
- Policy dice "conserviamo per 12 mesi" ma nessun job di cancellazione esiste
- Store label dice "nessun dato raccolto" ma c'è un crash reporter con device ID
- Policy indica server UE ma il DB è in `us-east-1`
- Policy: "strumenti attivati solo previo consenso"; rete: ping Consent Mode prima del consenso e dopo il rifiuto
- ToS: "titolari autonomi"; privacy: "contitolari"
- Home: "la nostra clinica"; ToS: "siamo solo un intermediario tecnologico"
- Form di contatto/lead pubblico (prima della registrazione) non descritto da nessuna informativa: le policy coprono "navigazione" e "utenti registrati", ma il form sta in mezzo

## 5. Domande aperte

Tutto ciò che non puoi verificare va in `NEEDS-INFO.md`, formulato come domanda chiusa all'utente con l'impatto: *"I backup del DB sono cifrati e con retention definita? Se no → finding 🟠 Art. 32 / Art. 5.1.e."*
