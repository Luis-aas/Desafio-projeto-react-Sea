import { Switch } from "antd";
import "./Register.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { getFuncionarios, registerFuncionario, Funcionario } from "../../../api/getFuncionarios"; // Função para integração com o banco

interface FormData {
  nome: string;
  status: boolean;
  gender: string;
  cpf: string;
  rg: string;
  birthdate: string;
  cargo: string;
  activities?: { 
    activity: string; 
    epiList: { 
      epi: string; 
      ca: number; 
    }[]; 
  }[];
  fileName?: string;
}

export function Register({ toggleFormRegister }: { toggleFormRegister: () => void }) {
  const [fileName, setFileName] = useState<string>("Seu Arquivo");
  const [naoUsaEpi, setNaoUsaEpi] = useState(false);
  const [activities, setActivities] = useState([
    { id: 1, activity: "", epiList: [{ epi: "", ca: 0 }] },
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  useEffect(() => {
    setValue("status", true); // Valor padrão: Ativo
  }, [setValue]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setValue("fileName", e.target.files[0].name); // Atualiza o campo no form
    }
  };

  const addEpi = (activityId: number) => {
    const updatedActivities = activities.map((activity) =>
      activity.id === activityId
        ? { ...activity, epiList: [...activity.epiList, { epi: "", ca: 0 }] }
        : activity
    );
    setActivities(updatedActivities);
  };


  const removeEpi = (activityId: number, epiIndex: number) => {
    const updatedActivities = activities.map((activity) =>
      activity.id === activityId
        ? { ...activity, epiList: activity.epiList.filter((_, i) => i !== epiIndex) }
        : activity
    );
    setActivities(updatedActivities);
  };





  const addActivity = () => {
    if (activities.length < 5) {
      setActivities([
        ...activities,
        { id: Date.now(), activity: "", epiList: [{ epi: "", ca: 0 }] },
      ]);
    } else {
      alert("Você só pode adicionar até 5 atividades.");
    }
  };


  const removeActivity = (index: number) => {
    const updatedActivities = activities.filter((_, i) => i !== index);
    setActivities(updatedActivities);
  };


  const onSubmit = async (data: FormData) => {
    try {
      const funcionarios = await getFuncionarios();

      const nextId = funcionarios.length > 0
        ? String(parseInt(funcionarios[funcionarios.length - 1].id) + 1)
        : "1";

      const funcionario: Funcionario = {
        ...data,
        id: nextId, // ID como string
        status: data.status,
        nome: data.nome,
        activity: [], // Adicionando um array vazio para activity no registro inicial
      };

      await registerFuncionario(funcionario);

      alert("Funcionário registrado com sucesso!");
      reset();
      toggleFormRegister();
    } catch (error) {
      console.error("Erro ao registrar funcionário:", error);
      alert("Erro ao registrar o funcionário.");
    }
  };



  return (
    <div className="form-register">
      <header className="header-form-register">
        <p>
          <button onClick={toggleFormRegister}>←</button> Adicionar Funcionário
        </p>
      </header>

      <main className="content-register">
        <form onSubmit={handleSubmit(onSubmit)} className="content-register-1">
          {/* Status */}
          <div className="first-content">
            <p>O trabalhador está ativo ou inativo?</p>
            <Switch
              checked={watch("status")}
              onChange={(checked) => setValue("status", checked)}
              checkedChildren="Ativo"
              unCheckedChildren="Inativo"
            />
          </div>

          {/* Dados Pessoais */}
          <div className="second-content">
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="nome"
                placeholder="Nome"
                {...register("nome", {
                  required: "O nome é obrigatório.",
                  minLength: { value: 3, message: "O nome deve ter pelo menos 3 caracteres." },
                })}
              />
              {errors.nome && <span className="error">{errors.nome.message}</span>}
            </div>

            <div className="form-group">
              <label>Sexo</label>
              <div className="form-radio-group">
                <label>
                  <input
                    type="radio"
                    value="Feminino"
                    {...register("gender", { required: "Selecione o sexo." })}
                  />
                  Feminino
                </label>
                <label>
                  <input
                    type="radio"
                    value="Masculino"
                    {...register("gender", { required: "Selecione o sexo." })}
                  />
                  Masculino
                </label>
              </div>
              {errors.gender && <span className="error">{errors.gender.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                id="cpf"
                placeholder="CPF"
                {...register("cpf", {
                  required: "O CPF é obrigatório.",
                  pattern: {
                    value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                    message: "O CPF deve estar no formato 000.000.000-00.",
                  },
                })}
              />
              {errors.cpf && <span className="error">{errors.cpf.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="birthdate">Data de Nascimento</label>
              <input
                type="date"
                id="birthdate"
                {...register("birthdate", {
                  required: "A data de nascimento é obrigatória.",
                })}
              />
              {errors.birthdate && <span className="error">{errors.birthdate.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="rg">RG</label>
              <input
                type="text"
                id="rg"
                placeholder="RG"
                {...register("rg", { required: "O RG é obrigatório." })}
              />
              {errors.rg && <span className="error">{errors.rg.message}</span>}
            </div>

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
          </div>

          {/* EPIs */}
          <div className="third-content">
  <span>Quais EPIs o trabalhador usa na atividade?</span>
  
  {/* Checkbox para não usar EPI */}
  <label style={{ fontWeight: "400" }}>
    <input
      type="checkbox"
      checked={naoUsaEpi}
      onChange={(e) => setNaoUsaEpi(e.target.checked)}
    />{" "}
    O trabalhador não usa EPI.
  </label>

  {/* Renderização apenas se o checkbox "naoUsaEpi" estiver desmarcado */}
  {!naoUsaEpi && (
    <>
      {activities.map((activity, activityIndex) => (
        <div key={activity.id} className="group-select">
          
          {/* Seleção da Atividade */}
          <div className="content-select-activy">
            <label htmlFor={`activity-${activityIndex}`}>Selecione a atividade:</label>
            <select
              id={`activity-${activityIndex}`}
              {...register(`activities.${activityIndex}.activity`, {
                validate: (value) => value !== "0" || "Selecione uma atividade válida.",
              })}
            >
              <option value="0">Selecione sua atividade</option>
              <option value="activy1">Atividade 1</option>
              <option value="activy2">Atividade 2</option>
              <option value="activy3">Atividade 3</option>
            </select>
            {errors.activities?.[activityIndex]?.activity && (
              <span className="error">
                {errors.activities[activityIndex].activity?.message}
              </span>
            )}
          </div>

          {/* Mapeamento dos EPIs */}
          {Array.isArray(activity.epiList) &&
            activity.epiList.map((_, epiIndex) => (
              <div key={epiIndex} className="content-select-epi">
                
                {/* Campo Selecione o EPI */}
                <div className="content-epi">
                  <label htmlFor={`epi-${activityIndex}-${epiIndex}`}>Selecione o EPI:</label>
                  <select
                    id={`epi-${activityIndex}-${epiIndex}`}
                    {...register(`activities.${activityIndex}.epiList.${epiIndex}.epi`, {
                      validate: (value) => value !== "0" || "Selecione um EPI válido.",
                    })}
                  >
                    <option value="0">Selecione seu EPI</option>
                    <option value="Safety-footwear">Calçado de segurança</option>
                    <option value="Helmet">Capacete</option>
                    <option value="Safety-Glove">Luva de Segurança</option>
                    <option value="Safety-apron">Avental de segurança</option>
                  </select>
                  {errors.activities?.[activityIndex]?.epiList?.[epiIndex]?.epi && (
                    <span className="error">
                      {errors.activities[activityIndex].epiList[epiIndex].epi?.message}
                    </span>
                  )}
                </div>

                {/* Campo Informe o número do CA */}
                <div className="content-epi">
                  <label htmlFor={`ca-${activityIndex}-${epiIndex}`}>Informe o número do CA:</label>
                  <input
                    type="number"
                    id={`ca-${activityIndex}-${epiIndex}`}
                    {...register(`activities.${activityIndex}.epiList.${epiIndex}.ca`, {
                      required: "O número do CA é obrigatório.",
                      validate: (value) =>
                        value !== undefined && value > 0 || "O número do CA deve ser maior que 0.",
                    })}
                  />
                  {errors.activities?.[activityIndex]?.epiList?.[epiIndex]?.ca && (
                    <span className="error">
                      {errors.activities[activityIndex].epiList[epiIndex].ca?.message}
                    </span>
                  )}
                </div>

                {/* Botão Excluir EPI */}
                {epiIndex !== activity.epiList.length - 1 && (
                  <button
                    type="button"
                    onClick={() => removeEpi(activity.id, epiIndex)}
                    className="remove-epi-button"
                  >
                    Excluir EPI
                  </button>
                )}

                {/* Botão Adicionar EPI */}
                {epiIndex === activity.epiList.length - 1 && (
                  <button
                    type="button"
                    className="button-add-epi"
                    onClick={() => addEpi(activity.id)}
                  >
                    Adicionar EPI
                  </button>
                )}
              </div>
            ))}

          {/* Botão Excluir Atividade */}
          {activities.length > 1 && (
            <button
              type="button"
              onClick={() => removeActivity(activityIndex)}
              className="remove-activity-button"
            >
              Excluir atividade
            </button>
          )}
        </div>
      ))}

      {/* Botão Adicionar Nova Atividade */}
      <button
        type="button"
        onClick={addActivity}
        className="add-activity-button"
      >
        Adicionar outra atividade
      </button>
    </>
  )}
</div>

          {/* Upload de arquivo */}
          {!naoUsaEpi && (
            <div className="fourth-content">
              <label htmlFor="send-file">Adicione Atestado de Saúde (opcional):</label>
              <div className="file-input">
                <input
                  type="text"
                  value={fileName}
                  readOnly
                  className="text-input"
                  {...register("fileName")}
                />
              </div>

              <input
                type="file"
                id="file-upload"
                className="file-input-hidden"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload" className="file-upload-button">
                Selecionar arquivo
              </label>
            </div>
          )}



          <button type="submit" className="save-button">
            Salvar
          </button>
        </form>
      </main>
    </div>
  );
}