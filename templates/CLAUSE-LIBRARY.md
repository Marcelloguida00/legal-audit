# Libreria di clausole

Bozze di partenza da adattare ai fatti reali del titolare. Sostituisci ogni `[DA COMPLETARE: …]`; se un fatto non è noto, lascia il marcatore e aggiungi la domanda in `NEEDS-INFO.md`. Non pubblicare mai una clausola che dichiari un fatto non verificato (es. "server in UE").

---

## A. Informativa privacy — struttura a livelli

### A.1 Titolare
> **Titolare del trattamento** è [DA COMPLETARE: ragione sociale], con sede in [indirizzo], P.IVA [n.], email [privacy@…][, PEC …]. [Il Responsabile della protezione dei dati (DPO) è contattabile all'indirizzo dpo@….]

### A.2 Tabella finalità (preferire la tabella al testo libero)

| Finalità | Dati | Base giuridica | Conservazione |
|---|---|---|---|
| Creazione e gestione dell'account | Nome, email, password (hash) | Esecuzione del contratto (art. 6.1.b GDPR) | Fino alla cancellazione dell'account + [30] giorni di backup |
| Erogazione del servizio [nome] | [dati] | Esecuzione del contratto (art. 6.1.b) | [termine] |
| Fatturazione e adempimenti fiscali | Dati di fatturazione | Obbligo legale (art. 6.1.c; art. 2220 c.c.; D.P.R. 633/1972) | 10 anni |
| Sicurezza e prevenzione abusi | Log di accesso, IP | Legittimo interesse alla sicurezza del servizio (art. 6.1.f) | [12] mesi |
| Newsletter e comunicazioni promozionali | Email | Consenso (art. 6.1.a), revocabile in ogni momento | Fino alla revoca [o [24] mesi di inattività] |
| Statistiche di utilizzo | [dati], identificativi online | Consenso (art. 6.1.a; art. 122 Codice Privacy) | [14] mesi |
| Difesa in giudizio | Dati pertinenti al contenzioso | Legittimo interesse (art. 6.1.f) [art. 9.2.f per dati particolari] | Per la durata del contenzioso e dei termini di impugnazione |

### A.3 Conferimento
> Il conferimento dei dati contrassegnati come obbligatori è necessario per creare l'account ed erogare il servizio: in mancanza non potremo concludere il contratto. Il conferimento degli altri dati e il consenso alle finalità promozionali e statistiche sono facoltativi e il loro rifiuto non ha alcuna conseguenza sull'uso del servizio.

### A.4 Destinatari
> I dati sono trattati da personale autorizzato e istruito (art. 29 GDPR) e comunicati ai seguenti fornitori, che agiscono come responsabili del trattamento in base a un contratto ai sensi dell'art. 28 GDPR: [DA COMPLETARE: elenco nominativo o rinvio a pagina "Sub-responsabili" aggiornata, con nome, finalità, Paese]. I seguenti soggetti trattano i dati come titolari autonomi: [es. Stripe Payments Europe Ltd. per gli obblighi antiriciclaggio e antifrode]. I dati non sono venduti né diffusi.

### A.5 Diritti
> Puoi esercitare in qualsiasi momento i diritti di accesso, rettifica, cancellazione, limitazione, portabilità e opposizione (artt. 15-22 GDPR) scrivendo a [email] o dalla sezione [Impostazioni > Privacy] dell'app. Rispondiamo entro un mese dalla richiesta, prorogabile di due mesi nei casi complessi, dandotene comunicazione.
>
> **Diritto di opposizione.** Puoi opporti in qualsiasi momento ai trattamenti basati sul nostro legittimo interesse, per motivi connessi alla tua situazione particolare, e senza alcuna motivazione ai trattamenti per finalità di marketing diretto.
>
> Puoi revocare il consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento effettuato prima della revoca.
>
> Hai diritto di proporre reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it) o all'autorità di controllo dello Stato UE in cui risiedi o lavori.

