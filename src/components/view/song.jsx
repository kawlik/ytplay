import React from 'react';

// icons
import CloseIcon from '@mui/icons-material/Close';


/*  Component schema
/*   *   *   *   *   *   *   *   *   *   */

export default function Song({ target }) {


/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */

return(
    <>
        <div className='option song'>

            <h3>{ target }</h3>

            <button className='action'><CloseIcon /></button>

            <p className='title'>sanah – etc. (na disco) (Official video)</p>
            
            <p className='author'>Sanah</p>

        </div>
    </>
)};