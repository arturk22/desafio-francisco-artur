class CaixaDaLanchonete {
  constructor() {
    this.cardapio = {
      cafe: 3.0,
      chantily: 1.5,
      suco: 6.2,
      sanduiche: 6.5,
      queijo: 2.0,
      salgado: 7.25,
      combo1: 9.5,
      combo2: 7.5,
    };

    this.extras = {
      chantily: "cafe",
      queijo: "sanduiche",
    };

    this.desconto = {
      dinheiro: 0.95,
      debito: 1,
      credito: 1.03,
    };
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    if (!this.desconto[metodoDePagamento]) {
      return "Forma de pagamento inválida!";
    }

    if (!itens.length) {
      return "Não há itens no carrinho de compra!";
    }

    let total = 0;
    let itensPrincipais = new Set();
    let itensExtras = new Set();

    for (let item of itens) {
      const [codigo, quantidade] = item.split(",");

      if (!this.cardapio[codigo]) {
        return "Item inválido!";
      }

      if (quantidade == 0) {
        return "Quantidade inválida!";
      }

      if (this.extras[codigo]) {
        itensExtras.add(codigo);
      } else {
        itensPrincipais.add(codigo);
      }

      total += this.cardapio[codigo] * quantidade;
    }

    for (let extra of itensExtras) {
      if (!itensPrincipais.has(this.extras[extra])) {
        return "Item extra não pode ser pedido sem o principal";
      }
    }

    total *= this.desconto[metodoDePagamento];

    return `R$ ${total.toFixed(2).replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };
