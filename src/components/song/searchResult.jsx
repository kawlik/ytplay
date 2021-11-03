import React from 'react';
import axios from 'axios';

// global config
import config from '@/config/config';

// icons
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';



/*  Component schema
/*   *   *   *   *   *   *   *   *   *   */

export default function SearchResult({ raw, action, delay }) {

    // rewrite srwa data tosong object
    const song = {

        // god values
        id: raw.id.videoId,
        src: null,

        // base values
        img: decodeURIComponent( raw?.snippet?.thumbnails?.high?.url ),
        title: decode( raw?.snippet?.title ),
        author: decode( raw?.snippet?.channelTitle ),
    };


    // fetch mp3 url
    async function getMP3( id ) {

        // try to make api call
        try {

            // create proper url
            const url = new URL( config.ytmp3.base + song.id );

            // await for server response
            const response = await axios.get( url, {
                headers: config.ytmp3.headers,
            });

            // test if success
            const src = response?.data?.link ? response.data.link : null;

            if( src ) {
                
                // updates song values
                song.src = src;
            }

        } catch( err ) {

            // show error in console
            console.error( err );

        }


    };

/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */

return(
    <>
        <li className='search-result' style={{
            animationDelay: `${ 0.1 * delay }s`,
            animationPlayState: 'runing',
        }}>

            <img className='img' src={ song.img } alt={ song.author }/>

            <div className='info'>

                <p><span className='title'>{ song.title }</span></p>

                <p><span className='author'>{ song.author }</span></p>

            </div>

            <button className='action' onClick={ () => getMP3( song.id ) }>
                <PlaylistAddIcon />
            </button>

        </li>
    </>
)};


/*  Utility functions
/*   *   *   *   *   *   *   *   *   *   */

function decode( data ) {
    return decodeURIComponent( data?.replace( /\&[\S]{0,8}\:/g, '' ));
};