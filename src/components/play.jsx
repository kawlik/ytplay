import React, { useEffect, useContext, useRef } from 'react';

// store context
import { StoreContext } from '../context/store';

// icons
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';

/*  Component schema
/*   *   *   *   *   *   *   *   *   *   */

export default function Play() {

    // global state
    const { audio, state, paused, updateAndPlay, loadAndPlay, toggleAudio, playNext, playPrev } = useContext( StoreContext );

    // animation ref
    const animationRef = useRef();

    // update curr time
    function update( event ) {
        updateAndPlay( event.target.value );
        animate();
    };

    // animation function
    function animate() {

        // timing range
        document.querySelector( '#input-timing .track' ).max = audio.current.duration;
        document.querySelector( '#input-timing .track' ).value = audio.current.currentTime;

        // timing display
        document.querySelector( '#input-timing .t-end' ).textContent = parseTime( audio.current.duration );
        document.querySelector( '#input-timing .t-now' ).textContent = parseTime( audio.current.currentTime );

        // make animation request
        animationRef.current = requestAnimationFrame( animate );
    };
    
    // animate time bar
    useEffect(() => {

        // start animation
        animate();

        // cancel animation
        return (() => { cancelAnimationFrame( animationRef.current ) });

    }, []);


/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */

return(
    <>
        <section className='play'>


            <div className='row info'>

                <p className='title'>
                    <span>{ state.next[0] ? state.next[0].title : '' }</span>
                </p>

                <p className='author'>
                    <span>{ state.next[0] ? state.next[0].author : '' }</span>
                </p>

            </div>


            <div className='row actions'>

                <button className='skip-prev' onClick={ loadAndPlay } onDoubleClick={ playPrev }>
                    <SkipPreviousIcon />
                </button>


                <button className='play-pause' onClick={ toggleAudio }>
                    {
                        paused
                        ? <PlayArrowIcon />
                        : <PauseIcon />
                    }
                </button>


                <button className='skip-next' onClick={ playNext }>
                    <SkipNextIcon />
                </button>

            </div>


            <div className='row timing' id='input-timing'>

                <span className='t-now'>0:00</span>

                <span className='t-end'>0:00</span>

                <input className='track' type='range' min={ 0 } max={ 0 } onTouchStart={ () => cancelAnimationFrame( animationRef.current ) } onTouchEnd={ update } />

            </div>
            

        </section>
    </>
)};


/*  Utility functions
/*   *   *   *   *   *   *   *   *   *   */


// time parsing function
function parseTime( value ) {
    return Number.isNaN( value ) ? '0:00' : `${ Math.floor( value / 60 ) }:${ Math.ceil( value ) % 60 > 9 ? Math.ceil( value ) % 60 : '0' + Math.ceil( value ) % 60 }`;
};