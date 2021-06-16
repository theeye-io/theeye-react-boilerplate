import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

export type indicators = any[];

export const indicatorsSlice = createSlice({
    name: "indicators",
    initialState: {
        indicators: [] as indicators,
        payload: {} as {indicators: indicators, wasRead: boolean}, 
        wasRead: false
    },
    reducers: {
        edit: (state, action) => {
            switch (action.type) {
                case "SET_INDICATORS":
                    state.indicators = action.payload.indicators;
                    break;
                case "ADD_INDICATOR":
                    state.indicators.push(action.payload.indicator);
                    break;
                case "REMOVE_INDICATOR":
                    const indicator = state.indicators.find(
                        (ind) => ind.id === action.payload.id //FIXME: Que es esto??
                    );
                    state.indicators.splice(state.indicators.indexOf(indicator), 1);
                    break;
                default:
                    break;
            }
            state.wasRead = false
        },
        setIndicator: (state, action) => {
            state.indicators = action.payload;
            state.wasRead = false
        },
        dataViewed: (state) => {
            state.wasRead = true
        }
    },
});

export const { edit, setIndicator, dataViewed } = indicatorsSlice.actions;

export default indicatorsSlice.reducer;
