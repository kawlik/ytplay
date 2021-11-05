import React from 'react';

// icons
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';


/*  Component schema
/*   *   *   *   *   *   *   *   *   *   */

export default function Next({ song, actions }) {


    
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

                <button onClick={ () => actions[0]( song ) }><PlayArrowIcon /></button>

                <button onClick={ () => actions[1]( song ) }><PlaylistPlayIcon /></button>

                <button onClick={ () => actions[2]( song ) }><CloseIcon /></button>

            </div>

        </li>
    </>
)};