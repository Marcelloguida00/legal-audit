# AI, profilazione e decisioni automatizzate

Norme: Art. 22 GDPR; Art. 13.2.f, 14.2.g, 15.1.h GDPR; Reg. (UE) 2024/1689 AI Act; Legge italiana sull'intelligenza artificiale (L. 132/2025); EDPB Opinion 28/2024 sui modelli di AI; Garante, provvedimenti su chatbot e web scraping.

## 1. AI Act — calendario di applicazione

Verifica sempre lo stato vigente: la Commissione ha proposto rinvii per alcune parti (pacchetto "Digital Omnibus", novembre 2025). Al momento della stesura:

| Dal | Obblighi |
|---|---|
| 2/2/2025 | Pratiche vietate (Art. 5); AI literacy del personale (Art. 4) |
| 2/8/2025 | Obblighi per modelli GPAI (fornitori); governance; sanzioni |
| 2/8/2026 | Maggior parte degli obblighi, inclusi sistemi ad alto rischio Allegato III e **trasparenza Art. 50** — salvo rinvii approvati |
| 2/8/2027 | Alto rischio Allegato I (prodotti regolati) |

## 2. Classificazione del sistema

1. **Vietato (Art. 5)?** Manipolazione subliminale, sfruttamento di vulnerabilità (età, disabilità, situazione socio-economica), social scoring, riconoscimento emozioni sul lavoro e a scuola, categorizzazione biometrica per dati sensibili, scraping non mirato di volti. → 🔴 bloccante.
2. **Alto rischio (Art. 6, Allegato III)?** Es. selezione del personale, accesso a istruzione, credit scoring, accesso a servizi essenziali, alcune applicazioni sanitarie (dispositivi medici → Allegato I). Ruolo: *provider* o *deployer*? Il deployer (Art. 26) deve usare secondo istruzioni, sorveglianza umana, conservare log, informare i lavoratori, e in certi casi FRIA (Art. 27).
3. **Rischio limitato — trasparenza (Art. 50)**:
   - chatbot: l'utente deve sapere che interagisce con un'AI (salvo sia ovvio)
   - contenuti sintetici (testo, audio, immagini, video) marcati in formato leggibile da macchina (provider)
   - deepfake e testi su questioni di interesse pubblico: dichiarati (deployer)
   - riconoscimento emozioni / categorizzazione biometrica: informare gli interessati
4. **Rischio minimo**: nessun obbligo specifico oltre Art. 4.

Software "medico" (diagnosi, triage, raccomandazioni terapeutiche): valuta qualificazione come dispositivo medico ai sensi del Reg. (UE) 2017/745 (regola 11) → alto rischio AI Act Allegato I. Fuori scopo dell'audit privacy ma va segnalato come 🔴 da verificare.

## 3. GDPR e AI

- [ ] **Base giuridica per l'uso dei dati come input** (prompt, documenti caricati) — di norma contratto per l'erogazione della funzione
- [ ] **Base giuridica separata per il training/fine-tuning** su dati degli utenti — legittimo interesse solo con LIA solida e opt-out effettivo (EDPB Op. 28/2024); per dati Art. 9 serve consenso esplicito. Uso non dichiarato → 🔴
- [ ] Provider LLM come responsabile con DPA; opzioni no-training e retention minima attivate; regione
- [ ] Prompt e output nei log: retention e accessi
- [ ] Informativa: quali funzioni usano AI, quali dati vanno al provider, se c'è revisione umana
- [ ] Esattezza (Art. 5.1.d) e allucinazioni su persone: meccanismo di rettifica/blocco degli output errati su individui
- [ ] Diritto di accesso: include conversazioni e dati inferiti
- [ ] Cancellazione: include vector store, embeddings, cache dei prompt, dataset di fine-tuning (se tecnicamente non rimovibile da un modello addestrato, dichiararlo e non addestrare su quei dati)
- [ ] DPIA: nuove tecnologie + dati su larga scala/vulnerabili

## 4. Decisioni automatizzate — Art. 22

Vietate le decisioni **basate unicamente** su trattamento automatizzato che producono effetti giuridici o analogamente significativi (es. rifiuto di un servizio, prezzo, ban dell'account, valutazione di un candidato), salvo:
- necessarie per un contratto, autorizzate dalla legge, o con consenso esplicito
- **e** con diritto di ottenere intervento umano, esprimere la propria opinione, contestare (22.3)

La CGUE (C-634/21 SCHUFA) ha esteso la nozione: anche il punteggio che determina in modo decisivo la decisione di un terzo rientra nell'Art. 22. La CGUE (C-203/22 Dun & Bradstreet Austria) ha chiarito il contenuto della spiegazione dovuta sulla "logica utilizzata".

Checklist:
- [ ] Mappa delle decisioni automatizzate (moderazione automatica con ban, antifrode con blocco, pricing dinamico, scoring)
- [ ] Revisione umana effettiva (non rubber-stamping)
- [ ] Canale per contestare e tempi
- [ ] Informativa con logica, importanza e conseguenze (13.2.f)

## 5. Legge italiana sull'IA (L. 132/2025)

Disposizioni nazionali complementari all'AI Act, tra cui: in ambito sanitario l'AI è supporto e la decisione resta al professionista; informazione all'interessato sull'uso di AI; accesso dei minori di 14 anni a tecnologie AI con consenso di chi esercita la responsabilità genitoriale; obblighi di informazione per le professioni intellettuali verso il cliente. Verifica il testo vigente e i decreti attuativi prima di citarla in un finding.

## 6. Riscrittura tipica

Debole:
> Utilizziamo tecnologie di intelligenza artificiale per migliorare i nostri servizi.

Solido:
> **Funzioni basate su intelligenza artificiale.** La funzione "[nome]" utilizza un modello linguistico fornito da [Fornitore] ([Paese], [garanzia Capo V]), che agisce come nostro responsabile del trattamento. Quando la utilizzi, il testo che inserisci [e i documenti che carichi] viene inviato al fornitore al solo scopo di generare la risposta; il fornitore è contrattualmente vincolato a non usarlo per addestrare i propri modelli e a cancellarlo entro [N giorni]. Le risposte sono generate automaticamente e possono contenere errori: non costituiscono [parere medico/legale/professionale]. Non utilizziamo i tuoi contenuti per addestrare modelli [oppure: solo con il tuo consenso, revocabile in Impostazioni > Privacy].
