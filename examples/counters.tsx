import React from 'react'
import ReactDOM from 'react-dom/client'
import {useGlobalQuark, useQuarkState} from "../src/quark";
import {Ticker} from "./ticker.component";

type CounterStore = {
  counter: number;
  counter2: number;
  message: string;
}

const store = useGlobalQuark<CounterStore>({counter: 0, counter2: 0, message: "You Clicked {0} Times!"});

const Message = () => {
    const {counter} = useQuarkState(store, ['counter']); // <CounterStore, 'counter'
    return (
        <div>Whoop you clicked {counter}</div>
    )
}

const Message2 = () => {
    const {counter2} = useQuarkState(store, ['counter2']);
    return (
        <div>Again {counter2}</div>
    )
}

const Button1 = () => {
    const {counter} = useQuarkState(store, ['counter']); // <CounterStore, 'counter'
    const  onClick = () => store.update({counter: counter! + 1});

    return (
        <>
            <Message2/>
            <button onClick={onClick}>CLICK ME!</button>
        </>
    )
}

const Button2 = () => {
    const { counter2 } = useQuarkState(store, ['counter2']); // <CounterStore, 'counter2'
    const  onClick = () => store.update({counter2: counter2! + 1});

    return (
        <button onClick={onClick}>CLICK ME 2!</button>
    )
}

const App = () => {

    return (
        <div>Test
            <Button1/>
            <Button2/>
            <Message/>
            <Message2/>
            <Ticker/>
            <Ticker/>
        </div>
    )
}


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
)
