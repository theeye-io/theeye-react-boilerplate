import React from "react";
import Plot from "react-plotly.js";
import store from "./apis/store";

export default function Graph(props: any) {
    // if (props.id == "placeholder") debugger;
    const data = store.getState().indicators.indicators.find((obj) => {
        return obj.id == props.id;
    });
    console.log(props.id, data);

    return (
        <Plot
            data={
                data !== undefined
                    ? data.value.data
                    : [
                          {
                              x: [1, 2, 3],
                              y: [2, 6, 3],
                              type: "scatter",
                              mode: "lines+markers",
                              marker: { color: "red" },
                          },
                          { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
                      ]
            }
            layout={{
                width: 320,
                height: 240,
                title: data !== undefined ? data.title : "Placeholder",
            }}
        />
    );
}
