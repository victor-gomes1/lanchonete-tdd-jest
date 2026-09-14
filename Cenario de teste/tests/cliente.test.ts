import { Cliente } from "../src/cliente";

describe("RN01 — Validação do Cliente", () => {
  test("Deve criar um cliente com sucesso quando o nome for válido", () => {
    const cliente = new Cliente("Ana");
    expect(cliente.getNome()).toBe("Ana");
  });

  test("Deve lançar erro ao tentar criar cliente com nome vazio", () => {
    expect(() => new Cliente("")).toThrow("O nome do cliente não pode estar vazio.");
  });

  test("Deve lançar erro ao tentar criar cliente contendo apenas espaços", () => {
    expect(() => new Cliente("   ")).toThrow("O nome do cliente não pode estar vazio.");
  });

  test("Deve lançar erro ao tentar criar cliente com menos de 3 caracteres", () => {
    expect(() => new Cliente("Jo")).toThrow("O nome do cliente deve possuir pelo menos 3 caracteres.");
  });
});