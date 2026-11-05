# GDPR — nucleo (Reg. UE 2016/679) e Codice Privacy (D.Lgs. 196/2003 come mod. dal D.Lgs. 101/2018)

## Indice
1. Principi (Art. 5)
2. Basi giuridiche (Art. 6)
3. Informativa (Artt. 12-14)
4. Accountability e privacy by design (Artt. 24-25)
5. Ruoli: titolare, contitolare, responsabile (Artt. 26-28)
6. Registro, DPIA, DPO (Artt. 30, 35, 37)
7. Rappresentante UE (Art. 27)
8. Sanzioni e responsabilità (Artt. 82-83)

---

## 1. Principi — Art. 5

| Principio | Cosa verificare | Finding tipico |
|---|---|---|
| Liceità, correttezza, trasparenza (5.1.a) | La policy descrive ciò che accade davvero? | Dichiarato ≠ reale → alza severità |
| Limitazione della finalità (5.1.b) | Dati raccolti per X usati per Y (es. dati supporto usati per training AI) | 🟠/🔴 se finalità incompatibile senza nuova base |
| Minimizzazione (5.1.c) | Campi obbligatori non necessari (data di nascita, telefono, codice fiscale "per comodità") | 🟡; 🟠 se dati particolari |
| Esattezza (5.1.d) | L'utente può correggere i dati? | 🟢/🟡 |
| Limitazione conservazione (5.1.e) | Tempi definiti per ogni categoria **e** applicati tecnicamente | 🟠 se assenti |
| Integrità e riservatezza (5.1.f) | Vedi SECURITY-AND-BREACH.md | |
| Responsabilizzazione (5.2) | Il titolare può *dimostrare* la conformità (log consensi, registro, LIA) | 🟡/🟠 |

## 2. Basi giuridiche — Art. 6

Ogni finalità deve avere **una** base giuridica, indicata nell'informativa (Art. 13.1.c). Errori classici:

- **Consenso usato dove serve il contratto** (es. "acconsento al trattamento dei dati per fornire il servizio"): il consenso è revocabile, quindi la base è fragile e fuorviante → 🟡. Correzione: base Art. 6.1.b.
- **Contratto usato per marketing/analytics/profilazione**: non necessario all'esecuzione → 🟠/🔴. EDPB Linee guida 2/2019 sull'Art. 6.1.b.
- **Legittimo interesse senza LIA**: serve test in tre fasi (finalità legittima, necessità, bilanciamento). Mai per categorie particolari. Indicare l'interesse specifico nell'informativa (Art. 13.1.d). Opposizione Art. 21 da segnalare esplicitamente. EDPB Linee guida 1/2024.
- **Obbligo legale (6.1.c)**: citare la norma (es. conservazione fatture art. 2220 c.c.; D.P.R. 633/1972).
- **Consenso unico per più finalità**: viola Art. 7.2 e granularità (EDPB Linee guida 05/2020) → 🟠.
- **Consenso condizionato al servizio** per trattamenti non necessari: Art. 7.4 → 🟠.

## 3. Informativa — Artt. 12, 13, 14

