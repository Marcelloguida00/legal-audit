# Consenso, cookie, marketing e dark pattern

Norme: Art. 4(11), 7, 8 GDPR; Art. 5(3) Dir. 2002/58/CE (ePrivacy); Art. 122 e 130 D.Lgs. 196/2003; Linee guida Garante su cookie e altri strumenti di tracciamento del 10 giugno 2021; EDPB Linee guida 05/2020 sul consenso; EDPB Linee guida 03/2022 sui deceptive design pattern; EDPB Linee guida 2/2023 sull'ambito tecnico dell'Art. 5(3) ePrivacy; Art. 25 DSA (piattaforme online).

## 1. Validità del consenso (Artt. 4.11 e 7 GDPR)

Il consenso deve essere: **libero, specifico, informato, inequivocabile, manifestato con azione positiva**, revocabile con la stessa facilità con cui è dato (7.3), dimostrabile dal titolare (7.1).

| Controllo UI / tecnico | Esito se fallisce |
|---|---|
| Checkbox preselezionate (CGUE C-673/17 Planet49) | 🔴 per marketing/tracking |
| Consenso "bundled" con accettazione ToS | 🟠 (Art. 7.2, 7.4) |
| Un solo checkbox per più finalità (newsletter + profilazione + cessione a terzi) | 🟠 |
| Servizio negato se non si consente a trattamenti non necessari | 🟠 (Art. 7.4) |
| Revoca più difficile del rilascio (es. solo via email/PEC) | 🟠 (Art. 7.3) |
| Nessun log del consenso (chi, quando, cosa, versione testo, come) | 🟠 (Art. 7.1, 5.2) |
| Consenso raccolto ma non verificato server-side prima dell'azione | 🔴 se l'azione avviene comunque |

Schema minimo log consenso: `subject_id`, `purpose`, `granted` (bool), `timestamp` UTC, `policy_version`, `text_hash`, `source` (web/app/form), `ip` troncato o hash (minimizzazione).

## 2. Cookie e tracker — ePrivacy / Art. 122 Codice Privacy

L'Art. 5(3) ePrivacy riguarda **qualsiasi** archiviazione o accesso al terminale (cookie, localStorage, SDK mobile, pixel, fingerprinting — EDPB 2/2023). Esenti solo gli strumenti **strettamente necessari** al servizio richiesto dall'utente.

### Classificazione
- **Tecnici**: sessione, carrello, sicurezza, preferenza consenso, bilanciamento carico → nessun consenso, solo informativa.
- **Analytics**: assimilati ai tecnici **solo** se (Garante 2021): usati dal titolare per statistiche aggregate sul proprio sito, con mascheramento di almeno la quarta componente dell'IP, senza incrocio con altri dati, e la terza parte non li usa per finalità proprie. Google Analytics standard **non** rientra → consenso. Inoltre i trasferimenti verso gli USA vanno valutati (vedi TRANSFERS-AND-VENDORS.md).
- **Profilazione/marketing/social pixel/session replay**: consenso preventivo.

### Requisiti del banner (Garante 10/06/2021)
- [ ] Nessun cookie/SDK non tecnico prima del consenso (verifica Network/Application al primo load)
- [ ] Comando di chiusura (X) in alto a destra che **mantiene le impostazioni di default (rifiuto)**
- [ ] Pulsante per accettare tutti; link/pulsante per scegliere in modo granulare
- [ ] Lo scroll o il proseguimento della navigazione **non** è consenso
- [ ] Nessun cookie wall, salvo alternativa equivalente senza consenso (valutazione caso per caso)
- [ ] Il banner non viene ripresentato prima di 6 mesi dopo un rifiuto, salvo cambio sostanziale delle condizioni o impossibilità tecnica di memorizzare la scelta
- [ ] Link permanente e facilmente accessibile per modificare le scelte (es. footer "Preferenze cookie")
- [ ] Informativa breve nel banner + cookie policy estesa con elenco tracker, finalità, durata, terze parti

