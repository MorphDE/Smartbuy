import "./Filterpage.css";
import Header from './../Header/Header';

const FilterPage = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="filter-page-overlay">
            <div className="filter-page-content">
                <Header onClose={onClose}/>
                <div className="filter-page-body">
                    <div className="category-filter">
                       <h1>Kategorien</h1>
                       <div className="category-content">
                            <p>Handys</p>
                            <p>TV Geräte</p>
                            <p>Gaming</p>
                            <p>Kopfhörer</p>
                       </div>
                    </div>
                    <div className="price-filter">
                       <h2>Preis</h2>
                       <div className="price-content">
                            <p>0 - 20€</p>
                            <p>20 - 50€</p>
                            <p>50 - 100€</p>
                       </div> 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilterPage;
