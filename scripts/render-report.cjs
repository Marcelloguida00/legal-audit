#!/usr/bin/env node
/**
 * Genera REPORT.md da findings.json e da un'intestazione scritta a mano.
 * Uso: node scripts/render-report.cjs <findings.json> <header.md> <REPORT.md>
 * L'intestazione contiene: perimetro, executive summary, contesto, data map.
 * I finding vengono resi nel formato standard di SKILL.md, ordinati per severità.
 */
"use strict";
const fs = require("fs");
const { validate } = require("./validate-findings.cjs");

const [, , findingsPath, headerPath, outPath] = process.argv;
if (!findingsPath || !headerPath || !outPath) {
  console.error("Uso: node scripts/render-report.cjs <findings.json> <header.md> <REPORT.md>");
  process.exit(2);
}
const F = JSON.parse(fs.readFileSync(findingsPath, "utf8"));
const errors = validate(F);
if (errors.length) { console.error("findings.json non valido:\n  - " + errors.join("\n  - ")); process.exit(1); }

const ORDER = { critical: 0, high: 1, medium: 2, low: 3 };
const ICON = { critical: "🔴 CRITICO", high: "🟠 ALTO", medium: "🟡 MEDIO", low: "🟢 BASSO" };
const LABEL = { policy_text: "Testo", ui: "UI", code: "Codice", data_flow: "Flusso di dati", process: "Processo" };

let md = fs.readFileSync(headerPath, "utf8").trimEnd() + "\n\n## Finding\n\n";
for (const f of [...F].sort((a, b) => ORDER[a.severity] - ORDER[b.severity] || a.id.localeCompare(b.id))) {
  md += `### [${f.id}] ${ICON[f.severity]} — ${f.title}\n\n`;
  md += `**Dove**: ${f.location.join(" · ")}  \n**Norma**: ${f.legal_basis.join("; ")}`;
  if (f.confidence) md += `  \n**Affidabilità**: ${f.confidence}`;
  if (f.declared_vs_actual) md += " · **dichiarato ≠ reale**";
  md += `\n\n**Problema**: ${f.problem}\n\n**Scenario di rischio**: ${f.risk_scenario}\n\n**Mitigazione**:\n`;
  for (const [k, v] of Object.entries(f.mitigation)) {
    if (k === "policy_text") {
      md += `- *${LABEL[k]}* — ${v.replace ? "sostituire:" : "aggiungere:"}\n`;
      if (v.replace) md += `  > ~~${v.replace}~~\n  >\n`;
      md += `  > ${v.with}\n`;
    } else md += `- *${LABEL[k]}*: ${v}\n`;
  }
  md += `\n**Verifica**: ${f.verification}\n\n---\n\n`;
}
md += "> Pre-audit tecnico generato con la skill `legal-audit`. Non costituisce parere legale: va validato da un avvocato abilitato.\n";
fs.writeFileSync(outPath, md);
console.log(`Scritto ${outPath} (${F.length} finding)`);