### Dark pattern (EDPB 03/2022; Art. 25 DSA; Dir. 2005/29/CE pratiche commerciali sleali)
→ 🟠 di norma, 🔴 se impediscono di rifiutare:
- "Accetta" colorato e grande, "Rifiuta" come link grigio o in un secondo livello
- Rifiuto che richiede più clic dell'accettazione
- Linguaggio colpevolizzante ("No, preferisco un'esperienza peggiore")
- Toggle "legittimo interesse" attivi di default per finalità pubblicitarie (IAB TCF)
- Ripresentazione insistente del banner

### Consent Mode / TCF
- Google Consent Mode v2: default `denied` per `ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage` in SEE.
  - **Modalità base**: i tag Google non si caricano finché non c'è consenso. È la scelta sicura.
  - **Modalità avanzata**: i tag si caricano e inviano ping senza cookie (`gcs=G100`) prima del consenso **e dopo il rifiuto**, con IP, user-agent e URL. Per l'EDPB (Linee guida 2/2023) far inviare informazioni dal terminale rientra nell'Art. 5(3) ePrivacy. Severità: 🟠 di base; 🔴 se la policy dichiara "solo previo consenso" (dichiarato ≠ reale) o se gli URL rivelano categorie particolari (pagine su malattie, orientamento, religione).
  - Correzione: in GTM, per ogni tag Google Ads/GA4 impostare "Richiedi consenso aggiuntivo" e trigger solo dopo `consent_update` granted; disattivare la raccolta senza cookie.
  - **Enhanced Conversions** (`user_data`: email/telefono hashati inviati a Google al submit di un form): richiede consenso e va dichiarato; su form che raccolgono dati sanitari va escluso.
- IAB TCF: verificare che la CMP rispetti la decisione della CGUE C-604/22 (IAB Europe): la TC string può costituire dato personale e IAB può essere contitolare.

### App mobile
- SDK (Firebase, Facebook SDK, AppsFlyer) inizializzati in `AppDelegate`/`Application.onCreate` prima del consenso → 🔴
- iOS: App Tracking Transparency richiesta per IDFA (requisito Apple, non sostituisce il consenso GDPR)
- Android: Advertising ID — permesso `AD_ID` e consenso

## 3. Marketing — Art. 130 Codice Privacy

- Email/SMS/WhatsApp/chiamate automatiche promozionali → consenso preventivo (130.1-2), separato e facoltativo.
- **Soft spam** (130.4): email del cliente ottenuta nella vendita di un prodotto/servizio può essere usata per prodotti **analoghi** senza consenso, purché informato e con opt-out a ogni invio. Non vale per SMS né per meri iscritti senza acquisto.
- Telemarketing con operatore: Registro pubblico delle opposizioni (esteso ai cellulari dal 2022).
- Cessione liste a terzi per loro marketing → consenso specifico e separato, con indicazione dei terzi o categorie.
- Double opt-in raccomandato per prova del consenso.
- Ogni messaggio deve contenere link di disiscrizione funzionante a un clic.

## 4. Minori — Art. 8 GDPR, Art. 2-quinquies Codice Privacy

- Servizi della società dell'informazione offerti direttamente a minori: in Italia consenso autonomo dai **14 anni**; sotto, consenso di chi esercita la responsabilità genitoriale.
- Il titolare deve compiere "ogni ragionevole sforzo" per verificare (Art. 8.2). Un campo "Ho più di 14 anni" senza altro è debole: valuta in base al rischio.
- Informativa per minori in linguaggio comprensibile (2-quinquies co. 2).
- Se il servizio dichiara "vietato ai minori" ma non ha alcun controllo e il pubblico reale include minori → 🟠.
- AGCOM: obbligo di age verification per siti con contenuti pornografici (Delibera 96/25/CONS) — solo se pertinente.
- Con età < 18 attenzione anche a DSA Art. 28 (piattaforme online: niente pubblicità basata su profilazione verso minori).
