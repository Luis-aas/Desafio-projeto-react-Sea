import { Modal, Switch } from "antd";
import { useForm } from "react-hook-form";
import { Funcionario } from "../../../api/getFuncionarios"; // Interface Funcionario

interface EditFuncionarioModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: Funcionario) => void;
  funcionario: Funcionario;
}

export function EditFuncionarioModal({
  visible,
  onClose,
  onSave,
  funcionario,
}: EditFuncionarioModalProps) {
  const { register, handleSubmit, setValue,
    watch, formState: { errors } } = useForm<Funcionario>({
    defaultValues: funcionario,
  });

  const onSubmit = (data: Funcionario) => {
    onSave(data); // Envia os dados atualizados para o pai
    onClose(); // Fecha o modal
  };

  return (
    <Modal
      title="Editar Funcionário"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      
      <form style={{display: "flex", gap:"10px", flexDirection:"column"}} onSubmit={handleSubmit(onSubmit)} className="edit-form">
        {/* Nome */}
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            {...register("nome", { required: "O nome é obrigatório." })}
          />
          {errors.nome && <span className="error">{errors.nome.message}</span>}
        </div>

        {/* Gênero */}
        <div className="second-content">
        <div className="form-group">
          <label>Gênero</label>
          <div className="form-radio-group">
            <label>
              <input
                type="radio"
                value="Masculino"
                {...register("gender", { required: "Selecione o gênero." })}
              />
              Masculino
            </label>
            <label>
              <input
                type="radio"
                value="Feminino"
                {...register("gender", { required: "Selecione o gênero." })}
              />
              Feminino
            </label>
          </div>
          {errors.gender && <span className="error">{errors.gender.message}</span>}
        </div>

         {/* Status (Ativo/Inativo) */}
         <div className="form-group">
          <label>Status</label>
          <Switch
            checked={watch("status")} // Usa o valor atual do formulário
            onChange={(checked) => setValue("status", checked)} // Atualiza o valor no form
            checkedChildren="Ativo"
            unCheckedChildren="Inativo"
          />
        </div>
        </div>

        {/* CPF */}
        <div className="form-group">
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            {...register("cpf", { required: "O CPF é obrigatório." })}
          />
          {errors.cpf && <span className="error">{errors.cpf.message}</span>}
        </div>

        {/* Data de Nascimento */}
        <div className="form-group">
          <label htmlFor="birthdate">Data de Nascimento</label>
          <input
            type="date"
            id="birthdate"
            {...register("birthdate", { required: "A data de nascimento é obrigatória." })}
          />
          {errors.birthdate && <span className="error">{errors.birthdate.message}</span>}
        </div>

        {/* RG */}
        <div className="form-group">
          <label htmlFor="rg">RG</label>
          <input
            type="text"
            id="rg"
            {...register("rg", { required: "O RG é obrigatório." })}
          />
          {errors.rg && <span className="error">{errors.rg.message}</span>}
        </div>

        {/* Cargo */}
        <div className="form-group">
              <label htmlFor="cargo">Cargo</label>
              <select
                id="cargo"
                {...register("cargo", {
                  validate: (value) => value !== "0" || "Selecione um cargo válido.",
                })}
              >
                <option value="0">Selecione seu cargo</option>
                <option value="Cargo 1">Cargo 1</option>
                <option value="Cargo 2">Cargo 2</option>
                <option value="Cargo 3">Cargo 3</option>
              </select>
              {errors.cargo && <span className="error">{errors.cargo.message}</span>}
            </div>

          <button type="submit" className="save-button">
          Salvar
        </button>
      </form>
      
    </Modal>
  );
}
