import "./Loadingscreen.css";
import { useContext, useEffect } from "react";
import { LoadingContext } from '../../context/LoadingContext';

const Loadingscreen = () => {
    const { setLoading } = useContext(LoadingContext);

    useEffect(() => {
      setTimeout(() => {
        setLoading(true);
      }, 3000);
    }, []);
  
    return (
      <section className="loading-bg">
        <div className="loader"></div>
        <h1 className="loading-title">SmartBuy</h1>
        <p className="loading-slogan">SHOPPEN LEICHT GEMACHT</p>
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </section>
    );
  };
 
export default Loadingscreen;