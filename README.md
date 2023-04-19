# Quark

Quark is a lightweight state management library for React applications. It provides a simple and intuitive way to manage state that can scale with your application.
## Features

   - Lightweight: Quark is a small library that won't slow down your application with minimal dependencies and only standard react stuff.
   - Easy to use: Quark has a simple API that makes it easy to manage state in your React components. 
   - Flexible: Quark works with any data type, and you can use it to manage local or remote state.

## Getting Started

To get started with Quark, you'll need to install it using npm:

    npm install quark --save

Once you've installed Quark, you can start using it in your React components:

````typescript
import {useGlobalQuark, useQuarkState} from "quark";

const initialState = {
    counter: 0
};

const store = useGlobalQuark<CounterStore>(initialState);

const Message = () => {
    const {counter} = useQuarkState(store, ['counter']); 
    return (
        <div>clicked {counter} times</div>
    )
}

const Button1 = () => {
    const {counter} = useQuarkState(store, ['counter']);
    const onClick = () => store.update({counter: counter! + 1});

    return (
        <>
            <Message2 />
            <button onClick = {onClick} > Counter++ </button>
        < />
    )
}

````

This example create a global quark, and then uses the state in two different components.
useQuarkState is a hook that allows you to subscribe to a specific part of the store state, and updates will only occur when that state updates.

You can also create a context bound version of a quark by doing the following. This is useful if you want a component types to have multiple stores in your application.

````typescript

type TickerStore = {
    ticker: string;
    tocks: number;
}

const {context, QuarkProvider} = createQuark<TickerStore>({ticker: "TICK", tocks: 0});

export const Ticker: React.FC = () => {
    return (
        <QuarkProvider>
            <Tock/>
        </QuarkProvider>
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
````

For more information on how to use Quark, check out the documentation.

## Contributing

We welcome contributions from the community! To get started, please read our [contributing guidelines](https://github.com/quarkjs/quark/blob/main/CONTRIBUTING.md)
## License

Quark is [MIT licensed](https://github.com/quarkjs/quark/blob/main/LICENSE).
