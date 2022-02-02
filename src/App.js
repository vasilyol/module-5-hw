import { useState } from 'react';
import { places } from './data';
import './App.css';

function App() {

    const [place, setPlace] = useState(0);
    const [selectedPlaces, setSelected] = useState([]);
    const {id, placeName, image} = places[place];

    const previousPlace = () => {
        setPlace(place => {
            place--;
            if (place < 0) {
                place = places.length -1;
            }
            return place;
        });    
    }

    const nextPlace = () => {
        setPlace(place => {
            place++;
            if (place > places.length - 1) {
                place = 0;
            }
            return place;
        });
    }

    const addPlace = (id) => {
        const place = places.find(place => place.id === id);
        if (!selectedPlaces.includes(place)) {
            setSelected([place, ...selectedPlaces]);
        }
    }

    const removePlace = (id) => {
        const newPlaces = selectedPlaces.filter(place => place.id !== id);
        setSelected(newPlaces);
    }

    const setShowMore = (id) => {
        const newPlaces = [];
        selectedPlaces.forEach(place => {
            if (place.id === id) {
                const changedPlace = {...place, showMore: !place.showMore};
                newPlaces.push(changedPlace);
            } else {
                newPlaces.push(place);
            }
        });
        setSelected(newPlaces); 
    }

    return (
        <div>
            <div className="main">
                <div className="container">
                    <h1>Places to visit</h1>
                </div>
                <div className="container">
                    <img src={image} width="600px" alt="place"/>
                </div>
                <div className="container">
                    <h2>{placeName}</h2>
                </div>
                <div className="btn container">
                    <button onClick={previousPlace}>Prev</button>
                    <button onClick={() => addPlace(id)}>Add to list</button>
                    <button onClick={() => setSelected([])}>Remove All</button>
                    <button onClick={nextPlace}>Next</button>
                </div>
            </div>

            <div className="main">
                <div className="container">
                    <h2 className="choice-header">Your Choice</h2>
                </div>
                {selectedPlaces.map(place => {
                    const { id, placeName, description, image, showMore } = place;
                    return (
                        <div key={id}>
                            <div className="container">
                                <h3>{placeName}</h3>
                            </div>
                            <div className="container">
                                <p>{showMore ? description : description.substring(0, 220) + " ...."}
                                <button className="btn-more" onClick={() => setShowMore(id)}>{showMore ? "Show less" : "Show more"}</button>
                                </p>
                            </div>
                            <div className="container">
                                <img src={image} width="400px" alt="place"/>
                            </div>
                            <div className="container">
                                <button className="btn" onClick={() => removePlace(id)}>Remove</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
