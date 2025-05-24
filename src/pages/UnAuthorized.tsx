import unAuthorizedImage from "../assets/images/unauthorized-error.png";

/**
 * @function UnAuthorized
 * @description Displays a "UnAuthorized" image for routes that do not exist.
 * @returns {React.JSX.Element}
 */
const UnAuthorized: React.FC = (): React.JSX.Element => {
    return (
        <div className="error-container">
            <img src={unAuthorizedImage} alt="error-image" className="error-image" />
        </div>
    );
};

export default UnAuthorized;
