export const getHourlyForecast = (forecastList) => {
    return forecastList.slice(0, 8).map((item) => ({
        id: item.dt,
        timestamp: item.dt,

        temperature: item.main.temp,

        icon: item.weather[0].icon,

        description: item.weather[0].description,

        rainProbability: Math.round(
            (item.pop || 0) * 100
        ),

        windSpeed: item.wind?.speed ?? 0,
    }));
};

export const getDailyForecast = (forecastList) => {
    const days = {};

    forecastList.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];

        if (!days[date]) {
            days[date] = [];
        }

        days[date].push(item);
    });

    return Object.entries(days)
        .slice(0, 5)
        .map(([date, items]) => {
            const midday =
                items.find((item) =>
                    item.dt_txt.includes("12:00:00")
                ) || items[Math.floor(items.length / 2)];

            const temperatures = items.map(
                (item) => item.main.temp
            );

            const rainProbabilities = items.map(
                (item) => (item.pop || 0) * 100
            );

            return {
                id: midday.dt,
                timestamp: midday.dt,

                date,

                temperature: midday.main.temp,

                high: Math.max(...temperatures),
                low: Math.min(...temperatures),

                icon: midday.weather[0].icon,
                description: midday.weather[0].description,

                rainProbability: Math.round(
                    Math.max(...rainProbabilities)
                ),

                humidity: midday.main.humidity,
                windSpeed: midday.wind.speed,
            };
        });
};