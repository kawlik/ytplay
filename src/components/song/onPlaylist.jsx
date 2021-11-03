import React from 'react';

// icons
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';


/*  Component schema
/*   *   *   *   *   *   *   *   *   *   */

export default function OnPlaylist({ song, action, onPlaylistNext }) {


/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */

return(
    <>
        <li className='on-playlist'>

            <img className='img' src={ song.img } alt={ song.author }/>

            <div className='info'>

                <p><span className='title'>{ song.title }</span></p>

                <p><span className='author'>{ song.author }</span></p>

            </div>

            <button className='action' onClick={ () => action( song ) }>
                { onPlaylistNext ? <CloseIcon /> : <ReplayIcon /> }
            </button>

        </li>
    </>
)};