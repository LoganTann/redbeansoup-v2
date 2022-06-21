import EmbedField from "../../types/embedField.ts";
import {
    Forecast,
    ForecastResponse,
    iconToEmoji,
    unixTimestamp,
} from "./types.ts";
import log from "framework/logger.ts";

export default class MeteoHelpers {
    public static unixToDate(time: unixTimestamp): Date {
        return new Date(time * 1000);
    }
    public static getTodayAt(hour: number): Date {
        const outDate = new Date();
        outDate.setHours(hour, 0, 0, 0);
        return outDate;
    }
    public static getTomorrowAt(hour: number): Date {
        const outDate = MeteoHelpers.getTodayAt(hour);
        outDate.setDate(outDate.getDate() + 1);
        return outDate;
    }
    public static DateToUnixSecs(date: Date): number {
        return Math.floor(date.getTime() * 0.001);
    }
    public static getWeatherEmoji(forecastItem: Forecast): string {
        const icon = forecastItem.weather.icon?.replace("n", "j") || "error";
        return iconToEmoji[icon] || icon;
    }
    public static detectSlice() {
        const currentHour = new Date().getHours();
        type sliceList = Record<
            string,
            {
                start: number;
                end: number;
                name: string;
                value: string;
                inline: boolean;
            }
        >;
        const slices: sliceList = {
            morning: {
                name: "Ce matin",
                start: this.DateToUnixSecs(this.getTodayAt(8)),
                end: this.DateToUnixSecs(this.getTodayAt(13)),
                value: "",
                inline: true,
            },
            afternoon: {
                name: "Cet après-midi",
                start: this.DateToUnixSecs(this.getTodayAt(14)),
                end: this.DateToUnixSecs(this.getTodayAt(19)),
                value: "",
                inline: true,
            },
            tomorrowMorning: {
                name: "Demain matin",
                start: this.DateToUnixSecs(this.getTomorrowAt(8)),
                end: this.DateToUnixSecs(this.getTomorrowAt(13)),
                value: "",
                inline: true,
            },
            tomorrowAfternoon: {
                name: "Demain après-midi",
                start: this.DateToUnixSecs(this.getTomorrowAt(14)),
                end: this.DateToUnixSecs(this.getTomorrowAt(19)),
                value: "",
                inline: true,
            },
        };
        if (currentHour > 19) {
            return [slices.tomorrowMorning, slices.tomorrowAfternoon];
        }
        if (currentHour > 13) {
            return [
                slices.afternoon,
                slices.tomorrowMorning,
                slices.tomorrowAfternoon,
            ];
        }
        return [slices.morning, slices.afternoon];
    }

    public static getForecastEmbedFields(
        meteo: ForecastResponse
    ): EmbedField[] {
        const slices = MeteoHelpers.detectSlice();
        let currentSlice = 0;
        for (const forecastItem of meteo.forecast) {
            if (forecastItem.dt < slices[currentSlice].start) continue;
            if (forecastItem.dt > slices[currentSlice].end) {
                currentSlice++;
                if (currentSlice >= slices.length) {
                    break;
                }
                if (forecastItem.dt < slices[currentSlice].start) {
                    continue;
                }
            }
            let toAdd = `<t:${forecastItem.dt}:t> `;
            toAdd += forecastItem.T.value + "°C ";
            try {
                const emote =
                    iconToEmoji[
                        forecastItem.weather.icon
                            .replace("bis", "")
                            .replace("ter", "")
                            .replace("n", "j")
                    ];
                toAdd += emote || forecastItem.weather.icon || "oskour";
            } catch (e) {
                // catch if the weather icon is wrong. Should never happen.
                log.warn("Wrong weather icon :", e);
            }
            toAdd += ` ${forecastItem.weather.desc}\n`;
            slices[currentSlice].value += toAdd;
        }
        if (currentSlice % 2 === 1) {
            slices[0].inline = false;
        }
        return <EmbedField[]>slices;
    }
}
