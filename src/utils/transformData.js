import dayjs from "dayjs";

export const transformWeatherData = (data) => {
    if (!data || !data.list) return [];

    const dailyData = data.list.filter((entry) => entry.dt_txt.includes("12:00:00"));

    return dailyData.map((entry) => ({
        label: dayjs(entry.dt_txt).format("DD MMM"), 
        value: entry.main.temp, 
    }));
};
