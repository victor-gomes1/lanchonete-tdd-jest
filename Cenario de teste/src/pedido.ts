import { Cliente } from "./cliente";
import { CalculadoraDesconto } from "./desconto";

export type StatusPedido = "CRIADO" | "EM_PREPARACAO" | "PRONTO" | "ENTREGUE" | "CANCELADO";

export interface ItemPedido {
  nome: string;
  preco: number;
  quantidade: number;
}

export class Pedido {
  private cliente: Cliente;
  private itens: ItemPedido[] = [];
  private status: StatusPedido = "CRIADO";

  constructor(cliente: Cliente) {
    this.cliente = cliente;
  }

  public adicionarProduto(nome: string, preco: number, quantidade: number = 1): void {
    if (preco < 0) {
      throw new Error("O preço do produto não pode ser menor que zero.");
    }
    if (quantidade <= 0) {
      throw new Error("A quantidade de itens deve ser maior que zero.");
    }

    this.itens.push({ nome, preco, quantidade });
  }

  public calcularSubtotal(): number {
    if (this.itens.length === 0) {
      throw new Error("O pedido precisa possuir pelo menos um produto.");
    }

    return this.itens.reduce((total, item) => total + item.preco * item.quantidade, 0);
  }

  public calcularDesconto(): number {
    const subtotal = this.calcularSubtotal();
    return CalculadoraDesconto.calcular(subtotal);
  }

  public calcularValorFinal(): number {
    const subtotal = this.calcularSubtotal();
    const desconto = this.calcularDesconto();
    return subtotal - desconto;
  }

  public getStatus(): StatusPedido {
    return this.status;
  }

  public alterarStatus(novoStatus: StatusPedido): void {
    if (novoStatus === "CANCELADO" && this.status === "ENTREGUE") {
      throw new Error("Um pedido entregue não pode ser cancelado.");
    }

    if (novoStatus === "ENTREGUE" && this.status !== "PRONTO") {
      throw new Error("Um pedido só pode ser marcado como ENTREGUE depois de estar PRONTO.");
    }

    this.status = novoStatus;
  }
}