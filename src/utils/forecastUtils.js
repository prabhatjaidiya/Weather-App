export const getHourlyForecast = (
    forecastList,
    timezoneOffset = 0
) => {
    return forecastList.slice(0, 8).map((item) => {
        const localTimestamp =
            item.dt + timezoneOffset;

        return {
            id: item.dt,
            timestamp: item.dt,
            localTimestamp,

            temperature: item.main.temp,
            feelsLike: item.main.feels_like,

            icon: item.weather[0].icon,

            description:
                item.weather[0].description,

            rainProbability: Math.round(
                (item.pop || 0) * 100
            ),

            windSpeed:
                item.wind?.speed ?? 0,
        };
    });
};

export const getDailyForecast = (forecastList, timezoneOffset = 0) => {
    const days = {};

    forecastList.forEach((item) => {
        const localTimestamp =
            item.dt + timezoneOffset;

        const date = new Date(
            localTimestamp * 1000
        )
            .toISOString()
            .split("T")[0];

        if (!days[date]) {
            days[date] = [];
        }

        days[date].push(item);
    });

    return Object.entries(days)
        .sort(([dateA], [dateB]) =>
            dateA.localeCompare(dateB)
        )
        .slice(0, 5)
        .map(([date, items]) => {

            const midday =
                items.find((item) => {
                    const localTimestamp =
                        item.dt + timezoneOffset;

                    return (
                        new Date(
                            localTimestamp * 1000
                        ).getUTCHours() === 12
                    );
                }) ||
                items[Math.floor(items.length / 2)];

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
                description:
                    midday.weather[0].description,

                rainProbability: Math.round(
                    Math.max(...rainProbabilities)
                ),

                humidity:
                    midday.main.humidity,

                windSpeed:
                    midday.wind?.speed ?? 0,
            };
        });
};