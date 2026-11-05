#!/usr/bin/env node
/**
 * Valida findings.json contro report-schema.json, senza dipendenze.
 * Uso: node scripts/validate-findings.cjs <findings.json>
 * Exit code: 0 valido, 1 errori di validazione, 2 errore d'uso o di lettura.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const SCHEMA = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "report-schema.json"), "utf8"));
const GENERIC_BASIS = /^\s*(gdpr|regolamento ue 2016\/679|codice privacy|ccpa|la normativa vigente)\s*$/i;

function typeOf(v) {
  if (v === null) return "null";
  if (Array.isArray(v)) return "array";
  if (typeof v === "number" && Number.isInteger(v)) return "integer";
  return typeof v;
}

function check(schema, value, at, errors) {
  if (schema.type) {
    const t = typeOf(value);
    const ok = t === schema.type || (schema.type === "number" && t === "integer");
    if (!ok) { errors.push(`${at}: atteso ${schema.type}, trovato ${t}`); return; }
  }
  if (schema.enum && !schema.enum.includes(value)) errors.push(`${at}: valore "${value}" non ammesso (${schema.enum.join(", ")})`);
  if (typeof value === "string") {
    if (schema.minLength && value.trim().length < schema.minLength) errors.push(`${at}: troppo corto (min ${schema.minLength})`);
    if (schema.pattern && !new RegExp(schema.pattern).test(value)) errors.push(`${at}: non rispetta il formato ${schema.pattern}`);
  }
  if (Array.isArray(value)) {
    if (schema.minItems && value.length < schema.minItems) errors.push(`${at}: servono almeno ${schema.minItems} elementi`);
    if (schema.items) value.forEach((v, i) => check(schema.items, v, `${at}[${i}]`, errors));
  }
  if (typeOf(value) === "object") {
    const props = schema.properties || {};
    for (const r of schema.required || []) if (!(r in value)) errors.push(`${at}: manca "${r}"`);
    if (schema.minProperties && Object.keys(value).length < schema.minProperties) errors.push(`${at}: servono almeno ${schema.minProperties} campi`);
    for (const [k, v] of Object.entries(value)) {
      if (props[k]) check(props[k], v, `${at}.${k}`, errors);
      else if (schema.additionalProperties === false) errors.push(`${at}: campo non previsto "${k}"`);
    }
  }
}

function validate(findings) {
  const errors = [];
  check(SCHEMA, findings, "$", errors);
  if (!Array.isArray(findings)) return errors;

  const seen = new Set();
  findings.forEach((f, i) => {
    if (!f || typeof f !== "object") return;
    const at = `$[${i}]${f.id ? ` (${f.id})` : ""}`;
    if (f.id) {
      if (seen.has(f.id)) errors.push(`${at}: id duplicato`);
      seen.add(f.id);
    }
    for (const b of f.legal_basis || []) {
      if (typeof b === "string" && GENERIC_BASIS.test(b)) errors.push(`${at}: base normativa generica "${b}" — cita l'articolo specifico`);
    }
    if (f.confidence === "needs-info" && f.severity === "critical") {
      errors.push(`${at}: un finding needs-info non può essere critical — spostalo in NEEDS-INFO.md o verifica il fatto`);
    }
    const pt = f.mitigation && f.mitigation.policy_text;
    if (pt && typeof pt.replace === "string" && pt.replace.trim() && pt.replace.trim() === String(pt.with).trim()) {
      errors.push(`${at}: policy_text.replace e .with sono identici`);
    }
  });
  return errors;
}

if (require.main === module) {
  const file = process.argv[2];
  if (!file) { console.error("Uso: node scripts/validate-findings.cjs <findings.json>"); process.exit(2); }
  let data;
  try { data = JSON.parse(fs.readFileSync(file, "utf8")); }
  catch (e) { console.error(`Impossibile leggere ${file}: ${e.message}`); process.exit(2); }
  const errors = validate(data);
  if (errors.length) {
    console.error(`${errors.length} errori:`);
    for (const e of errors.slice(0, 100)) console.error(`  - ${e}`);
    process.exit(1);
  }
  const counts = data.reduce((a, f) => ((a[f.severity] = (a[f.severity] || 0) + 1), a), {});
  console.log(`OK — ${data.length} finding (critical ${counts.critical || 0}, high ${counts.high || 0}, medium ${counts.medium || 0}, low ${counts.low || 0})`);
}

module.exports = { validate };
