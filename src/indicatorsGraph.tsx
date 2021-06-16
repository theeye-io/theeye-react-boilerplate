import React from "react";
import Plot from "react-plotly.js";
import store from "./apis/store";

export default function Graph(props: any) {
    console.log(props.id)
    let data;
    //@ts-ignore
    if (store.getState().indicators.indicators["payloads"]) {
        //@ts-ignore
        data = store.getState().indicators.indicators["payloads"][props.id]
    
    }
    return (
        <>
            <Plot
            //@ts-ignore
                data={data || [
                    {
                        x: [1, 2, 3],
                        y: [2, 6, 3],
                        type: "scatter",
                        mode: "lines+markers",
                        marker: { color: "red" },
                    },
                    { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
                ]}
                layout={{ width: 320, height: 240, title: "A Fancy Plot" }}
            />
        </>
    );
}
