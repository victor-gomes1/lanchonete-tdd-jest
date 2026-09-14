import { CalculadoraDesconto } from "../src/desconto";

describe("RN03 e RN04 — Regra de Desconto", () => {
  test("Não deve aplicar desconto para subtotal menor que R$ 100,00", () => {
    const desconto = CalculadoraDesconto.calcular(50.00);
    expect(desconto).toBe(0);
  });

  test("Não deve aplicar desconto para subtotal exatamente igual a R$ 100,00", () => {
    const desconto = CalculadoraDesconto.calcular(100.00);
    expect(desconto).toBe(0);
  });

  test("Deve aplicar 10% de desconto para subtotal acima de R$ 100,00", () => {
    const desconto = CalculadoraDesconto.calcular(150.00);
    expect(desconto).toBe(15.00);
  });

  test("Deve lançar erro ao tentar calcular desconto com valor negativo (RN04)", () => {
    expect(() => CalculadoraDesconto.calcular(-10)).toThrow(
      "O subtotal não pode ser um valor negativo."
    );
  });
});