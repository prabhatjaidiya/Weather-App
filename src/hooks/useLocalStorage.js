import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        try {
            const storedValue = localStorage.getItem(key);

            return storedValue !== null
                ? JSON.parse(storedValue)
                : initialValue;
        } catch (error) {
            console.error(
                `Error reading localStorage key "${key}":`,
                error
            );

            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(
                key,
                JSON.stringify(value)
            );
        } catch (error) {
            console.error(
                `Error writing localStorage key "${key}":`,
                error
            );
        }
    }, [key, value]);

    return [value, setValue];
};

export default useLocalStorage;