import React, { useState, useEffect, useContext } from 'react';

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
    const { state, dispatchState } = useContext( StoreContext );

    // audio object and play pause state
    const [ audio, setAudio ] = useState( new Audio() );
    const [ pause, setPause ] = useState( true );


    // audio handlers
    function setAudioSong( song ) {
        audio.setAttribute( 'src', song );
        audio.load();
    };

    function resetAudio() {
        audio.removeAttribute( 'src' );
        audio.load();
    }

    function playAudio() {
        setPause( false );
        audio.play();
    };

    function pauseAudio() {
        setPause( true );
        audio.pause();
    };


    // button handlers
    function togglePlayPause() {
        
        // loads or skips song
        if( !audio.src ) {

            if( state.next[0] ) { setAudioSong( state.next[0].src ); }
            else return;
        }

        // toggles play pause
        audio.paused ? playAudio() : pauseAudio();
    }

    function reload() {

        // is track available
        if( state.next[0] ) {
            setAudioSong( state.next[0].src );
            playAudio();
        }
    };

    function playNext() {
        pauseAudio();
        resetAudio();

        // loads or skips song
        if( state.next[1] ) {

            // play audio
            setAudioSong( state.next[1].src );
            setPause( false );
            playAudio();
        }

        // global state dispatch
        dispatchState({ type: 'play-next' });
    }

    function playPrev() {
        pauseAudio();
        resetAudio();

        // loads or skips song
        if( state.prev[0] ) {

            // play audio
            setAudioSong( state.prev[0].src );
            setPause( false );
            playAudio();
        }

        // global state dispatch
        dispatchState({ type: 'play-prev' });
    }


    // on effect animations
    useEffect(() => {

        function animate() {

            // update value
            document.querySelector( '#input-timing .track' ).max = audio.duration;
            document.querySelector( '#input-timing .track' ).value = audio.currentTime;

            // update view
            document.querySelector( '#input-timing .t-now' ).textContent = parseTime( audio.currentTime );
            document.querySelector( '#input-timing .t-end' ).textContent = parseTime( audio.duration );


            // request next animation
            requestAnimationFrame( animate );
        };

        animate();

    });

/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */

return(
    <>
        <section className='play'>


            <div className='row info'>

                <p id='animated-song-title'>
                    <span className='title'>{ state.next[0] ? state.next[0].title : '' }</span>
                </p>

                <p>
                    <span className='author'>{ state.next[0] ? state.next[0].author : '' }</span>
                </p>

            </div>


            <div className='row timing' id='input-timing'>

                <input className='track' type='range' min={ 0 } max={ 0 } />

                <span className='t-now'>0:00</span>

                <span className='t-end'>0:00</span>

            </div>


            <div className='row actions'>

                <button className='skip-prev' onClick={ reload } onDoubleClick={ playPrev }>
                    <SkipPreviousIcon />
                </button>


                <button className='play-pause' onClick={ togglePlayPause }>
                    {
                        audio.paused
                        ? <PlayArrowIcon />
                        : <PauseIcon />
                    }
                </button>


                <button className='skip-next' onClick={ playNext }>
                    <SkipNextIcon />
                </button>

            </div>


        </section>
    </>
)};


/*  Utility functions
/*   *   *   *   *   *   *   *   *   *   */

function parseTime( value ) {
    return Number.isNaN( value ) ? '0:00' : `${ Math.floor( value / 60 ) }:${ Math.ceil( value ) % 60 > 9 ? Math.ceil( value ) % 60 : '0' + Math.ceil( value ) % 60 }`;
};