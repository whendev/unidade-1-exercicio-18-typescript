import { Venda } from './venda';
import { Endereco } from './endereco';
import { Loja } from './loja';
import { Produto } from './produto';
import { Item } from './item';
import { Impressora_fiscal } from './impressora_fiscal';

function verificaCampoObrigatorio(mensagemEsperada: string, venda: Venda,item: number, produto: Produto, quantidade: number) {
  try {
    venda.adicionar_item(item, produto, quantidade);
  } catch (e) {
    expect(e.message).toBe(mensagemEsperada);
  }
}

// Todas as variáveis preenchidas
const NOME_LOJA = "Loja 1"
const LOGRADOURO = "Log 1"
const NUMERO = 10
const COMPLEMENTO = "C1"
const BAIRRO = "Bai 1"
const MUNICIPIO = "Mun 1"
const ESTADO = "E1"
const CEP = "11111-111"
const TELEFONE = "(11) 1111-1111"
const OBSERVACAO = "Obs 1"
const CNPJ = "11.111.111/1111-11"
const INSCRICAO_ESTADUAL = "123456789"

const DATAHORA = "17/10/2020 13:00:00"
const CCF = "021784"
const COO = "035804"
const OPERADOR = "494715"
const MODELO = "SWEDA IF ST200"
const ECF_IF = "01.00.05"
const ECF = "067"
const SERIAL = "SW031300000000045629"

let produto1: Produto = new Produto(100, "Banana", "cx", 7.45, "ST");
let produto2: Produto = new Produto(101, "Laranja", "cx", 3.32, "ST");

let produto3: Produto = new Produto(102, "Leite", "l", 2.15, "");
let produto4: Produto = new Produto(103, "batata", "k", 0, "");

const TEXTO_ESPERADO_CENARIO_1 = `Loja 1
Log 1, 10 C1
Bai 1 - Mun 1 - E1
CEP:11111-111 Tel (11) 1111-1111
Obs 1
CNPJ: 11.111.111/1111-11
IE: 123456789
------------------------------
17/10/2020 13:00:00V CCF:021784 COO: 035804
CUPOM FISCAL
ITEM CODIGO DESCRICAO QTD UN VL UNIT(R$) ST VL ITEM(R$)
1 100 Banana 10 cx 7.45 ST 74.50
2 101 Laranja 5 cx 3.32 ST 16.60
------------------------------
TOTAL R$ 91.10
Dinheiro 100.00
Troco R$ 8.90
Lei 12.741, Valor aprox., Imposto F=6.87 (7.54%), E=4.38 (4.81%)
------------------------------
OPERADOR: 494715
------------------------------
SWEDA IF ST200
ECF-IF VERSÃO: 01.00.05 ECF: 067
FAB: SW031300000000045629`

const TEXTO_ESPERADO_CENARIO_2 = `Loja 1
Log 1, 10 C1
Bai 1 - Mun 1 - E1
CEP:11111-111 Tel (11) 1111-1111
Obs 1
CNPJ: 11.111.111/1111-11
IE: 123456789
------------------------------
17/10/2020 13:00:00V CCF:021784 COO: 035804
CUPOM FISCAL
ITEM CODIGO DESCRICAO QTD UN VL UNIT(R$) ST VL ITEM(R$)
1 101 Laranja 3 cx 3.32 ST 9.96
------------------------------
TOTAL R$ 9.96
Dinheiro 54.50
Troco R$ 44.54
Lei 12.741, Valor aprox., Imposto F=0.75 (7.54%), E=0.48 (4.81%)
------------------------------
OPERADOR: 494715
------------------------------
SWEDA IF ST200
ECF-IF VERSÃO: 01.00.05 ECF: 067
FAB: SW031300000000045629`

const TEXTO_ESPERADO_CENARIO_3 = `Loja 1
Log 1, 10 C1
Bai 1 - Mun 1 - E1
CEP:11111-111 Tel (11) 1111-1111
Obs 1
CNPJ: 11.111.111/1111-11
IE: 123456789
------------------------------
17/10/2020 13:00:00V CCF:021784 COO: 035804
CUPOM FISCAL
ITEM CODIGO DESCRICAO QTD UN VL UNIT(R$) ST VL ITEM(R$)
1 100 Banana 10 cx 7.45 ST 74.50
2 101 Laranja 5 cx 3.32 ST 16.60
------------------------------
TOTAL R$ 91.10
Credito 91.10
Troco R$ 0.00
Lei 12.741, Valor aprox., Imposto F=6.87 (7.54%), E=4.38 (4.81%)
------------------------------
OPERADOR: 494715
------------------------------
SWEDA IF ST200
ECF-IF VERSÃO: 01.00.05 ECF: 067
FAB: SW031300000000045629`

