// src/api/getFuncionarios.ts
export interface Funcionario {
  id: string; // ID como string
  status: boolean;
  nome: string;
  gender: string;
  cpf: string;
  birthdate: string;
  rg: string;
  cargo: string;
  activity?: string[]; // Corrigido para string[]
  "select-epi"?: string;
  "number-ca"?: number;
  fileName?: string;
}


// Função para buscar funcionários
export async function getFuncionarios(): Promise<Funcionario[]> {
  const response = await fetch("http://localhost:3000/funcionarios");
  const data: Funcionario[] = await response.json();

  return data.map((func) => ({
    ...func,
    id: String(func.id), // Garante que o ID seja string
    activity: Array.isArray(func.activity) ? func.activity : [], // Garante que activity seja string[]
  }));
}



// Função para registrar um funcionário
export async function registerFuncionario(funcionario: Funcionario): Promise<Funcionario> {
  try {
    const response = await fetch("http://localhost:3000/funcionarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...funcionario,
        id: String(funcionario.id), // Garante que o ID seja salvo como string
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro ao registrar funcionário: ${response.statusText}`);
    }

    const data: Funcionario = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao registrar funcionário:", error);
    throw error;
  }
}


export async function deleteFuncionario(id: string): Promise<void> {
  const response = await fetch(`http://localhost:3000/funcionarios/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Erro ao excluir funcionário com ID ${id}`);
  }
}