Checklist Art. 13 (dati raccolti presso l'interessato). Ogni voce mancante è un finding:

- [ ] Identità e contatti del titolare (13.1.a) — ragione sociale, sede, P.IVA, email
- [ ] Contatti DPO, se nominato (13.1.b)
- [ ] Finalità **e** base giuridica *per ciascuna finalità* (13.1.c)
- [ ] Legittimo interesse specifico, se usato (13.1.d)
- [ ] Destinatari o categorie di destinatari (13.1.e) — "partner selezionati" non basta
- [ ] Trasferimenti extra-SEE e garanzie, con modalità per ottenerne copia (13.1.f)
- [ ] Periodo di conservazione o criteri (13.2.a) — per categoria
- [ ] Diritti Artt. 15-22 (13.2.b), inclusa opposizione evidenziata separatamente (Art. 21.4)
- [ ] Diritto di revocare il consenso (13.2.c)
- [ ] Diritto di reclamo al Garante (13.2.d) — con riferimento a garanteprivacy.it
- [ ] Se il conferimento è obbligatorio e conseguenze del rifiuto (13.2.e)
- [ ] Esistenza di decisioni automatizzate/profilazione, logica, conseguenze (13.2.f)

Art. 14 (dati non ottenuti dall'interessato, es. scraping, liste acquistate, dati inseriti da altri utenti): aggiungere **fonte** dei dati e categorie, e fornire l'informativa entro un mese.

Art. 12: linguaggio chiaro e semplice; risposta alle richieste entro **1 mese**, prorogabile di 2 mesi motivando; gratuità salvo richieste manifestamente infondate/eccessive. Approccio a livelli consigliato (WP260 rev.01, Linee guida trasparenza).

Red flag testuali → 🟡 minimo:
- "potremmo", "ad esempio", "tra cui", "in alcuni casi" senza elenco chiuso
- "possiamo modificare la presente policy in qualsiasi momento" senza obbligo di notifica per modifiche sostanziali
- "Utilizzando il sito accetti la privacy policy" → l'informativa non si "accetta"; confonde informativa e consenso → 🟠 se usato come base per trattamenti che richiedono consenso

## 4. Accountability e privacy by design — Artt. 24-25

- Default più protettivo (Art. 25.2): profili pubblici, condivisioni, tracking disattivati di default
- Pseudonimizzazione dove possibile; separazione degli identificativi dai dati di uso
- Policy interne documentate

## 5. Ruoli — Artt. 26-28

- **Responsabili (Art. 28)**: ogni fornitore che tratta dati per conto del titolare richiede contratto con i contenuti dell'Art. 28.3 (istruzioni documentate, riservatezza, sicurezza, sub-responsabili con autorizzazione, assistenza diritti, cancellazione/restituzione a fine servizio, audit). Fornitore senza DPA → 🟠; con dati Art. 9 → 🔴.
- **Contitolarità (Art. 26)**: Meta Pixel / pulsanti social → contitolarità per la raccolta (CGUE C-40/17 Fashion ID). Serve accordo e informativa sul suo contenuto essenziale.
- **Ruolo del titolare B2B**: in un SaaS B2B il cliente è spesso titolare e il SaaS responsabile → il SaaS deve offrire un DPA, e non deve usare i dati dei clienti per finalità proprie (es. training) senza essere qualificato come titolare per quella finalità.

## 6. Registro, DPIA, DPO

- **Registro Art. 30**: obbligatorio salvo esenzione < 250 dipendenti, che **non** si applica se il trattamento non è occasionale, o include Art. 9/10, o presenta rischi. Per un'app, quasi sempre obbligatorio.
- **DPIA Art. 35**: obbligatoria se rischio elevato. In Italia vedi elenco Garante (provv. 467/2018) — tra cui trattamenti su larga scala di dati sanitari, profilazione, geolocalizzazione, dati di soggetti vulnerabili, nuove tecnologie (incluse AI). Criteri WP248: due o più criteri → DPIA di norma necessaria. Assenza quando dovuta → 🟠/🔴.
- **DPO Art. 37**: obbligatorio se attività principali = monitoraggio regolare e sistematico su larga scala, o trattamento su larga scala di Art. 9/10. Comunicazione dei dati di contatto al Garante.

## 7. Rappresentante UE — Art. 27

Titolare extra-UE che offre beni/servizi a interessati UE o ne monitora il comportamento (Art. 3.2) → deve designare un rappresentante nell'UE, indicato nell'informativa.

## 8. Sanzioni e responsabilità

- Art. 83.4: fino a 10 M€ o 2% fatturato mondiale (es. Artt. 8, 25, 28, 30, 32-35, 37)
- Art. 83.5: fino a 20 M€ o 4% (principi, basi giuridiche, consenso, Art. 9, diritti, trasferimenti)
- Art. 82: risarcimento del danno materiale o immateriale; la CGUE (C-300/21 Österreichische Post) ha chiarito che serve un danno, ma senza soglia di gravità.
- Art. 80: azioni rappresentative tramite enti; Dir. (UE) 2020/1828 azioni rappresentative dei consumatori (in Italia D.Lgs. 28/2023).
- Codice Privacy Artt. 166-167: sanzioni amministrative e illeciti penali (es. trattamento illecito con danno).
