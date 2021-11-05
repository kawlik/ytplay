import React from 'react';

// icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import ReplayIcon from '@mui/icons-material/Replay';
import PauseIcon from '@mui/icons-material/Pause';
import CloseIcon from '@mui/icons-material/Close';



/*  Component schema
/*   *   *   *   *   *   *   *   *   *   */

export default function Next({ song, paused, actions }) {


    
/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */

return(
    <>
        <li className='song'>

            <img className='img' src={ song.img } alt={ song.author }/>

            <div className='info'>

                <p><span className='title'>{ song.title }</span></p>

                <p><span className='author'>{ song.author }</span></p>

            </div>

            <div className='actions'>

                <button onClick={ () => actions[0]() }>
                    {
                        paused
                        ? <PlayArrowIcon />
                        : <PauseIcon />
                    }
                </button>

                <button onClick={ () => actions[1]() }><ReplayIcon /></button>

                <button onClick={ () => actions[2]( song ) }><CloseIcon /></button>

            </div>

        </li>
    </>
)};