export class Cliente {
  private nome: string;

  constructor(nome: string) {
    this.validarNome(nome);
    this.nome = nome.trim();
  }

  private validarNome(nome: string): void {
    if (!nome || nome.trim().length === 0) {
      throw new Error("O nome do cliente não pode estar vazio.");
    }

    if (nome.trim().length < 3) {
      throw new Error("O nome do cliente deve possuir pelo menos 3 caracteres.");
    }
  }

  public getNome(): string {
    return this.nome;
  }
}