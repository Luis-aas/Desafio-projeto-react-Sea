import "./Footer.css";

interface FooterProps {
  onNextStep: () => void; // Função chamada ao clicar em "Próximo passo"
  onPreviousStep: () => void; // Função chamada ao clicar em "Passo anterior"
  currentStep: number; // Número do passo atual
  isStepComplete: boolean; // Indica se o passo atual está completo
}

export function Footer({ onNextStep, onPreviousStep, currentStep, isStepComplete }: FooterProps) {
  return (
    <footer className="footer">
      <button
        className="back-step"
        style={{ visibility: currentStep > 1 ? "visible" : "hidden" }}
        onClick={onPreviousStep}
      >
        <span>Passo anterior</span>
      </button>
      <button
        className="next-step"
        style={{
          backgroundColor: isStepComplete ? "#649fbf" : "#bdbdbd",
          cursor: isStepComplete ? "pointer" : "not-allowed",
        }}
        disabled={!isStepComplete}
        onClick={onNextStep}
      >
        <span>Próximo passo</span>
      </button>
    </footer>
  );
}
