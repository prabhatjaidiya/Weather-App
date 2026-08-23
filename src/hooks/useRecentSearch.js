import { useCallback } from "react";
import useLocalStorage from "./useLocalStorage";

const useRecentSearch = () => {
    const [recentSearch, setRecentSearch] = useLocalStorage(
        "recentSearch",
        []
    );

    const saveRecentSearch = useCallback((cityName) => {
        if (!cityName?.trim()) return;

        const trimmedCity = cityName.trim();
        const normalized = trimmedCity.toLowerCase();

        setRecentSearch((prev) => {
            const safeRecent = Array.isArray(prev)
                ? prev.filter(
                    (city) => typeof city === "string"
                )
                : [];

            const updated = [
                trimmedCity,
                ...safeRecent.filter(
                    (city) =>
                        city.toLowerCase() !== normalized
                ),
            ];

            return updated.slice(0, 5);
        });
    }, [setRecentSearch]);

    return {
        recentSearch,
        saveRecentSearch,
    };
};

export default useRecentSearch;