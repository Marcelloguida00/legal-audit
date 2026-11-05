# Trasferimenti internazionali, fornitori e normative extra-UE

## 1. Trasferimenti extra-SEE — Capo V GDPR (Artt. 44-49)

Ogni flusso di dati personali verso un Paese fuori dal SEE (incluso accesso remoto da supporto tecnico extra-UE) richiede uno di:

1. **Decisione di adeguatezza** (Art. 45): es. UK, Svizzera, Giappone, Corea del Sud, Canada (commerciale), Israele, Nuova Zelanda, Argentina, Uruguay; **USA solo per organizzazioni certificate EU-US Data Privacy Framework** (decisione 10 luglio 2023; il Tribunale UE ha respinto il ricorso Latombe T-553/23 il 3/9/2025 — verifica eventuali impugnazioni successive). Controlla la certificazione su dataprivacyframework.gov e che copra i dati HR/non-HR pertinenti.
2. **Clausole contrattuali standard** (Art. 46.2.c, Decisione (UE) 2021/914) con modulo corretto (C2C, C2P, P2P, P2C) + **Transfer Impact Assessment** (Raccomandazioni EDPB 01/2020) + misure supplementari se necessarie.
3. **BCR** (Art. 47).
4. **Deroghe Art. 49**: solo occasionali e non sistematiche. Il consenso esplicito al trasferimento **non** è una base valida per un trasferimento strutturale verso un fornitore → 🟠 se usato così.

Checklist:
- [ ] Ogni fornitore con server o accesso extra-SEE è identificato (inclusi sub-sub-responsabili)
- [ ] Meccanismo indicato per ciascuno nell'informativa (Art. 13.1.f) con modalità per ottenerne copia
- [ ] SCC firmate (spesso incluse nel DPA del fornitore — verificarne la versione 2021)
- [ ] TIA documentata per i trasferimenti basati su SCC
- [ ] Preferire regioni UE quando disponibili (OpenAI/Anthropic/Google/AWS/Azure offrono data residency UE per alcuni prodotti — verifica il piano)

Fornitore senza alcun meccanismo → 🔴 (Art. 44, sanzione Art. 83.5.c).

## 2. Fornitori e DPA — Art. 28

Per ogni fornitore della data map:

| Fornitore | Ruolo (responsabile/titolare autonomo/contitolare) | DPA firmato | Versione SCC | Paese/regione | Usa i dati per finalità proprie? (es. training) | Sub-responsabili notificati | Retention lato fornitore |
|---|---|---|---|---|---|---|---|

Attenzione ai fornitori AI: verifica se i termini API escludono il training sui dati del cliente e la retention dei prompt (zero data retention disponibile su richiesta per alcuni). Piani "consumer" di chatbot usati dal personale con dati dei clienti → 🔴.

Fornitori che si qualificano come **titolari autonomi** (es. Google per alcuni usi di Analytics/Ads, Meta per pixel, PayPal/Stripe per antifrode/obblighi propri) vanno indicati come tali nell'informativa, non come "responsabili".

## 3. Normative extra-UE (caricare solo se il mercato è pertinente)

### UK — UK GDPR + Data Protection Act 2018, modificati dal Data (Use and Access) Act 2025
- Simile al GDPR; adeguatezza UE→UK rinnovata dalla Commissione nel 2025 (verifica). Per UK→paesi terzi: IDTA o Addendum UK alle SCC UE.
- Rappresentante nel Regno Unito se titolare non stabilito nel Regno Unito.
- PECR per cookie (alcune esenzioni per analytics introdotte dal DUAA 2025 — verifica entrata in vigore).

### Svizzera — nLPD (in vigore dal 1/9/2023)
- Informativa con Paesi di destinazione (elenco nominativo), sanzioni penali **personali** fino a CHF 250.000 per violazioni intenzionali degli obblighi di informazione.
- Swiss-US DPF per USA certificati.

### USA — California CCPA/CPRA (e leggi statali analoghe: VA, CO, CT, UT, TX, OR, ecc.)
Si applica se si superano le soglie (fatturato annuo indicizzato, ca. 26,6 M$ nel 2025; o volume di consumatori/household ≥ 100.000; o ≥ 50% ricavi da vendita/condivisione dati).
- [ ] "Notice at collection" con categorie, finalità, retention per categoria
- [ ] Link "Do Not Sell or Share My Personal Information" se ci sono pixel pubblicitari cross-context (sharing = behavioral advertising)
- [ ] "Limit the Use of My Sensitive Personal Information" se si usano SPI oltre gli scopi consentiti
- [ ] Rispetto del segnale **Global Privacy Control** come opt-out
- [ ] Contratti con service provider/contractor con clausole obbligatorie
- [ ] Policy aggiornata almeno ogni 12 mesi
- [ ] Dati sanitari dei consumatori: Washington My Health My Data Act (ambito molto ampio, azione privata) — rilevante per app benessere/salute
- [ ] Minori: COPPA (< 13 anni, consenso genitoriale verificabile)

### Brasile — LGPD
Basi giuridiche simili; Encarregado (DPO) obbligatorio salvo eccezioni; trasferimenti con clausole ANPD (Res. 19/2024).

## 4. Riscritture tipiche

Debole:
> I tuoi dati potrebbero essere trasferiti al di fuori dell'UE nel rispetto della normativa vigente.

Solido:
> Alcuni fornitori trattano i dati al di fuori dello Spazio Economico Europeo. Per ciascuno indichiamo il Paese e la garanzia adottata ai sensi del Capo V del GDPR:
> - **[Fornitore]** ([finalità]) — Stati Uniti — adesione all'EU-US Data Privacy Framework (decisione di adeguatezza della Commissione del 10 luglio 2023);
> - **[Fornitore]** ([finalità]) — [Paese] — Clausole Contrattuali Standard (Decisione (UE) 2021/914), modulo [2];
> Puoi ottenere copia delle garanzie scrivendo a [email].
