import React, { createContext, useEffect, useReducer } from 'react';


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


        // init state with saved state
        const localNext = JSON.parse( localStorage.getItem( 'ytplay.next' ) || null );
        const localPrev = JSON.parse( localStorage.getItem( 'ytplay.prev' ) || null );

        // creat state init object
        const initPayload = {
            next: localNext?.length ? localNext : [],
            prev: localPrev?.length ? localPrev : [],
        };

        // initial dispatch
        dispatchState({ type: 'read', payload: initPayload });

    }, []);


    // store save
    useEffect(() => {

        // save state in local storage
        if( state.next.length ) {
            localStorage.setItem( 'ytplay.next', JSON.stringify( state.next ));
        }

        if( state.prev.length ) {
            localStorage.setItem( 'ytplay.prev', JSON.stringify( state.prev ));    
        }


    });


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
            next: [ action.payload, ...state.next.filter( song => song.id !== action.payload.id ) ],
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


        // plays prev track
        case 'read':
        return {
            next: action.payload.next,
            prev: action.payload.prev,
        };


        // plays prev track
        case 'next-to-prev':
        return {
            next: state.next.filter( song => song.id !== action.payload.id ),
            prev: [ action.payload, ...state.prev ],
        };


        // plays prev track
        case 'prev-to-next':
        return {
            next: [ action.payload, ...state.next ],
            prev: state.prev.filter( song => song.id !== action.payload.id ),
        };
    };
};