const TEXTO_ESPERADO_CENARIO_4 = `Loja 1
Log 1, 10 C1
Bai 1 - Mun 1 - E1
CEP:11111-111 Tel (11) 1111-1111
Obs 1
CNPJ: 11.111.111/1111-11
IE: 123456789
------------------------------
17/10/2020 13:00:00V CCF:021784 COO: 035804
CUPOM FISCAL
ITEM CODIGO DESCRICAO QTD UN VL UNIT(R$) ST VL ITEM(R$)
1 101 Laranja 3 cx 3.32 ST 9.96
------------------------------
TOTAL R$ 9.96
Debito 9.96
Troco R$ 0.00
Lei 12.741, Valor aprox., Imposto F=0.75 (7.54%), E=0.48 (4.81%)
------------------------------
OPERADOR: 494715
------------------------------
SWEDA IF ST200
ECF-IF VERSÃO: 01.00.05 ECF: 067
FAB: SW031300000000045629`

let endereco: Endereco = new Endereco(LOGRADOURO, NUMERO, COMPLEMENTO, BAIRRO, MUNICIPIO, ESTADO, CEP);
let loja: Loja = new Loja(NOME_LOJA,endereco,TELEFONE,OBSERVACAO,CNPJ,INSCRICAO_ESTADUAL);
let impressora_fiscal: Impressora_fiscal = new Impressora_fiscal(MODELO, ECF_IF, ECF, SERIAL);


// TESTES CUPOM COMPLETO

test('Venda', () => {
  let venda = loja.vender(DATAHORA, CCF, COO, OPERADOR, impressora_fiscal);
  venda.adicionar_item(1, produto1, 10);
  venda.adicionar_item(2, produto2, 5);
  venda.pagar(100, 1);
  expect(venda.imprimeCupom()).toBe(TEXTO_ESPERADO_CENARIO_1);
});

test('Venda2', () => {
  let venda = loja.vender(DATAHORA, CCF, COO, OPERADOR, impressora_fiscal);
  venda.adicionar_item(1, produto2, 3);
  venda.pagar(54.50, 1);
  expect(venda.imprimeCupom()).toBe(TEXTO_ESPERADO_CENARIO_2);
});

test('Venda3', () => {
  let venda = loja.vender(DATAHORA, CCF, COO, OPERADOR, impressora_fiscal);
  venda.adicionar_item(1, produto1, 10);
  venda.adicionar_item(2, produto2, 5);
  venda.pagar(91.10, 2);
  expect(venda.imprimeCupom()).toBe(TEXTO_ESPERADO_CENARIO_3);
});

test('Venda4', () => {
  let venda = loja.vender(DATAHORA, CCF, COO, OPERADOR, impressora_fiscal);
  venda.adicionar_item(1, produto2, 3);
  venda.pagar(9.96, 3);
  expect(venda.imprimeCupom()).toBe(TEXTO_ESPERADO_CENARIO_4);
});

// TESTES PAGAMENTOS

test('Venda_pagamento_valor_abaixo', () => {
  let venda = loja.vender(DATAHORA, CCF, COO, OPERADOR, impressora_fiscal);
  try {
    venda.adicionar_item(1, produto1, 10);
    venda.adicionar_item(2, produto2, 5);
    venda.pagar(90.00, 2);
  } catch (e) {
    expect(e.message).toBe("O valor da compra é maior que o pagamento!");
  }
});

test('Venda_pagamento_forma_invalida', () => {
  let venda = loja.vender(DATAHORA, CCF, COO, OPERADOR, impressora_fiscal);
  try {
    venda.adicionar_item(1, produto1, 10);
    venda.adicionar_item(2, produto2, 5);
    venda.pagar(91.10, 5);
  } catch (e) {
    expect(e.message).toBe("Forma de pagamento invalida");
  }
});

