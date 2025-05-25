import React from "react"
import ReactDOM from "react-dom"
import { ModalProps } from "../../Types"
/**
 * A reusable modal component that renders its content as a React portal.
 * 
 * @param {ModalProps} props - The properties for the modal component.
 * @param {string} [props.title] - The title of the modal.
 * @param {string} [props.logoSrc] - The source URL for the logo image displayed in the modal header.
 * @param {() => void} props.onClose - Callback function triggered when the cancel button is clicked.
 * @param {() => void} props.onSubmit - Callback function triggered when the submit button is clicked.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 * @param {boolean} [props.showFooter=true] - Determines whether the footer with action buttons is displayed.
 * @param {string} [props.submitText="Submit"] - The text for the submit button.
 * @param {string} [props.cancelText="Cancel"] - The text for the cancel button.
 * 
 * @returns {React.ReactPortal | null} A React portal rendering the modal, or null if not rendered.
 */
const Modal = (
    {
        title,
        logoSrc,
        onClose,
        onSubmit,
        children,
        showFooter = true,
        submitText = "Submit",
        cancelText = "Cancel"
    }: ModalProps
): React.ReactPortal | null => {
    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    {logoSrc && <img src={logoSrc} alt="modal-image" className="logo-image" />}
                    {title && (<h2>{title}</h2>)}
                </div>
                <div className="modal-content">
                    {children}
                </div>
                {showFooter && (
                    <div className="modal-footer">
                        <button className="button cancel-btn" onClick={onClose}>{cancelText} </button>
                        {submitText &&
                            <button type="button" className="button submit-btn" onClick={onSubmit}>{submitText}</button>
                        }
                    </div>
                )}
            </div>
        </div>,
        document.body
    )
}
export default Modal