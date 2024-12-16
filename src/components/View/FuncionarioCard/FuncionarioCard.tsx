import { useEffect, useRef, useState } from "react";
import { EditFuncionarioModal } from "../../Modals/Modal Editar/EditFuncionarioModal";
import { DotsIcon } from "../../../assets/icons/dots-icon"; 
import "./FuncionarioCard.css"
import { Funcionario } from "../../../api/getFuncionarios";

interface FuncionarioCardProps {
  funcionario: Funcionario;
  onDelete: (id: string) => void; 
  onUpdate: (data: Funcionario) => void;
}

export function FuncionarioCard({ funcionario, onDelete, onUpdate }: FuncionarioCardProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev); // Alterna o menu
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuVisible(false); // Fecha o menu
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div
      className={`registered-employee-${funcionario.status ? "active" : "inactive"
        }`}
      >
      <div className="info-employee">
        <div>
          <span>{funcionario.nome}</span>
        </div>
        <div className="buttons-info">
          <button>{funcionario.cpf}</button>
          <button>{funcionario.status ? "Ativo" : "Inativo"}</button>
          <button>{funcionario.cargo}</button>
        </div>
      </div>

      <div style={{ position: "relative" }} ref={dropdownRef}>
        <button className="action-button" onClick={toggleMenu}>
          <DotsIcon />
        </button>
        {menuVisible && (
          <div className="dropdown-menu">
            <button onClick={() => setModalVisible(true)}>Alterar</button>
            <button onClick={() => onDelete(funcionario.id)}>Excluir</button>
          </div>
        )}
      </div>

      <EditFuncionarioModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSave={onUpdate}
        funcionario={funcionario}
        />
    </div>
  );
}

