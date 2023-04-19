import React, {PropsWithChildren} from "react";
import {QuarkStore, IQuarkStore} from "./quark";

export type QuarkStoreContext<T> = {
    /**
     * The store for the context
     */
    store: IQuarkStore<T>;
}

/**
 * Creates a Quark store bound by a context.
 *
 * @param initialState The initial state of the store.
 */
export function createQuark<T>(initialState: T) {
    const context = React.createContext<QuarkStoreContext<T>>({
        store: {} as IQuarkStore<T>
    });

    const QuarkProvider: React.FC<PropsWithChildren<{}>> = ({children}) => {
        const [store, _] = React.useState<IQuarkStore<T>>(new QuarkStore<T>(initialState));
        return (
            <context.Provider value={{store}}>
                {children}
            </context.Provider>
        )
    }

    return {
        context, QuarkProvider
    }
}

