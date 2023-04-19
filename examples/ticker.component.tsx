import React from "react";
import {createQuark} from "../src/quark.context";
import {useQuarkState} from "../src/quark";

type TickerStore = {
    ticker: string;
    tocks: number;
}

const {context, QuarkProvider} = createQuark<TickerStore>({ticker: "TICK", tocks: 0});

export const Ticker: React.FC = () => {
    return (
        <QuarkProvider>
            <Tock/>
            <Tick/>
            <Reset/>
        </QuarkProvider>
    )
}

export const Reset = () => {
    return (
        <div>
            <Button/>
        </div>
    )
}

const Button = () => {
    const {store} = React.useContext(context);
    return (
        <button onClick={() => store.update({tocks: 0})}>Reset</button>
    )
}

export const Tock = () => {
    const {store} = React.useContext(context);
    const {tocks} = useQuarkState(store, ['tocks']);
    return (
        <div>
            <h1>{tocks}</h1>
        </div>
    )
}

export const Tick = () => {
    const {store} = React.useContext(context);
    return (
        <div>
            <button onClick={() => store.update({tocks: 4})}>TICK</button>
        </div>
    )
}
