# Categorie particolari, dati sanitari e soggetti vulnerabili

Norme: Art. 9 e 10 GDPR; Artt. 2-sexies, 2-septies, 2-octies D.Lgs. 196/2003; Art. 35 (DPIA); Reg. (UE) 2025/327 EHDS (applicazione scaglionata — verifica); deontologia professionale (es. Codice deontologico degli psicologi italiani; segreto professionale art. 622 c.p.).

## 1. Riconoscere i dati Art. 9

Dati sanitari sono anche quelli **da cui si può inferire** la salute (CGUE C-184/20 OT; C-21/23 Lindenapotheke): iscrizione a un programma per una dipendenza, prenotazione da uno specialista, peso/BMI in un'app di nutrizione, risposte a questionari di screening, acquisto di farmaci, appartenenza a un gruppo di supporto. Anche **il solo fatto che una persona sia utente** di un servizio di salute mentale può essere dato sanitario.

Se il prodotto tratta questi dati, tutto il resto dell'audit si alza di un livello.

## 2. Deroga Art. 9.2 — una è obbligatoria, oltre alla base Art. 6

| Deroga | Quando | Note |
|---|---|---|
| 9.2.a consenso **esplicito** | App benessere/salute B2C, questionari, diari | Dichiarazione espressa (checkbox dedicata non preselezionata con testo specifico; non bundled con ToS). Log obbligatorio. |
| 9.2.h finalità di cura | Professionista sanitario soggetto a segreto (9.3) che eroga la prestazione | Copre la cura, **non** marketing, analytics, ricerca, training AI |
| 9.2.c interessi vitali | Emergenze | Eccezionale |
| 9.2.f difesa in giudizio | Contenzioso | — |
| 9.2.g/i/j | Interesse pubblico, sanità pubblica, ricerca | Richiedono base di diritto UE/nazionale; per la ricerca vedi art. 110 Codice Privacy |

Nessuna deroga → 🔴.

## 3. Misure tecniche richieste (Art. 32 + 2-septies)

- [ ] Cifratura at rest dei campi sanitari (a livello di campo/colonna o envelope encryption, chiavi separate dai dati, KMS)
- [ ] Cifratura in transito (TLS 1.2+), incluse comunicazioni interne e webhook
- [ ] Controllo accessi per ruolo e minimo privilegio; log di accesso ai record sanitari
- [ ] Pseudonimizzazione per analytics/statistiche
- [ ] **Nessun dato sanitario verso tracker pubblicitari**: URL, titoli di pagina, eventi custom (`event: 'prenotazione_psicologo'`, `/trattamenti/fertilita/`) inviati a Meta Pixel / GA / TikTok rivelano la condizione → 🔴. Verifica parametri URL, `page_title`, event name, form auto-capture, session replay (maschera tutti gli input).
- [ ] Nessun dato sanitario nei log applicativi, error tracking (Sentry breadcrumbs, request body), notifiche push lock-screen, oggetto delle email
- [ ] AI/LLM: nessun invio di dati sanitari a provider senza DPA, zero retention, no training, regione UE preferibile; DPIA che copre il trattamento
- [ ] Videoconsulti: piattaforma con DPA e cifratura; niente WhatsApp/Meet personali per la professione → valutare
- [ ] Notifiche e SMS: testo neutro ("Hai un appuntamento domani alle 15") senza indicare la specialità

## 4. DPIA

Dati sanitari su larga scala, soggetti vulnerabili (pazienti, minori), nuove tecnologie → DPIA quasi certamente obbligatoria (elenco Garante provv. 467/2018; WP248). Contenuto minimo Art. 35.7: descrizione, necessità/proporzionalità, rischi, misure. Se rischio residuo elevato → consultazione preventiva (Art. 36).

## 5. Professionisti sanitari e psicologi

- Segreto professionale e deontologia si aggiungono al GDPR: l'informativa del professionista e il consenso informato alla prestazione sono documenti diversi; non fonderli.
- Prestazioni a minori: consenso di entrambi i genitori esercenti la responsabilità genitoriale per la prestazione psicologica (regola deontologica — verifica la versione vigente del codice).
- Piattaforme che intermediano professionisti: chiarire i ruoli (piattaforma responsabile per conto del professionista per la cartella; titolare autonomo per account e pagamenti). Ruoli confusi → 🟠.
- Fascicolo/registro clinico: tempi di conservazione da definire con il legale e l'ordine professionale.

## 6. Form di primo contatto e lead

Il punto più trascurato: il form "prenota / richiedi informazioni" pubblico, prima della registrazione, che chiede "qual è il tuo problema?" o offre opzioni come "ho la condizione X". Verifica:
- [ ] Un'informativa che descrive **quel** form (spesso manca: privacy "navigazione" e privacy "utenti registrati" lo lasciano scoperto)
- [ ] Consenso esplicito Art. 9.2.a separato e non preselezionato. Una casella "Accetto la privacy policy" obbligatoria **non** è consenso esplicito: è un errore 🔴 se il form raccoglie dati sanitari
- [ ] Il ricontatto richiesto dall'utente è misura precontrattuale (6.1.b), non consenso
- [ ] Età: se minori plausibili, ramo per il genitore
- [ ] Dati di terzi ("chiedo per un familiare"): minimizzare, informativa Art. 14 al primo contatto
- [ ] Dove arrivano i dati (email in chiaro, Google Sheets, submission del CMS mai cancellate) e retention dei lead non convertiti
- [ ] Nessun evento di conversione con dati identificativi o URL clinici verso piattaforme pubblicitarie

## 7. Piattaforme che intermediano professionisti sanitari

- Coerenza tra comunicazione ("clinica", "centro medico", "sede") e qualificazione contrattuale ("mero intermediario, non struttura sanitaria"). La discrepanza indebolisce le limitazioni di responsabilità e può configurare pratica commerciale ingannevole (artt. 20-22 Cod. Cons.).
- Strutture sanitarie: obblighi assicurativi e di pubblicazione sul sito (L. 24/2017, artt. 7 e 10) — verificare la qualificazione con il legale.
- I ToS devono coprire tutti i servizi offerti sul sito (online **e** in presenza, tutte le figure professionali).

## 8. Altri dati sensibili

- **Biometrici** (riconoscimento facciale, impronte per login): Art. 9 se usati per identificazione univoca; Face ID/Touch ID locali di sistema operativo non sono trattati dal titolare se l'app riceve solo l'esito.
- **Geolocalizzazione precisa**: non Art. 9, ma rivela abitudini/luoghi sensibili (cliniche, luoghi di culto) → consenso e minimizzazione; CCPA la considera sensitive PI.
- **Dati giudiziari** (Art. 10): solo se autorizzati da norma; in Italia art. 2-octies.
- **Dati di vittime/persone vulnerabili**: alzare il livello di protezione e di severità.
