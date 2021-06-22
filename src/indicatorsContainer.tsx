import React, {Component} from "react";
import Graph from "./indicatorsGraph";

type MyProps = { indicators:any };
type MyState = { indicators:any };

export class IndicatorsContainer extends Component<MyProps, MyState> {

    constructor(props: any) {
        super(props);
        this.state = {indicators: props.indicators?.map((d: any) => <Graph id={d.id} />)}
    }

    handleUpdate = (arr: []) => {
        this.setState({indicators: arr})
    }
    render() {
        return <div className="indicatorContainer">{this.state.indicators}</div>;
    }
}
