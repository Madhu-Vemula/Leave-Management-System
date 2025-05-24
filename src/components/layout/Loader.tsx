/**
 * @component Loader
 * @description Displays a loading animation while data or content is being fetched or processed.
 * @returns {React.JSX.Element} A JSX element that renders a loader animation.
 */
const Loader: React.FC = (): React.JSX.Element => {
    return (
        <div className="loader-containter">
            <div className="loader"></div>
        </div>
    );
};

export default Loader;
