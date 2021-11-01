import React, { useState, useContext } from 'react';

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

    const { audio } = useContext( StoreContext );

    const [ play, setPlay ] = useState( true );


    function togglePlayPause() {
        
        if( play ) {
            audio.play();

        } else {
            audio.pause();
        }

        setPlay( prev => !prev );
    }


/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */

return(
    <>
        <section className='play'>


            <button className='skip-prev'>
                <SkipPreviousIcon />
            </button>


            <button className='play-pause' onClick={ togglePlayPause }>
                {
                    play
                    ? <PlayArrowIcon />
                    : <PauseIcon />
                }
            </button>


            <button className='skip-next'>
                <SkipNextIcon />
            </button>


            <div className='timing'>

                <input className='track' type='range' min={ 0 } max={ 0 } />

                <span className='t-now'>0:00</span>

                <span className='t-end'>0:00</span>

            </div>

        </section>
    </>
)};