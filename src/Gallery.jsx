import React, { useState, useEffect } from "react";
import "./Gallery.css";

const Gallery = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await fetch ('https://www.course-api.com/react-tours-project');
                if (!response.ok) throw new Error("Failed to fetch tours");
                const data = await response.json();
                setTours(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTours();
    }, []);

    const removeTour = (id) => {
        setTours(tours.filter((tour) => tour.id !== id));
    };

    const toggleDescription = (id) => {
        setTours(tours.map((tour) => (
            tour.id === id ? { ...tour, showMore: !tour.showMore } : tour
        )));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="gallery">
            {tours.map(({ id, name, info, image, price, showMore }) => (
                <div key={id} className="tour-card">
                    <img src={image} alt={name} />
                    <div className="tour-info">
                        <h2>{name}</h2>
                        <p className="tour-price">${price}</p>
                        <p>
                            {showMore ? info : `${info.substring(0, 100)}...`}
                            <button onClick={() => toggleDescription(id)}>
                                {showMore ? "Show Less" : "Read More"}
                            </button>
                        </p>
                        <button className="not-interested" onClick={() => removeTour(id)}>
                            Not Interested
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Gallery;
