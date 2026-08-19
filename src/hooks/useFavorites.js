import { useEffect, useState } from "react";

const useFavorites = () => {
    const [favorites, setFavorites] = useState(() => {
        try {
            const saved = localStorage.getItem("favoriteCities");

            if (!saved) return [];

            const parsed = JSON.parse(saved);

            if (!Array.isArray(parsed)) return [];

            return parsed
                .map((item) => {
                    if (
                        item &&
                        typeof item === "object" &&
                        typeof item.city === "string"
                    ) {
                        return item.city;
                    }

                    if (typeof item === "string") {
                        return item;
                    }

                    return null;
                })
                .filter(Boolean);
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(
            "favoriteCities",
            JSON.stringify(favorites)
        );
    }, [favorites]);

    const toggleFavorite = (cityName) => {
        if (!cityName || typeof cityName !== "string") {
            return;
        }

        setFavorites((prev) => {
            const safeFavorites = prev.filter(
                (fav) => typeof fav === "string"
            );

            const exists = safeFavorites.some(
                (fav) =>
                    fav.toLowerCase() === cityName.toLowerCase()
            );

            if (exists) {
                return safeFavorites.filter(
                    (fav) =>
                        fav.toLowerCase() !== cityName.toLowerCase()
                );
            }

            return [...safeFavorites, cityName];
        });
    };

    const isFavorite = (cityName) => {
        if (!cityName) return false;

        return favorites.some(
            (fav) =>
                typeof fav === "string" &&
                fav.toLowerCase() === cityName.toLowerCase()
        );
    };

    return {
        favorites,
        toggleFavorite,
        isFavorite,
    };
};

export default useFavorites;