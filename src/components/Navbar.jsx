import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import Logo from "./Logo";
import Location from "./Location";
import ReactenSrc from "./ReactenSrc";

const Navbar = ({
    city,
    setCity,
    fetchWeather,
    handleGeolocate,
    recentSearch,
    loading,
    handleInputChange,
}) => {
    const [searchFocused, setSearchFocused] = useState(false);

    const handleSubmit = () => {
        if (!city.trim() || loading) return;
        fetchWeather(city.trim());
    };

    return (
        <header className="relative z-[100] w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-5">
            <div
                className="
          w-full
          max-w-[1440px]
          mx-auto
          min-h-[64px]
          flex
          items-center
          gap-3 sm:gap-5
        "
            >
                {/* Logo */}
                <div className="shrink-0">
                    <Logo />
                </div>

                {/* Search */}
                <div
                    className="
    relative
    z-[100]
    flex-1
    max-w-3xl
    mx-auto
  "
                >
                    <div
                        className="
              flex
              items-center
              gap-2
              w-full
              h-12 sm:h-14
              px-2
              rounded-2xl
              bg-white/[0.07]
              backdrop-blur-xl
              border border-white/[0.09]
              shadow-[0_10px_40px_rgba(0,0,0,0.15)]
              focus-within:border-white/[0.18]
              focus-within:bg-white/[0.09]
              transition-all duration-300
            "
                    >
                        {/* Search button */}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            aria-label="Search weather"
                            className="
                h-9 w-9
                sm:h-10 sm:w-10
                shrink-0
                rounded-xl
                flex items-center justify-center
                text-white/50
                hover:text-white
                hover:bg-white/[0.08]
                disabled:opacity-30
                disabled:cursor-not-allowed
                transition-all duration-200
              "
                        >
                            {loading ? (
                                <span
                                    className="
                    h-4 w-4
                    rounded-full
                    border-2
                    border-white/20
                    border-t-white/80
                    animate-spin
                  "
                                />
                            ) : (
                                <IoSearchSharp size={21} />
                            )}
                        </button>

                        {/* Input */}
                        <label
                            htmlFor="search-input"
                            className="flex-1 min-w-0"
                        >
                            <input
                                id="search-input"
                                value={city}
                                onChange={handleInputChange}
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => {
                                    setTimeout(() => setSearchFocused(false), 150);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSubmit();
                                        setSearchFocused(false);
                                    }
                                }}
                                type="text"
                                placeholder="Search city..."
                                autoComplete="off"
                                className="
    w-full
    bg-transparent
    text-sm sm:text-base
    text-white
    placeholder:text-white/30
    focus:outline-none
  "
                            />
                        </label>

                        {/* Recent searches */}
                        {searchFocused && recentSearch.length > 0 && (
                            <ReactenSrc
                                recentSearch={recentSearch}
                                setCity={setCity}
                                fetchWeather={fetchWeather}
                            />
                        )}
                    </div>
                </div>

                {/* Location */}
                <div className="shrink-0">
                    <Location
                        handleGeolocate={handleGeolocate}
                        loading={loading}
                    />
                </div>
            </div>
        </header>
    );
};

export default Navbar;