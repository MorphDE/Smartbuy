import { useState } from 'react';
import "./Searchbar.css";
import FilterPage from '../Filterpage/Filterpage';
import { Item } from '../../models/Item';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../../utils/api';

const Searchbar = () => {

    const [showFilterPage, setShowFilterPage] = useState(false);

    const handleFilterClick = () => {
        setShowFilterPage(true);
    }

    const handleCloseFilterPage = () => {
        setShowFilterPage(false);
    }

    const [searchItems, setSearchItems] = useState<Item[] | null>(null);

    const search = (text:string) => {
        if(text.length >= 3) {
            fetch(`${BACKEND_URL}/api/v1/items/search/${text}`)
            .then(res => res.json())
            .then((items) => setSearchItems(items))
            .catch((error) => console.log("Fehler beim abrufen der Items!", error));
        } else {
            setSearchItems(null);
        }
    }
        
    return (
        <section className="searchbar">
            <div className="search-bar">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" name="search" id="searchbar" placeholder="Suchbegriff eingeben" onChange={e => search(e.target.value)}/>
                {searchItems &&
                    <div className='search-dropdown'>
                        {searchItems.length === 0 ? <p className='no-results'>Keine Suchergebnisse</p> : 
                        searchItems.map((item, key) => (
                            <Link to={`/product/${item._id}`} key={key}>
                                <div className='dropdown-result' >
                                    <div className='img-container'>
                                        <img src={`${BACKEND_URL}/api/v1/uploads/${item.image}`} alt="Product Image" />
                                    </div>
                                    <p>{item.name}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                }
            </div>
            <div className="filter-button" onClick={handleFilterClick}>
                <img src="./Filter.png" alt="Filter Button" />
            </div>
            {showFilterPage && <FilterPage onClose={handleCloseFilterPage} />}
        </section>
    );
}

export default Searchbar;
