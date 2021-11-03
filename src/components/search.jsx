import React, { useState, useContext, useRef } from 'react';
import axios from 'axios';

// store context
import { StoreContext } from '../context/store';

// global config
import config from '@/config/config';

// local components
import OnPlaylist from '@/components/song/onPlaylist';
import SearchResult from '@/components/song/searchResult';


/*  Component schema
/*   *   *   *   *   *   *   *   *   *   */

export default function Search() {

    // global state
    const { state, dispatchState } = useContext( StoreContext );


    // side menu expand state
    const [ expand, setExpand ] = useState( false );
    const [ result, setResult ] = useState( [] );
    const [ search, setSearch ] = useState( '' );


    // API call debounce interval
    const timeoutRef = useRef();


    // search handlers
    function updateSearch( event ) {

        // clear before timeout
        clearTimeout( timeoutRef.current );

        // parse target value
        const { value } = event.target;

        // update state
        setSearch( value );

        // set API call
        timeoutRef.current = setTimeout(() => getResults( value ), 1000 );
    };

    async function getResults( data ) {

        // prevent api call if data to shoort
        if( data.length < 4 ) { return; }

        // try to make api call
        try {

            // create proper url
            const url = new URL( config.google.base + config.google.string + data );

            // await for server response
            const response = await axios.get( url );

            // parse items
            const items = response?.data?.items;

            // update result
            setResult( items.length ? items : [] );

        } catch( err ) {

            // show error in console
            console.error( err );
        }
    };

    function clearAll() {
        setResult( [] );
        setSearch( '' );
    };


    // actions handlers
    function addToPlaylist( payload ) {
        dispatchState({ type: 'add', payload: payload });
        clearAll();
    };

    function nextToPrev( payload ) {
        dispatchState({ type: 'next-to-prev', payload: payload });
        clearAll();
    };

    function prevToNext( payload ) {
        dispatchState({ type: 'prev-to-next', payload: payload });
        clearAll();
    };


/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */

return(
    <>        
        <section className={ `search ${ expand ? 'expand' : '' }` }>


            <div id='yt-search'>
                <button className={ expand ? 'expand' : '' } onClick={ () => setExpand( false ) }></button>
                <input className={ expand ? 'expand' : '' } value={ search } type='text' onFocus={ () => setExpand( true ) } onChange={ updateSearch }/>
            </div>


            <article className={ `hidden ${ expand ? 'display' : '' }` }>


                <ul className={ `search-result ${ result.length ? '' : 'hide' }` }>
                    <h3>Wyniki</h3>
                    {
                        result.map(( raw, i ) => <SearchResult key={ raw.etag } raw={ raw } delay={ i } action={ addToPlaylist } />)
                    }
                </ul>


                <ul className='playlist next'>
                    <h3>W kolejce</h3>
                    {
                        state.next.map( song => <OnPlaylist key={ song.id } song={ song } action={ nextToPrev } onPlaylistNext={ true } />)
                    }
                </ul>

                <ul className='playlist prev'>
                    <h3>Wcześniejsze</h3>
                    {
                        state.prev.map( song => <OnPlaylist key={ song.id } song={ song } action={ prevToNext } onPlaylistNext={ false } />)
                    }
                </ul>


            </article>
            
        </section>
    </>
)};