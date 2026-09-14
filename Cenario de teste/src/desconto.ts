export class CalculadoraDesconto {
  public static calcular(subtotal: number): number {
    if (subtotal < 0) {
      throw new Error("O subtotal não pode ser um valor negativo.");
    }

    if (subtotal > 100) {
      return subtotal * 0.10;
    }

    return 0;
  }
}