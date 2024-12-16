import { useState, useEffect } from "react";
import { Switch } from "antd";
import { getFuncionarios, deleteFuncionario, Funcionario } from "../../api/getFuncionarios.ts";
import { FuncionarioCard } from "./FuncionarioCard/FuncionarioCard.tsx";
import "./ViewEmployeed.css";
import { Modal } from "../Modals/Modal Excluir/ModalExcluir.tsx";

interface FormProps {
  isStepComplete: boolean; // Define o tipo correto
  onSwitchChange: (value: boolean) => void; // Função de callback para troca de estado
  toggleFormRegister: () => void; // Função para abrir/fechar o formulário
}

export function ViewEmployeed({ isStepComplete, onSwitchChange, toggleFormRegister }: FormProps) {
  const [modalType, setModalType] = useState<"success" | "confirm" | null>(null);
  const [selectedFuncionario, setSelectedFuncionario] = useState<string | null>(null);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [verApenasAtivos, setVerApenasAtivos] = useState(false);

  // Busca os funcionários ao carregar o componente
  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const data = await getFuncionarios();
        setFuncionarios(data); // Tipos agora estão alinhados
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
      }
    };

    fetchFuncionarios();
  }, []);



  const openConfirmModal = (id: string) => {
    console.log("ID recebido no modal:", id);
    setSelectedFuncionario(id);
    setModalType("confirm");
  };


  const closeModal = () => {
    setModalType(null);
    setSelectedFuncionario(null);
  };

  // Função para deletar o funcionário
  const handleDelete = async (id: string) => {
    try {
      await deleteFuncionario(id); // Função que remove o funcionário
      setFuncionarios((prev) => prev.filter((func) => func.id !== id)); // Remove do estado local
      setModalType("success");
    } catch (error) {
      console.error("Erro ao excluir funcionário:", error);
      alert("Erro ao excluir o funcionário.");
    }
  };

  const handleUpdate = async (updatedFuncionario: Funcionario) => {
    try {
      const response = await fetch(`http://localhost:3000/funcionarios/${updatedFuncionario.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFuncionario),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar funcionário.");
      }

      setFuncionarios((prev) =>
        prev.map((func) =>
          func.id === updatedFuncionario.id ? updatedFuncionario : func
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
      alert("Erro ao atualizar o funcionário.");
    }
  };

  // Filtra os funcionários com base no estado ativo/inativo
  const funcionariosFiltrados = verApenasAtivos
    ? funcionarios.filter((func) => func.status) // Apenas ativos
    : [...funcionarios]; // Cópia do array original

  // Calcula o número de funcionários ativos
  const numFuncionariosAtivos = funcionarios.filter(
    (func) => func.status
  ).length;

  return (
    <div className="form">
      <header className="header-form">
        <p>Funcionário(s)</p>
      </header>

      <main className="container-add">
        <button className="button-add-func" onClick={toggleFormRegister}>
          + Adicionar Funcionário
        </button>

        <div className="group-actives">
          <div>
            {/* Botão Ver Apenas Ativos */}
            <button
              className={`button-filter ${verApenasAtivos ? "inactive-button" : "active-button"}`}
              onClick={() => setVerApenasAtivos(true)} // Sempre ativa o filtro
              disabled={verApenasAtivos} // Desativa o botão quando o filtro está aplicado
            >
              <p>Ver apenas ativos</p>
            </button>

            {/* Botão Limpar Filtros */}
            <button
              className={`button-clear-filter ${verApenasAtivos ? "active-button" : "inactive-button"}`}
              onClick={() => setVerApenasAtivos(false)} // Limpa o filtro
            >
              <p>Limpar filtros</p>
            </button>
          </div>
          {/* Exibe o número de ativos/dados totais */}
          <span>
            Ativos {numFuncionariosAtivos}/{funcionarios.length}
          </span>
        </div>
      </main>

      {/* Modal de Confirmação */}
      {modalType === "confirm" && (
        <Modal
          title="Confirmação"
          message="Deseja realmente excluir este funcionário?"
          onClose={closeModal}
          onConfirm={() => {
            if (selectedFuncionario !== null) {
              handleDelete(selectedFuncionario); // O ID já é string
            }
            closeModal();
          }}
          showConfirmButtons
        />

      )}

      {/* Modal de Sucesso */}
      {modalType === "success" && (
        <Modal
          title="Sucesso"
          message="Usuário excluído com sucesso!"
          onClose={closeModal}
        />
      )}


      <main className="content-employee">
        {funcionariosFiltrados.map((funcionario) => (
          <FuncionarioCard
            key={funcionario.id}
            funcionario={funcionario}
            onDelete={() => openConfirmModal(funcionario.id)}
            onUpdate={handleUpdate}
          />
        ))}
      </main>

      <main className="footer-info">
        <div className="content-footer">
          <p>A etapa está concluída?</p>
          <Switch
            checked={isStepComplete}
            checkedChildren="Sim"
            unCheckedChildren="Não"
            onChange={onSwitchChange}
          />
        </div>
      </main>
    </div>
  );
}
