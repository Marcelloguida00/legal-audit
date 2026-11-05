# legal-audit — skill per Claude

Una skill per [Claude Code](https://claude.com/claude-code) e Claude.ai che esegue un **pre-audit legale** di app, siti e SaaS: analizza privacy policy, cookie banner, termini di servizio, flussi di dati e codice sorgente. Individua vulnerabilità e ambiguità, le classifica per severità e indica per ognuna la correzione esatta.

> ⚠️ **Non è consulenza legale.** Il risultato è un pre-audit tecnico che serve a ridurre tempi e costi della revisione da parte di un avvocato abilitato. Non la sostituisce.

## Cosa fa

- **Stress test normativo**: consenso, conservazione, diritti degli interessati, trasferimenti extra-UE, limitazioni di responsabilità e clausole vessatorie.
- **Classificazione dei rischi**: 🔴 CRITICO · 🟠 ALTO · 🟡 MEDIO · 🟢 BASSO. Ogni finding cita l'articolo di legge violato.
- **Mitigazione pronta da applicare**:
  - testo della policy da sostituire;
  - modifica alla UI;
  - modifica al codice;
  - flusso di dati da bloccare o cifrare;
  - metodo di verifica.
- **Controllo di coerenza**: confronta ciò che la policy dichiara con ciò che il codice fa davvero (SDK, tracker, regioni dei server, cancellazione).
- **Riscrittura** dei testi deboli, a partire da una libreria di clausole.

## Copertura normativa

| Area | Norme principali |
|---|---|
| Protezione dati | GDPR, D.Lgs. 196/2003 (Codice Privacy), linee guida EDPB |
| Cookie e marketing | Dir. 2002/58/CE, Art. 122 e 130 Codice Privacy, Linee guida Garante cookie 2021 |
| Contratti e consumatori | Codice civile (artt. 1229, 1341-1342), Codice del Consumo, Direttiva Omnibus, EAA, Data Act |
| Piattaforme | DSA (Reg. 2022/2065) |
| AI | AI Act (Reg. 2024/1689), Art. 22 GDPR, L. 132/2025 |
| Dati sanitari e minori | Art. 8-9 GDPR, artt. 2-quinquies/2-septies Codice Privacy |
| Extra-UE | UK GDPR/DUAA, nLPD svizzera, CCPA/CPRA, LGPD |
| Sicurezza | Artt. 32-34 GDPR, NIS2 (D.Lgs. 138/2024) |

## Installazione

### Claude Code (personale)
```bash
git clone https://github.com/Marcelloguida00/legal-audit.git ~/.claude/skills/legal-audit
```

### Claude Code (per un solo progetto)
```bash
git clone https://github.com/Marcelloguida00/legal-audit.git .claude/skills/legal-audit
```

### Claude.ai
Comprimi la cartella in uno zip e caricala da *Settings → Capabilities → Skills*.

## Uso

Basta chiedere in linguaggio naturale; la skill si attiva da sola:

```
Fai un audit legale completo di questa app: la privacy policy è in docs/privacy.md, il codice in src/
```
```
Questa clausola di limitazione di responsabilità regge per utenti consumatori? [incolla testo]
```
```
Il nostro banner cookie è conforme alle linee guida del Garante? Ecco lo screenshot
```

In modalità **audit completo** la skill crea questi file in `~/legal-audit/<progetto>/run-<N>/`:

| File | Contenuto |
|---|---|
| `REPORT.md` | Executive summary, data map, finding ordinati per severità |
| `findings.json` | Finding in formato macchina (schema: `report-schema.json`) |
| `REWRITES.md` | Testi riscritti pronti da incollare |
| `NEEDS-INFO.md` | Fatti mancanti e il loro impatto |
| `ROPA-DRAFT.md` | Bozza di registro dei trattamenti (Art. 30) |

## Struttura

```
legal-audit/
├── SKILL.md                     # Workflow, severità, formato dei finding
├── references/                  # Checklist normative, caricate solo quando servono
│   ├── RECONNAISSANCE.md
│   ├── GDPR-CORE.md
│   ├── CONSENT-AND-COOKIES.md
│   ├── RIGHTS-AND-RETENTION.md
│   ├── TRANSFERS-AND-VENDORS.md
│   ├── TERMS-AND-LIABILITY.md
│   ├── SPECIAL-CATEGORIES.md
│   ├── AI-AND-AUTOMATION.md
│   └── SECURITY-AND-BREACH.md
├── templates/CLAUSE-LIBRARY.md  # Clausole di partenza
├── report-schema.json           # Contratto di findings.json
├── scripts/
│   ├── validate-findings.cjs    # Validatore senza dipendenze
│   ├── render-report.cjs        # Genera REPORT.md da findings.json
│   └── validate-findings.test.cjs
└── examples/findings.example.json
```

## Sviluppo

Richiede Node.js 18 o superiore. Nessuna dipendenza esterna.

```bash
node --test scripts/validate-findings.test.cjs
```
```bash
node scripts/validate-findings.cjs examples/findings.example.json
```

## Aggiornamento normativo

Il diritto digitale cambia di continuo: AI Act, Digital Omnibus, decisioni di adeguatezza, nuove linee guida EDPB. Le reference riportano la data delle norme citate e la skill invita a verificare le scadenze. Le PR di aggiornamento sono benvenute: per ogni modifica cita la fonte ufficiale (EUR-Lex, Gazzetta Ufficiale, garanteprivacy.it, edpb.europa.eu).

Ultima revisione dei contenuti: novembre 2026.

## Licenza

MIT. Vedi [LICENSE](LICENSE).
