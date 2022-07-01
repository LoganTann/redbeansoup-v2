import { ForecastResponse, RainResponse } from "./types.ts";
import fetchWithType from "framework/utils/fetchWithType.ts";

/**
 * Partial Typescript port of hacf-fr's meteofrance-api python client.
 * https://github.com/hacf-fr/meteofrance-api/blob/master/src/meteofrance_api/client.py
 * Under MIT License.
 * Copyright (c) 2020 HACF Home Assistant Communauté Francophone
 * Copyright (c) 2022 LoganTann
 * @author hacf-fr
 * @author LoganTann
 */
export default class MeteoFranceClient {
    /**
     * This token is graciously shared by Home Assistant Communauté Francophone.
     * Please do not abuse it.
     */
    static meteoFranceApiToken =
        "__Wj7dVSTjV9YGu1guveLyDq0g7S7TfTjaHBTPTpO0kj8__";
    static meteoFranceApiEndpoint = "https://webservice.meteofrance.com";
    static defaultCoord = {
        // iut.paris
        lat: 48.842987,
        lon: 2.269209,
    };

    /**
     * Retrieve the next 1 hour rain forecast for a given GPS the location.
     * @param latitude Latitude in degree of the GPS point corresponding to the rain forecast.
     * @param longitude Longitude  in degree of the GPS point corresponding to the rain forecast.
     * @param lang Optional; If language is equal "fr" (default value) results will be in French.
     *             All other value will give results in English.
     * @return A RainResponse instance representing the next hour rain forecast.
     */
    static async getRain(
        latitude?: number,
        longitude?: number,
        lang = "fr"
    ): Promise<RainResponse> {
        const endpoint = MeteoFranceClient.buildEndpoint(
            "rain",
            latitude,
            longitude,
            lang
        );
        return await fetchWithType<RainResponse>(endpoint);
    }

    /**
     * Retrieve the weather forecast for a given GPS location.
     * @param latitude Latitude in degree of the GPS point corresponding to the weather forecast.
     * @param longitude Longitude  in degree of the GPS point corresponding to the weather forecast.
     * @param lang Optional; If language is equal "fr" (default value) results will be in French.
     *             All other value will give results in English.
     * @return A {@link ForecastResponse} instance representing the hourly and daily weather forecast.
     */
    static async getForecast(
        latitude?: number,
        longitude?: number,
        lang = "fr"
    ): Promise<ForecastResponse> {
        const endpoint = MeteoFranceClient.buildEndpoint(
            "forecast",
            latitude,
            longitude,
            lang
        );
        return await fetchWithType<ForecastResponse>(endpoint);
    }

    private static buildEndpoint(
        requestType: "forecast" | "rain",
        latitude?: number,
        longitude?: number,
        lang?: string
    ) {
        return `${MeteoFranceClient.meteoFranceApiEndpoint}/${requestType}
                ?token=${MeteoFranceClient.meteoFranceApiToken}
                &lat=${latitude || MeteoFranceClient.defaultCoord.lat}
                &lon=${longitude || MeteoFranceClient.defaultCoord.lon}
                &lang=${lang || "fr"}`.replace(/\s+/g, "");
    }
}
