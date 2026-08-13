export const getHourlyForecast = (forecastList) => {
    return forecastList.slice(0, 8);
};

export const getDailyForecast = (forecastList) => {
    return forecastList
        .filter((item) => item.dt_txt.includes("12:00:00"))
        .slice(0, 7);
};