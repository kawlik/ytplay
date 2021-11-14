import React from 'react';

// icons
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';


/*  Component schema
/*   *   *   *   *   *   *   *   *   *   */

export default function Raw({ raw, actions }) {

    // song object
    const song = {

        // god propeties
        id: raw.id.videoId,
        date: Date.now(),
        src: null,

        // display propeties
        title: raw.snippet.title.replace( /\&[\S]{0,9}\;/g, '' ),
        author: raw.snippet.channelTitle.replace( /\&[\S]{0,9}\;/g, '' ),
        img: raw.snippet.thumbnails.high.url,
    };

    
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

                <button onClick={ () => actions[1]( song ) }><PlaylistPlayIcon /></button>

                <button onClick={ () => actions[2]( song ) }><PlaylistAddIcon /></button>

            </div>

        </li>
    </>
)};