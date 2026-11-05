# Sicurezza del trattamento e data breach

Norme: Art. 5.1.f, 25, 32, 33, 34 GDPR; Provv. Garante amministratori di sistema (27/11/2008 e succ.); D.Lgs. 138/2024 (recepimento NIS2) se il soggetto rientra nei settori/dimensioni; Linee guida EDPB 9/2022 sulla notifica dei data breach.

Questa reference copre la sicurezza **dal punto di vista legale** (misure adeguate e dimostrabili). Per una revisione tecnica delle vulnerabilità del codice usa una skill di security audit dedicata.

## 1. Misure Art. 32 — cosa verificare

| Area | Controllo | Finding se manca |
|---|---|---|
| Cifratura in transito | HTTPS ovunque, HSTS, niente endpoint HTTP che accettano dati personali | 🟠 (🔴 con Art. 9) |
| Cifratura at rest | DB/storage cifrati; campi sensibili cifrati a livello applicativo | 🟡 (🔴 con Art. 9) |
| Password | Hash adattivo (bcrypt/scrypt/argon2), mai in chiaro o reversibili, non inviate via email | 🔴 |
| Controllo accessi | RBAC, MFA per admin e accesso a produzione, revoca accessi ex-dipendenti | 🟠 |
| Amministratori di sistema | Elenco nominativo, log degli accessi conservati ≥ 6 mesi, inalterabili, verifica annuale (provv. Garante 2008) | 🟡/🟠 |
| Segreti | Chiavi API non nel repository/client bundle | 🔴 se esposte |
| Backup | Cifrati, testati, retention definita | 🟡 |
| Log | Senza password, token, dati sanitari, body completi | 🟠 |
| Ambienti di test | Niente dati reali di produzione non pseudonimizzati | 🟠 |
| Fornitori | Garanzie di sicurezza nel DPA (Art. 28.3.c) | 🟡 |
| Test periodici | Procedura per testare e valutare le misure (32.1.d) | 🟢/🟡 |

## 2. Data breach — Artt. 33-34

- [ ] Procedura scritta di gestione incidenti con ruoli e contatti
- [ ] Notifica al Garante **entro 72 ore** dalla conoscenza, salvo improbabilità del rischio (33.1) — tramite procedura telematica del Garante
- [ ] Comunicazione agli interessati senza ingiustificato ritardo se rischio elevato (34)
- [ ] **Registro di tutte le violazioni**, anche non notificate (33.5)
- [ ] I responsabili devono informare il titolare senza ingiustificato ritardo (33.2) — termine nel DPA (es. 24-48h)
- [ ] Se soggetto NIS2: pre-notifica al CSIRT Italia entro 24h e notifica entro 72h per incidenti significativi, in parallelo al GDPR

Assenza di procedura e registro → 🟠.

## 3. Clausole di sicurezza nei documenti

Debole (policy):
> Adottiamo le migliori misure di sicurezza per proteggere i tuoi dati, che sono quindi al sicuro.

Problema: promessa assoluta ("al sicuro") sfruttabile in contenzioso e come pratica ingannevole; nessuna informazione utile.

Solido:
> Adottiamo misure tecniche e organizzative adeguate al rischio ai sensi dell'art. 32 GDPR, tra cui cifratura dei dati in transito (TLS) e a riposo, controllo degli accessi basato sui ruoli con autenticazione a più fattori per il personale autorizzato, registrazione degli accessi e backup periodici cifrati. Nessun sistema è completamente esente da rischi: in caso di violazione dei dati personali che presenti un rischio elevato per i tuoi diritti, te ne daremo comunicazione ai sensi dell'art. 34 GDPR.
