import "./Header.css";
import { EnterpriseFilledIcon } from "../../assets/icons/enterprise-filled-icon";

interface HeaderProps {
  currentStep: number; 
  isStepComplete: boolean; 
}

export function Header({ currentStep, isStepComplete }: HeaderProps) {
  return (
    <div className="header">
      <div className="line"></div>

      <main className="items">
        {Array.from({ length: 9 }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber === 1 || isStepComplete || stepNumber < currentStep;
          const isCurrentStep = stepNumber === currentStep;

          return (
            <div className="component" key={stepNumber}>
              <button
                className={isCompleted ? "completed" : ""}
                style={{
                  backgroundColor: isCompleted ? "#649fbf" : "#dbdbdb",
                  border: isCurrentStep ? "2px solid #272F33" : "none",
                }}
              >
                <EnterpriseFilledIcon />
              </button>
              <div className="step-label">
                <span
                  className="item-text"
                  style={{
                    color: isCompleted ? "#649fbf" : "#dbdbdb",
                  }}
                >
                  Item {stepNumber}
                </span>
                {(isStepComplete && stepNumber === 1) ||
                  (isCompleted && stepNumber < currentStep) ? (
                  <span className="completed-text">Concluído</span>
                ) : null}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}

