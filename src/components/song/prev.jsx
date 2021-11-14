import React from 'react';

// icons
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';



/*  Component schema
/*   *   *   *   *   *   *   *   *   *   */

export default function Prev({ song, actions }) {


    
/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */

return(
    <>
        <li className='song'>

            <img className='img' src={ song.img } alt={ song.author }/>

            <div className='info'>
                
                <p className='title'><span>{ song.title }</span></p>

                <p className='author'><span>{ song.author }</span></p>

            </div>

            <div className='actions'>

                <button onClick={ () => actions[0]( song ) }><PlayArrowIcon /></button>

                <button onClick={ () => actions[1]( song ) }><PlaylistAddIcon /></button>

                <button onClick={ () => actions[2]( song ) }><CloseIcon /></button>

            </div>

        </li>
    </>
)};