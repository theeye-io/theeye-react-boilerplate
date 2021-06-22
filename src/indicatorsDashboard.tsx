import React, { Children, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchIndicators, getIndicators } from "./apis/indicators/indicators.handler";
import store from "./apis/store";
import Graph from "./indicatorsGraph";
import { removeAll, dataViewed } from "./apis/indicators/indicators.slice";

const IndicatorsDashboard = () => {
    const indArray = useSelector(getIndicators)
    const objs = (() => {try {
        return indArray.map((d: any) => <Graph id={d.id} />)
    } catch (error) {
        return <h1>No indicators</h1>
    }})();

    useEffect(() => {
        if (store.getState().indicators.wasRead == false) {
            store.dispatch(dataViewed())
            window.location.reload() 
            // This fixes a glitch with Plotly where Waterfall graphs wouldn't render on hook 
        }
    })

    const fetch = () => fetchIndicators()
    const clean = () => store.dispatch(removeAll())

    return <>
        <button onClick={fetch}>fetch</button>
        <button onClick={clean}>clean</button>
        <div className="indicatorDashboard">
            {objs}
        </div>
    </>;
}


// export default React.memo(IndicatorsDashboard)
export default IndicatorsDashboard