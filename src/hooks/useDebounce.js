import { useEffect, useRef } from "react";

const useDebounce = (callback, delay) => {
    const timeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    const debounce = (...args) => {
        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    };

    return debounce;
};

export default useDebounce;