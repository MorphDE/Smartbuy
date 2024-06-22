import "./Header.css";

interface HeaderProps {
    onClose: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClose }) => {
    return (
        <section className="header">
            <img src="./leftarrow.png" alt="Arrow back" onClick={onClose} />
            <div className="headertitle">
                <h1>Suchfilter</h1>
            </div>
        </section>
    );
}

export default Header;
