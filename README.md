# unidade-1-exercicio-18-typescript
Exercicio 18 da disciplina de POO

Por fim, o cupom mostra o código do operador que está cadastrando a venda (494715) e dá detalhes da Impressora fiscal: modelo (SWEDA IF ST200), versão do ECF-IF (01.00.05) e ECF (067) e número serial (SW031300000000045629).

Objetivo: 

- Atualize o código para gerar o seguinte texto de cupom fiscal:

Loja 1
Log 1, 10 C1
Bai 1 - Mun 1 - E1
CEP:11111-111 Tel (11) 1111-1111
Obs 1
CNPJ: 11.111.111/1111-11
IE: 123456789
------------------------------
25/11/2020 10:30:40V CCF:021784 COO: 035804
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

## Esse exercício foi escrito em TypeScript e testado com Jest.

### Comando para execução
`npm install`

### Comando para execução
`npm run test`