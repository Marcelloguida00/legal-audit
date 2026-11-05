"use strict";
const test = require("node:test");
const assert = require("node:assert");
const path = require("path");
const { validate } = require("./validate-findings.cjs");

const example = require(path.join(__dirname, "..", "examples", "findings.example.json"));
const clone = (o) => JSON.parse(JSON.stringify(o));

test("l'esempio è valido", () => {
  assert.deepStrictEqual(validate(example), []);
});

test("rifiuta un oggetto al posto dell'array", () => {
  assert.ok(validate({}).length > 0);
});

test("rifiuta severità sconosciuta", () => {
  const f = clone(example); f[0].severity = "urgent";
  assert.ok(validate(f).some((e) => e.includes("non ammesso")));
});

test("rifiuta base normativa generica", () => {
  const f = clone(example); f[1].legal_basis = ["GDPR"];
  assert.ok(validate(f).some((e) => e.includes("generica")));
});

test("rifiuta id duplicati", () => {
  const f = clone(example); f[1].id = "LA-001";
  assert.ok(validate(f).some((e) => e.includes("duplicato")));
});

test("rifiuta critical con needs-info", () => {
  const f = clone(example); f[0].confidence = "needs-info";
  assert.ok(validate(f).some((e) => e.includes("needs-info")));
});

test("rifiuta mitigazione vuota", () => {
  const f = clone(example); f[1].mitigation = {};
  assert.ok(validate(f).some((e) => e.includes("almeno 1")));
});

test("rifiuta campi non previsti", () => {
  const f = clone(example); f[0].foo = 1;
  assert.ok(validate(f).some((e) => e.includes("non previsto")));
});

test("rifiuta location vuota", () => {
  const f = clone(example); f[0].location = [];
  assert.ok(validate(f).some((e) => e.includes("almeno 1")));
});
