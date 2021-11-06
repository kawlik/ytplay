import React, { createContext, useEffect, useRef, useReducer, useState } from 'react';
import axios from 'axios';

// global config
import config from '@/config/config';


/*  Component schema
/*   *   *   *   *   *   *   *   *   *   */

export const StoreContext = createContext( null );

export function StoreProvider({ children }) {


    // global audio objct ref
    const audio = useRef( new Audio() );
    const [ paused, setPaused ] = useState( true );

    // global state object
    const [ state, dispatchState ] = useReducer( stateReducer, {

        // songs to play
        next: [],

        // songs played
        prev: [],
    });


/*  Component handlers
/*   *   *   *   *   *   *   *   *   *   */

    async function fetchSRC( id ) {

        try {

            // create request url
            const url = new URL( config.ytmp3.base + id );

            // await for request
            const response = await axios.get( url, { headers: config.ytmp3.headers });

            // parse src
            const src = response.data.link;

            // test src
            if( src.length ) {
                return src;
            }

        } catch( err ) {

            // show err
            console.error( err );
        }

        // return null as result
        return null;
    };

    async function updateAndPlay( time ) {
        if( time < audio.current.duration ) {        
            audio.current.currentTime = time;
        }
    };

    async function loadAndPlay() {
        audio.current.pause();
        setPaused( true );

        if ( state.next[0] ) {

            // test song link freshness
            if( state.next[0].date < Date.now() - ( 1000 * 60 * 60 * 24 )) {
                state.next[0].src = await fetchSRC( state.next[0].id ) || '';
                state.next[0].date = Date.now();
            }

            audio.current.src = state.next[0].src;
            audio.current.load();
            audio.current.play();
            setPaused( false );
        };
    };

    async function toggleAudio() {

        if( audio.current.src && state.next[0].date < Date.now() - ( 1000 * 60 * 60 * 24 )) {

            if( audio.current.paused ){

                audio.current.play();
                setPaused( false );

            } else {

                audio.current.pause();
                setPaused( true );
            }

        } else {

            loadAndPlay();
        }
    };

    async function playNext() {
        audio.current.pause();
        setPaused( true );

        if( state.next[1] ) {

            // test song link freshness
            if( state.next[1].date < Date.now() - ( 1000 * 60 * 60 * 24 )) {
                state.next[1].src = await fetchSRC( state.next[1].id ) || '';
                state.next[1].date = Date.now();
            }

            audio.current.src = state.next[1].src;
            audio.current.load();
            audio.current.play();
            setPaused( false );
        }

        dispatchState({ type: 'play-next' })
    };

    async function playPrev() {
        audio.current.pause();
        setPaused( true );

        if( state.prev[0] ) {

            // test song link freshness
            if( state.prev[0].date < Date.now() - ( 1000 * 60 * 60 * 24 )) {
                state.prev[0].src = await fetchSRC( state.prev[0].id ) || '';
                state.next[0].date = Date.now();
            }

            audio.current.src = state.prev[0].src;
            audio.current.load();
            audio.current.play();
            setPaused( false );
        }

        dispatchState({ type: 'play-prev' })
    };

    async function playNow( payload ) {
        audio.current.pause();

        // test song link freshness
        if( payload.date < Date.now() - ( 1000 * 60 * 60 * 24 )) {
            payload.src = await fetchSRC( payload.id ) || '';
            payload.date = Date.now();
        }

        audio.current.src = payload.src;
        audio.current.load();
        audio.current.play();
        setPaused( false );

        dispatchState({ type: 'play-now', payload: payload });
    };
    
    function addNext( payload ) {

        if( !state.next[0] ) {

            audio.current.src = payload.src;
            audio.current.load();
            audio.current.play();
            setPaused( false );
        }

        dispatchState({ type: 'add-next', payload: payload });
    };


    function add( payload ) {

        if( !state.next[0] ) {

            audio.current.src = payload.src;
            audio.current.load();
            audio.current.play();
            setPaused( false );
        }

        dispatchState({ type: 'add', payload: payload });
    };

    function remove( payload ) {

        if( state.next[0]?.id === payload.id ) {
            audio.current.pause();
            setPaused( true );
        };

        dispatchState({ type: 'remove', payload: payload });
    };

        
    // audio on ended effect
    audio.current.onended = playNext;

    //  read stored data
    useEffect(() => {

        // read local data
        const localNext = JSON.parse( localStorage.getItem( 'ytplay.next' ));
        const localPrev = JSON.parse( localStorage.getItem( 'ytplay.prev' ));

        // create payload
        const payload = {
            next: localNext?.length ? localNext : [],
            prev: localPrev?.length ? localPrev : [],
        };

        // make initial dispatch
        dispatchState({ type: 'init', payload: payload });

    }, []);


    //  storage method
    useEffect(() => {

        // read local data
        localStorage.setItem( 'ytplay.next', JSON.stringify( state.next ));
        localStorage.setItem( 'ytplay.prev', JSON.stringify( state.prev ));

        console.log( state )
    });


/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */

// store global object
const storeValue = {

    // global audio ref & state
    audio, paused, state,

    // global state
    updateAndPlay,
    loadAndPlay,
    toggleAudio,
    playNext,
    playPrev,
    playNow,
    addNext,
    add,
    remove,
};

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

        // palys next song
        case 'play-next':
        if( state.next[0] ) {

            return {
                next: [ ...new Set( state.next.slice( 1 ) )],
                prev: [ ...new Set([ state.next[0], ...state.prev ])],
            };

        } else {
            
            return {
                next: [],
                prev: state.prev,
            };
        }

        // palys prev song
        case 'play-prev':
        if( state.prev[0] ) {

            return {
                next: [ ...new Set([ state.prev[0], ...state.next ])],
                prev: [ ...new Set( state.prev.slice( 1 ) )],
            };

        } else {
            
            return {
                next: state.next,
                prev: [],
            };
        }

        // plays selected song
        case 'play-now':
        if( state.next[0] ) {

            return {
                next: [ ...new Set([ action.payload, ...state.next.slice( 1 ) ])],
                prev: [ ...new Set([ state.next[0], ...state.prev.filter( e => e.id !== action.payload.id )])],
            };

        } else {
            
            return {
                next: [ action.payload ],
                prev: state.prev,
            };
        }

        // adds song as next to list
        case 'add-next':
        if( state.next[0] ) {

            return {
                next: [ ...new Set([ state.next[0], action.payload, ...state.next ])],
                prev: state.prev,
            };

        } else {
            
            return {
                next: [ action.payload ],
                prev: state.prev,
            };
        }
        
        // adds song to list
        case 'add':
        return {
            next: [ ...new Set([ ...state.next, action.payload ])],
            prev: [ ...new Set( state.prev.filter( e => e.id !== action.payload.id ))],
        };

        // removes song
        case 'remove':
        return {
            next: [ ...new Set( state.next.filter( e => e.id !== action.payload.id ))],
            prev: [ ...new Set( state.prev.filter( e => e.id !== action.payload.id ))],
        };

        // removes song
        case 'init':
        return {
            next: [ ...new Set( action.payload.next )],
            prev: [ ...new Set( action.payload.prev )],
        };
    };
};