import { useState } from "react";
import "./Edit.css";
import { Footer } from "../../components/Footer/Footer";
import { ViewEmployeed } from "../../components/View/ViewEmployeed";
import { Header } from "../../components/Header/Header";
import { UserEmployeed } from "../../components/UserEmployeed/UserEmployeed";
import { Register } from "../../components/View/Register/Register";

export function Edit() {
  const totalSteps = 9; // Total de etapas
  const [currentStep, setCurrentStep] = useState(1); // Estado da etapa atual
  const [isStepComplete, setIsStepComplete] = useState(false);// Controle do Switch
  const [isForm, setIsForm] = useState(true); 

  const handleNextStep = () => {
    if (currentStep < totalSteps && isStepComplete) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSwitchChange = (checked: boolean | ((prevState: boolean) => boolean)) => {
    setIsStepComplete(checked); // Atualiza o estado do Switch
  };

  const toggleFormRegister = () => {
    setIsForm(!isForm); // Alterna entre Form e Register
  };

  // Renderizar conteúdo com base no passo atual
  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
        <UserEmployeed />
        {/* Passando a função toggleForm para o Form */}
        {isForm ? (
            <ViewEmployeed isStepComplete={isStepComplete} onSwitchChange={handleSwitchChange} toggleFormRegister={toggleFormRegister} />
          ) : (
            <Register toggleFormRegister={toggleFormRegister} />
          )}
      </>
      );
    } else {
      return <div className="coming-soon"><h1>Em breve</h1></div>;
    }
  };

  return (
    <section className="body-edit">
      <main className="content">
        {/* Header recebe o passo atual e estado do Switch */}
        <Header currentStep={currentStep} isStepComplete={isStepComplete} />

        <div className="content2">
          {/* Renderiza o conteúdo dinâmico baseado no passo */}
          {renderContent()}
        </div>
      </main>

      {/* Footer com controle de navegação e estado do Switch */}
      <Footer
        onNextStep={handleNextStep}
        onPreviousStep={handlePreviousStep}
        currentStep={currentStep}
        isStepComplete={isStepComplete}
      />
    </section>
  );
}

