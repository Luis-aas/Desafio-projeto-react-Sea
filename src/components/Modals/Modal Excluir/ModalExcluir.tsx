import "./ModalExcluir.css";

interface ModalProps {
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void; // Opcional para o modal de confirmação
  showConfirmButtons?: boolean; // Define se exibe os botões "Sim" e "Não"
}

export function Modal({
  title,
  message,
  onClose,
  onConfirm,
  showConfirmButtons = false,
}: ModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <span>{title}</span>
          <button onClick={onClose} className="close-button">
            X
          </button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          {showConfirmButtons ? (
            <>
              <button onClick={onClose} className="cancel-button">
                Não
              </button>
              <button onClick={onConfirm} className="confirm-button">
                Sim
              </button>
            </>
          ) : (
            <button onClick={onClose} className="ok-button">
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
