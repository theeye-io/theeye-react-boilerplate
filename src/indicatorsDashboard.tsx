import React, { useState, useEffect } from "react";
import store from "./apis/store";
import indicatorsSlice, {
    indicators,
} from "./apis/indicators/indicators.slice";
import { fetchIndicators } from "./apis/indicators/indicators.handler";
import Graph from "./indicatorsGraph";
import { dataViewed } from "./apis/indicators/indicators.slice";

export default function IndicatorsDashboard(props: any) {
    const [graphList, setGraphList] = useState<any>([<Graph/>,<Graph/>,<Graph/>]);

    // const handleState = () => {
    //     const state = store.getState();
    //     if (!state.indicators.wasRead) {
    //         //@ts-ignore
    //         const indicators = state.indicators.indicators["payload"];

    //         const arr = indicators?.map((d: any) => <Graph id={d.id} />);
    //         console.log(arr)
    //         setGraphList(arr);
    //         store.dispatch(dataViewed());

    //     }
    // };

    //@ts-ignore
    const indicators = store.getState().indicators.indicators["payload"]
    const arr = indicators?.map((d: any) => <Graph id={d.id} />)
    // store.subscribe(handleState);

    // useEffect(() => {
    //     console.log(graphList);
    //     //@ts-ignore
    //     graphList.forEach(g => {
    //         console.log(g)
    //     });
    // }, [graphList]);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         fetchIndicators();
    //     }, 1000);
    //     return () => clearTimeout(timer);
    // }, []);

    const pointer = [...graphList]
    //@ts-ignore
    return <div className="indicatorDashboard">{arr}</div>;
}
