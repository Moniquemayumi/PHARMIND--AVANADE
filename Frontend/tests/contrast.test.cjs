const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const css = fs.readFileSync(path.join(__dirname, '..', 'css', 'styles.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const theme = css.match(/body\.high-contrast\s*\{([^}]+)\}/)[1];
const variables = Object.fromEntries([...theme.matchAll(/(--[\w-]+):\s*(#[\da-f]{6})/gi)].map(match => [match[1], match[2]]));
function value(selector, property) {
  let found;
  for (const rule of css.matchAll(/([^{}]+)\{([^{}]+)\}/g)) {
    if (!rule[1].split(',').map(part => part.trim()).includes(selector)) continue;
    for (const declaration of rule[2].split(';')) {
      const colon = declaration.indexOf(':');
      if (declaration.slice(0, colon).trim() === property) found = declaration.slice(colon + 1).replace(/!important/g, '').trim();
    }
  }
  const variable = found?.match(/^var\((--[\w-]+)\)$/);
  return variable ? variables[variable[1]] : found;
}
function luminance(hex) {
  assert.match(hex, /^#[\da-f]{6}$/i);
  const rgb = [1, 3, 5].map(index => parseInt(hex.slice(index, index + 2), 16) / 255)
    .map(channel => channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4);
  return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
}
function contrast(a, b) { const values = [luminance(a), luminance(b)].sort((a, b) => b - a); return (values[0] + .05) / (values[1] + .05); }

test('atalhos do cabeçalho têm pares de texto e fundo com pelo menos 7:1', () => {
  for (const name of ['action-btn', 'action-accessibility', 'btn-ai-quick-shortcut', 'btn-secondary', 'chip-item']) {
    const selector = `body.high-contrast .${name}`;
    assert.ok(contrast(value(selector, 'color'), value(selector, 'background')) >= 7, name);
  }
});
test('campos e conversa mantêm contraste de pelo menos 7:1', () => {
  for (const name of ['search-input', 'form-input', 'chat-messages', 'chat-input-bar', 'bot-bubble', 'user-bubble', 'cart-qty-ctrl']) {
    const selector = `body.high-contrast .${name}`;
    assert.ok(contrast(value(selector, 'color'), value(selector, 'background')) >= 7, name);
  }
});
test('ações principais preservam contraste também ao passar o mouse', () => {
  for (const name of ['btn-primary', 'btn-search', 'btn-add-cart', 'btn-chat-send']) {
    for (const state of ['', ':hover']) {
      const selector = `body.high-contrast .${name}${state}`;
      assert.ok(contrast(value(selector, 'color'), value(selector, 'background')) >= 7, name + state);
    }
  }
});
test('textos auxiliares, links e contadores contrastam com as superfícies do tema', () => {
  for (const background of ['--color-surface', '--color-surface-soft', '--color-blue-soft']) {
    for (const foreground of ['--color-text-main', '--color-text-muted', '--color-action-blue']) {
      assert.ok(contrast(variables[foreground], variables[background]) >= 7, foreground + ' / ' + background);
    }
  }
  for (const name of ['cart-badge', 'discount-badge', 'payment-tag']) {
    const selector = `body.high-contrast .${name}`;
    assert.ok(contrast(value(selector, 'color'), value(selector, 'background')) >= 7, name);
  }
});
