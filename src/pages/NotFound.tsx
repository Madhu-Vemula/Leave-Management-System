import notFoundImage from "../assets/images/not-found.jpg";

/**
 * @function NotFound
 * @description Displays a "Not Found" image for routes that do not exist.
 * @returns {React.JSX.Element}
 */
const NotFound: React.FC = (): React.JSX.Element => {
    return (
        <div className="error-container">
            <img src={notFoundImage} alt="error-image" className="error-image" />
        </div>
    );
};

export default NotFound;
