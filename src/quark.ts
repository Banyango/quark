import {useEffect, useState } from "react";
import {isDeepEqual} from "./utils";

type IQuarkListener<S> = (state: S) => void;

export interface IQuarkStore<S> {
    /**
     * The current state of the store.
     */
    state: S;

    /**
     * A set of listeners that will be called when the state is updated.
     */
    listeners: Set<IQuarkListener<S>>;

    /**
     * Update the state of the store.
     *
     * @param action The action to update the state.
     */
    update: (action: Partial<S>) => void;

    /**
     * Register a listener to be called when the state is updated.
     *
     * @param listener The listener to register.
     */
    registerListener: (listener: IQuarkListener<S>) => () => void;
}


/**
 * A store that can be used to manage state.
 */
export class QuarkStore<S> implements IQuarkStore<S> {
    /**
     * The state.
     */
    state: S;

    /**
     * A set of listeners that will be called when the state is updated.
     */
    listeners: Set<IQuarkListener<S>>;

    constructor(initialState?: S) {
        this.state = initialState || {} as S;
        this.listeners = new Set<IQuarkListener<S>>();
    }

    /**
     * Update the state of the store.
     *
     * @param action The state from the store you want to update.
     */
    public update = (action: Partial<S>) => {
        this.state = {
            ...this.state,
            ...action
        };

        for (const item of this.listeners.values()) {
            item(this.state);
        }
    }

    /**
     * Register a listener to be called when the state is updated.
     *
     * @param listener  The listener to register.
     */
    registerListener(listener: IQuarkListener<S>): () => void {
        this.listeners?.add(listener);
        return () => {
            this.listeners?.delete(listener);
        }
    }
}

/**
 * A hook that returns a reference to a global store. This is useful for global state management.
 *
 * @param initialState The initial state of the store.
 */
export const useGlobalQuark = <S>(initialState?: S) => {
    return new QuarkStore<S>(initialState);
}

/**
 * A hook that will return the state of the store.
 *
 * @param store         The store to use.
 * @param quarks        An array of keys you want to return from the store.
 */
export const useQuarkState = <State extends Record<string, any>, Quark extends keyof State>(store: IQuarkStore<State>, quarks: Quark[]) : Pick<State, Quark> => {
    const pick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
        const result = {} as Pick<T, K>;

        keys.forEach(key => {
            result[key] = obj[key];
        });

        return result;
    }

    const selectState: (state: State) => Pick<State, Quark> = (state: State) => pick(state, quarks) as Pick<State, Quark>;

    const [state, setState] = useState<Pick<State, Quark>>(selectState(store.state));

    useEffect(() => {
        return store.registerListener(s => {
            const updatedState = selectState(s);

            if(isDeepEqual(state, updatedState)) return;

            setState(updatedState);
        })
    }, [state]);

    return state;
}