### A.6 Modifiche
> Possiamo aggiornare la presente informativa. In caso di modifiche sostanziali ti avviseremo via email o con un avviso nell'app almeno [15] giorni prima che diventino efficaci. Le versioni precedenti sono consultabili [link archivio]. Versione [x.y] — in vigore dal [data].

---

## B. Consensi — testi delle checkbox (mai preselezionate, una per finalità)

- ☐ *Acconsento a ricevere newsletter e comunicazioni promozionali di [Titolare] via email. Posso revocare il consenso in qualsiasi momento con il link presente in ogni email.*
- ☐ *Acconsento all'analisi delle mie preferenze di utilizzo per ricevere contenuti e offerte personalizzati (profilazione).*
- ☐ *Acconsento al trattamento dei dati relativi alla mia salute che inserirò nell'app [es. diario alimentare, questionari] al fine di [finalità specifica], ai sensi dell'art. 9.2.a GDPR.* (dati Art. 9: checkbox separata obbligatoria per usare quella funzione, con testo esplicito)

Sotto il pulsante di registrazione (non è consenso, è presa visione):
> *Registrandoti accetti i [Termini di servizio]. Il trattamento dei tuoi dati è descritto nell'[Informativa privacy].*

---

## C. Banner cookie

> **Questo sito usa cookie**
> Utilizziamo cookie tecnici necessari al funzionamento del sito. Con il tuo consenso, utilizziamo anche cookie [analitici / di profilazione] di [nostri e di terze parti, es. Google, Meta] per [misurare l'uso del sito / mostrarti pubblicità in linea con i tuoi interessi]. Puoi accettare tutti i cookie, rifiutarli o scegliere quali consentire. Puoi cambiare idea in qualsiasi momento dal link "Preferenze cookie" in fondo a ogni pagina. [Cookie policy]
>
> [Rifiuta tutti]  [Personalizza]  [Accetta tutti]     ✕ (chiude e mantiene solo i cookie tecnici)

"Rifiuta tutti" e "Accetta tutti" con stesse dimensioni, colore e livello.

---

## D. Termini di servizio

### D.1 Limitazione di responsabilità — vedi `references/TERMS-AND-LIABILITY.md` §2

### D.2 Modifiche dei Termini (B2C)
> Possiamo modificare i presenti Termini solo per giustificati motivi, quali modifiche normative, evoluzioni tecniche o del servizio, esigenze di sicurezza. Ti informeremo via email o nell'app almeno [30] giorni prima dell'entrata in vigore. Se non accetti le modifiche puoi recedere senza costi prima di tale data [con rimborso pro-rata dei corrispettivi già pagati per il periodo non goduto]. Le modifiche non si applicano retroattivamente.

### D.3 Sospensione dell'account
> Possiamo sospendere o chiudere il tuo account in caso di grave o reiterata violazione dei presenti Termini, indicandotene la motivazione (art. 17 Reg. (UE) 2022/2065, se applicabile) e, salvo urgenza o obblighi di legge, con preavviso di [N] giorni per consentirti di rimediare. Puoi contestare la decisione scrivendo a [email]; la contestazione sarà esaminata da una persona.

### D.4 Contenuti degli utenti
> Mantieni la titolarità dei contenuti che carichi. Ci concedi una licenza non esclusiva, gratuita, limitata alla durata del tuo account e al solo scopo di ospitare, riprodurre e mostrare tali contenuti per fornirti il servizio. [Non utilizziamo i tuoi contenuti per addestrare modelli di intelligenza artificiale.]

### D.5 Legge e foro (B2C)
> I presenti Termini sono regolati dalla legge italiana, fatte salve le norme imperative più favorevoli del Paese di residenza abituale del consumatore. Per le controversie con consumatori è competente il foro del luogo di residenza o domicilio del consumatore.

### D.6 Servizi a contenuto sanitario o di benessere
> Il servizio [nome] non sostituisce la diagnosi, la terapia o il parere di un professionista sanitario. In caso di emergenza chiama il 112. [Se il servizio prevede professionisti: Le prestazioni professionali sono erogate da professionisti iscritti ai rispettivi albi, che ne rispondono personalmente secondo la normativa e la deontologia applicabili.]
