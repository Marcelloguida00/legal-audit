# Diritti degli interessati e conservazione

## 1. Diritti — Artt. 15-22 GDPR

Non basta elencarli nella policy: devono essere **esercitabili** in pratica. Verifica processo e tecnica.

| Diritto | Verifica tecnica | Errori frequenti |
|---|---|---|
| Accesso (15) | Esiste un export completo, inclusi log, dati inferiti, destinatari, fonte? | Export solo del profilo, non di eventi/analytics/chat AI |
| Rettifica (16) | Modificabili in-app o su richiesta | — |
| Cancellazione (17) | Il delete propaga a: DB principale, replica, backup (con scadenza), storage file, CRM, email marketing, analytics (user deletion API), error tracker, vector store/embeddings, log, cache, data warehouse | Soft delete permanente (`deleted_at` senza purge); dati restano nei sub-responsabili |
| Notifica ai destinatari (19) | Il delete/rettifica è inoltrato ai sub-responsabili | Nessun meccanismo |
| Limitazione (18) | Flag che blocca il trattamento senza cancellare | Assente |
| Portabilità (20) | Formato strutturato, leggibile da macchina (JSON/CSV) — solo per consenso/contratto e trattamento automatizzato | PDF non strutturato |
| Opposizione (21) | Per legittimo interesse e marketing diretto (assoluta per marketing, 21.3) | Opposizione non prevista per trattamenti su legittimo interesse |
| Decisioni automatizzate (22) | Vedi AI-AND-AUTOMATION.md | — |

### Processo (Art. 12)
- Canale indicato nella policy (email dedicata o form) — non imporre canali più onerosi (PEC, raccomandata, documento d'identità sistematico)
- Verifica identità **proporzionata**: per utenti autenticati, il login basta; chiedere il documento d'identità a tutti è sproporzionato → 🟡
- Termine 1 mese, proroga max 2 mesi motivata entro il primo mese
- Registro delle richieste e delle risposte (accountability)
- Gratuito; contributo spese solo per richieste manifestamente infondate/eccessive o copie ulteriori

### Self-service account deletion
- App iOS con creazione account → Apple richiede cancellazione account in-app (App Store Review Guideline 5.1.1(v))
- Google Play → richiede metodo di cancellazione in-app e via web
- Flusso: conferma → periodo di grazia opzionale dichiarato → purge effettiva → email di conferma. Indicare cosa si conserva comunque e perché (fatture, contenzioso).

## 2. Conservazione — Art. 5.1.e, 13.2.a

Ogni categoria di dati deve avere un termine **o** un criterio oggettivo, **e** un meccanismo tecnico che lo applica. Policy con "per il tempo necessario alle finalità" senza altro → 🟠.

### Termini di riferimento (Italia) — adatta al caso, cita la fonte

| Dati | Termine tipico | Fonte |
|---|---|---|
| Fatture, scritture contabili | 10 anni | art. 2220 c.c.; art. 39 D.P.R. 633/1972; art. 22 D.P.R. 600/1973 |
| Dati contrattuali per difesa in giudizio | 10 anni dalla cessazione (prescrizione ordinaria) | art. 2946 c.c. — attenzione: conservare solo il minimo necessario, non l'intero account |
| Account utente | Fino alla cancellazione + backup rolling (es. 30 gg) | Scelta del titolare, da dichiarare |
| Account inattivo | Definire una soglia (es. 24 mesi) con preavviso | Minimizzazione |
| Marketing (consenso) | Fino a revoca; il Garante ha ritenuto in vari provvedimenti congrui periodi di 24 mesi per profilazione e marketing in specifici settori — valuta il caso | Garante, provvedimenti settoriali |
| Log di accesso applicativi | 6-12 mesi tipico, giustificare | Sicurezza, Art. 32 |
| Log amministratori di sistema | Almeno 6 mesi, inalterabili | Provv. Garante 27/11/2008 amministratori di sistema |
| Videosorveglianza | 24-72h tipico | Provv. Garante 8/4/2010; EDPB 3/2019 |
| Candidature | Definire (es. 12-24 mesi) con consenso per conservazione oltre la selezione | — |
| Cookie | Durata indicata per ciascuno; Garante raccomanda durate proporzionate | Linee guida 2021 |
| Dati sanitari / cartelle cliniche | Variano per contesto; per professionisti sanitari valuta obblighi deontologici e di settore | Verifica con il legale |

### Verifica tecnica
- Job di purge schedulati (cron, TTL indexes, lifecycle policy S3/GCS)
- Retention configurata nei sub-responsabili (GA4 data retention, Sentry, Mixpanel, log provider)
- Backup: retention definita e documentata; i dati cancellati scadono col backup e non vengono ripristinati in produzione
