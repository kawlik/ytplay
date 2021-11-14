import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';

// store context
import { StoreContext } from '../context/store';

// global config
import config from '@/config/config';

// local components
import Now from '@/components/song/now';
import Raw from '@/components/song/raw';
import Next from '@/components/song/next';
import Prev from '@/components/song/prev';


/*  Component schema
/*   *   *   *   *   *   *   *   *   *   */

export default function Search() {

    // global state
    const { state, paused, loadAndPlay, toggleAudio, playNow, addNext, add, remove } = useContext( StoreContext );


    // side menu expand state
    const [ expand, setExpand ] = useState( false );
    const [ result, setResult ] = useState( [] );
    const [ search, setSearch ] = useState( '' );

    // API call debounce interval
    const timeoutRef = useRef();


    // search utility functions
    function clearAll() {
        setResult( [] );
        setSearch( '' );
    };

    function handleSearch( event ) {
        clearTimeout( timeoutRef.current );

        // parse value
        const { value } = event.target;

        // update value
        setSearch( value );

        // request API call
        timeoutRef.current = setTimeout(() => processSearch( value ), 800 );
    };

    async function processSearch( value ) {

        // prevent to short call
        if( value.length < 4 ) { return; }

        try {

            // create request url
            const url = new URL( config.google.base + config.google.string + value );

            // await for request
            const response = await axios.get( url );

            // parse items
            const items = response.data.items;

            // set good response
            if( items.length ) { setResult( items ); };

        } catch( err ) {

            // show error
            console.error( err );

            // show alert
            alert( err.message );
        };
    };

    async function fetchSong( payload ) {
        
        try {

            // create request url
            const url = new URL( config.ytmp3.base + payload.id );

            // await for request
            const response = await axios.get( url, { headers: config.ytmp3.headers });

            // parse src
            const src = response.data.link;

            // test src
            if( src.length ) {

                // response success
                payload.src = src;
                return payload;
            }

        } catch( err ) {

            // show error
            console.error( err );
            
            // show alert
            alert( err.message );
        };

        // return null as result
        return null;
    }


    // search result functions
    async function fetchAndPlay( payload ) {
        const song = await fetchSong( payload );

        if( song ) { playNow( song ); }

        clearAll();
    }

    async function fetchAndAddNext( payload ) {
        const song = await fetchSong( payload );

        if( song ) { addNext( song ); }

        clearAll();
    }

    async function fetchAndAdd( payload ) {
        const song = await fetchSong( payload );

        if( song ) { add( song ); }

        clearAll();
    }


    //  expand when there is no music left
    useEffect(() => { if( !state.next[0] ) { setExpand( true ); } });

/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */

return(
    <>        
        <section className={ `search ${ expand ? 'expand' : '' }` }>


            <button className={ `toggler ${expand ? 'expand' : ''}` } onClick={ () => setExpand( prev => !prev ) }></button>

            <input className='search-bar' type='text' onChange={ handleSearch } value={ search } placeholder='Szukaj' />

            <article className='menu' >


                <ul className={ `playlist ${ result.length ? '' : 'hide' }` }>
                    <h3>Wyniki</h3>
                    {
                        result.map( raw => <Raw key={ raw.etag } raw={ raw } actions={[ fetchAndPlay, fetchAndAddNext, fetchAndAdd ]} />)
                    }
                </ul>


                <ul className={ `playlist ${ state.next[0] ? '' : 'hide' }` }>
                    <h3>Teraz</h3>
                    {
                        state.next[0] ? <Now song={ state.next[0] } paused={ paused } actions={[ toggleAudio, loadAndPlay, remove ]} /> : null
                    }
                </ul>


                <ul className={ `playlist ${ state.next[1] ? '' : 'hide' }` }>
                    <h3>W kolejce</h3>
                    {
                        state.next.map(( song, index ) => index ? <Next key={ song.id } song={ song } actions={[ playNow, addNext, remove ]} /> : null )
                    }
                </ul>


                <ul className={ `playlist ${ state.prev[0] ? '' : 'hide' }` }>
                    <h3>Wcześniejsze</h3>
                    {
                        state.prev.map( song => <Prev key={ song.id } song={ song } actions={[ playNow, add, remove ]} />)
                    }
                </ul>


            </article>
            
        </section>
    </>
)};