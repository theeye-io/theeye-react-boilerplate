import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

export type indicators = any[];

export const indicatorsSlice = createSlice({
    name: "indicators",
    initialState: {
        indicators: [] as indicators,
        wasRead: false,
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
                    state.indicators.splice(
                        state.indicators.indexOf(indicator),
                        1
                    );
                    break;
                default:
                    break;
            }
            state.wasRead = false;
        },
        setIndicator: (state, action) => {
            state.indicators = action.payload.payload;
            // state.indicators[3] = {
            //     id: "placeholder",
            //     title: "Test",
            //     value: {
            //         type: "waterfall",
            //         data: [
            //             {
            //                 name: "2018",
            //                 type: "waterfall",
            //                 orientation: "v",
            //                 measure: [
            //                     "relative",
            //                     "relative",
            //                     "total",
            //                     "relative",
            //                     "relative",
            //                     "total",
            //                 ],
            //                 x: [
            //                     "Sales",
            //                     "Consulting",
            //                     "Net revenue",
            //                     "Purchases",
            //                     "Other expenses",
            //                     "Profit before tax",
            //                 ],
            //                 textposition: "outside",
            //                 text: ["+60", "+80", "", "-40", "-20", "Total"],
            //                 y: [60, 80, 0, -40, -20, 0],
            //                 connector: {
            //                     line: {
            //                         color: "rgb(63, 63, 63)",
            //                     },
            //                 },
            //             },
            //         ],
            //     },
            // };
            state.wasRead = false;
        },
        dataViewed: (state) => {
            state.wasRead = true;
        },
        removeAll: (state) => {
            state.indicators = [undefined];
        },
    },
});

export const { edit, setIndicator, dataViewed, removeAll } =
    indicatorsSlice.actions;

export default indicatorsSlice.reducer;
