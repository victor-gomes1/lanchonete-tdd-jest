import { Cliente } from "../src/cliente";
import { Pedido } from "../src/pedido";

describe("Regras do Pedido (RN02, RN04, RN05, RN06, RN07)", () => {
  let clienteValido: Cliente;

  beforeEach(() => {
    clienteValido = new Cliente("Carlos");
  });

  test("RN02 — Deve lançar erro ao calcular subtotal de pedido sem produtos", () => {
    const pedido = new Pedido(clienteValido);
    expect(() => pedido.calcularSubtotal()).toThrow(
      "O pedido precisa possuir pelo menos um produto."
    );
  });

  test("RN04 — Não deve aceitar produto com preço negativo", () => {
    const pedido = new Pedido(clienteValido);
    expect(() => pedido.adicionarProduto("Hambúrguer", -20.00)).toThrow(
      "O preço do produto não pode ser menor que zero."
    );
  });

  test("RN04 — Não deve aceitar produto com quantidade zero ou negativa", () => {
    const pedido = new Pedido(clienteValido);
    expect(() => pedido.adicionarProduto("Batata", 10.00, 0)).toThrow(
      "A quantidade de itens deve ser maior que zero."
    );
  });

  test("Deve calcular subtotal e valor final corretamente com desconto", () => {
    const pedido = new Pedido(clienteValido);
    pedido.adicionarProduto("Hambúrguer", 20.00, 5);
    pedido.adicionarProduto("Batata", 10.00, 1);

    expect(pedido.calcularSubtotal()).toBe(110.00);
    expect(pedido.calcularDesconto()).toBe(11.00);
    expect(pedido.calcularValorFinal()).toBe(99.00);
  });

  test("RN05 — Deve iniciar o pedido com o status CRIADO", () => {
    const pedido = new Pedido(clienteValido);
    expect(pedido.getStatus()).toBe("CRIADO");
  });

  test("RN07 — Deve impeder marcar como ENTREGUE se o pedido não estiver PRONTO", () => {
    const pedido = new Pedido(clienteValido);
    pedido.alterarStatus("EM_PREPARACAO");

    expect(() => pedido.alterarStatus("ENTREGUE")).toThrow(
      "Um pedido só pode ser marcado como ENTREGUE depois de estar PRONTO."
    );
  });

  test("RN07 — Deve permitir marcar como ENTREGUE quando o pedido estiver PRONTO", () => {
    const pedido = new Pedido(clienteValido);
    pedido.alterarStatus("EM_PREPARACAO");
    pedido.alterarStatus("PRONTO");
    pedido.alterarStatus("ENTREGUE");

    expect(pedido.getStatus()).toBe("ENTREGUE");
  });

  test("RN06 — Não deve permitir cancelar um pedido que já foi ENTREGUE", () => {
    const pedido = new Pedido(clienteValido);
    pedido.alterarStatus("EM_PREPARACAO");
    pedido.alterarStatus("PRONTO");
    pedido.alterarStatus("ENTREGUE");

    expect(() => pedido.alterarStatus("CANCELADO")).toThrow(
      "Um pedido entregue não pode ser cancelado."
    );
  });

  test("Deve permitir cancelar um pedido que ainda não foi entregue", () => {
    const pedido = new Pedido(clienteValido);
    pedido.alterarStatus("CANCELADO");
    expect(pedido.getStatus()).toBe("CANCELADO");
  });
});