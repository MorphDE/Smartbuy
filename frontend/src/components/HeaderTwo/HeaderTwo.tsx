import { Link } from "react-router-dom";
import "./HeaderTwo.css";

interface Props {
    title: string;
}

const HeaderTwo = (props:Props) => {
    return (
        <div className="top-header">
            <div className="top-header-img">
                <Link to={"/"}><img src="./leftarrow.png" alt="Arrow back" /></Link>
            </div>
            <div className="top-header-title">
                <h1>{props.title}</h1>
            </div>
        </div>
    );
}

export default HeaderTwo;