test('Venda_sem_pagamento', () => {
  try{
    let venda = loja.vender(DATAHORA, CCF, COO, OPERADOR, impressora_fiscal);
    venda.adicionar_item(1, produto1, 10);
    venda.adicionar_item(2, produto2, 5);
  } catch(e){
    expect(e.message).toBe("Voce precisa realizar o pagamento para imprimir o cupom");
  }
});

// TESTES ITENS

test('Venda_itens_duplicados', () => {
  let venda = loja.vender(DATAHORA, CCF, COO, OPERADOR, impressora_fiscal);
  venda.adicionar_item(1, produto1, 10);
  verificaCampoObrigatorio("Voce não pode inserir o mesmo produto com itens diferentes", venda, 2, produto1, 3)
});

test('Venda_item_vazio', () => {
  let venda = loja.vender(DATAHORA, CCF, COO, OPERADOR, impressora_fiscal);
  verificaCampoObrigatorio("Insira a quantidade de itens", venda, 0, produto2, 3)
});

test('Venda_valor_unitazio_zero', () => {
  let venda = loja.vender(DATAHORA, CCF, COO, OPERADOR, impressora_fiscal);
  verificaCampoObrigatorio("item não pode ser adicionado na venda com produto nesse estado", venda, 3, produto4, 3)
});

test('Venda_sem_itens', () => {
  let venda = loja.vender(DATAHORA, CCF, COO, OPERADOR, impressora_fiscal);
  try {
    venda.imprimeCupom()
  } catch (e) {
    expect(e.message).toBe("Voce precisa adicionar itens a sua venda");
  }
});

// TESTE DE DADOS DA IMPRESSORA


test('Impressora_sem_modelo', () => {
  let impressora_fiscal: Impressora_fiscal = new Impressora_fiscal("", ECF_IF, ECF, SERIAL);
  let venda = loja.vender(DATAHORA, CCF, COO, OPERADOR, impressora_fiscal);
  venda.adicionar_item(1, produto1, 10);
  venda.adicionar_item(2, produto2, 5);
  venda.pagar(100, 1);
  try {
    venda.imprimeCupom()
  } catch (e) {
    expect(e.message).toBe("É preciso informar o modelo da impressora");
  }
});

test('Impressora_sem_ecf_if', () => {
  let impressora_fiscal: Impressora_fiscal = new Impressora_fiscal(MODELO, null, ECF, SERIAL);
  let venda = loja.vender(DATAHORA, CCF, COO, OPERADOR, impressora_fiscal);
  venda.adicionar_item(1, produto1, 10);
  venda.adicionar_item(2, produto2, 5);
  venda.pagar(100, 1);
  try {
    venda.imprimeCupom()
  } catch (e) {
    expect(e.message).toBe("É preciso informar a versão do ECF-IF da impressora");
  }
});

test('Impressora_sem_ecf', () => {
  let impressora_fiscal: Impressora_fiscal = new Impressora_fiscal(MODELO, ECF_IF, "", SERIAL);
  let venda = loja.vender(DATAHORA, CCF, COO, OPERADOR, impressora_fiscal);
  venda.adicionar_item(1, produto1, 10);
  venda.adicionar_item(2, produto2, 5);
  venda.pagar(100, 1);
  try {
    venda.imprimeCupom()
  } catch (e) {
    expect(e.message).toBe("É preciso informar a versão do ECF da impressora");
  }
});

test('Impressora_sem_serial', () => {
  let impressora_fiscal: Impressora_fiscal = new Impressora_fiscal(MODELO, ECF_IF, ECF, "");
  let venda = loja.vender(DATAHORA, CCF, COO, OPERADOR, impressora_fiscal);
  venda.adicionar_item(1, produto1, 10);
  venda.adicionar_item(2, produto2, 5);
  venda.pagar(100, 1);
  try {
    venda.imprimeCupom()
  } catch (e) {
    expect(e.message).toBe("É preciso informar o número serial da impressora");
  }
});

// TESTE OPERADOR

test('Operador vazio', () => {
  let impressora_fiscal: Impressora_fiscal = new Impressora_fiscal(MODELO, ECF_IF, ECF, SERIAL);
  let venda = loja.vender(DATAHORA, CCF, COO, "", impressora_fiscal);
  venda.adicionar_item(1, produto1, 10);
  venda.adicionar_item(2, produto2, 5);
  venda.pagar(100, 1);
  try {
    venda.imprimeCupom()
  } catch (e) {
    expect(e.message).toBe("É necessario informar um operador");
  }
});