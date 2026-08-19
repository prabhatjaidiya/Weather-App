import { useState } from "react";
import useLocalStorage from "./useLocalStorage";

const useRecentSearch = () => {
    const [recentSearch, setRecentSearch] = useLocalStorage(
        "recentSearch",
        []
    );

    const saveRecentSearch = (cityName) => {
        if (!cityName?.trim()) return;

        const normalized = cityName.trim().toLowerCase();

        setRecentSearch((prev) => {
            const safeRecent = Array.isArray(prev)
                ? prev.filter(
                    (city) => typeof city === "string"
                )
                : [];

            const updated = [
                cityName.trim(),
                ...safeRecent.filter(
                    (city) =>
                        city.toLowerCase() !== normalized
                ),
            ];

            return updated.slice(0, 5);
        });
    };

    return {
        recentSearch,
        saveRecentSearch,
    };
};

export default useRecentSearch;