import React, { createContext, useEffect, useReducer } from 'react';

// mock data
import songs from '@/mock/songs';


/*  Component schema
/*   *   *   *   *   *   *   *   *   *   */

export const StoreContext = createContext( null );

export function StoreProvider({ children }) {


    // global state object
    const [ state, dispatchState ] = useReducer( stateReducer, {

        // songs to play
        next: [],

        // songs played
        prev: [],
    });



    // store global object
    const storeValue = {

        // global state
        state, dispatchState,
    };



    // store init
    useEffect(() => {

        for( const song of songs ) {
            dispatchState({ type: 'add', payload: song })
        }

    }, []);


/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */

return(
    <>
    <StoreContext.Provider value={ storeValue }>

        { children }

    </StoreContext.Provider>
    </>
)};



/*  Reducer schema
/*   *   *   *   *   *   *   *   *   *   */

function stateReducer( state, action ) {
    switch( action.type ) {


        // add song to playlist
        case 'add':
        return {
            ...state,
            next: [ ...state.next, action.payload ],
        };

        // plays next track
        case 'play-next':
        return {
            next: state.next.slice( 1 ),
            prev: state.next[0] ? [ state.next[0], ...state.prev ] : state.prev,
        };

        // plays prev track
        case 'play-prev':
        return {
            next: state.prev[0] ? [ state.prev[0], ...state.next ] : state.next,
            prev: state.prev.slice( 1 ),
        };
    };
};