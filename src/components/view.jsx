import React, { useContext, useEffect } from 'react';

// store context
import { StoreContext } from '../context/store';


/*  Component schema
/*   *   *   *   *   *   *   *   *   *   */

export default function View() {

    // global state
    const { state } = useContext( StoreContext );

    // body bg change
    useEffect(() => {

        document.querySelector( 'body' ).style.backgroundImage = `url( ${ state.next[0] ? state.next[0].img : '' } )`;
    });

/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */

return(
    <>
        <section className='view' style={{ backgroundImage: `url( ${ state.next[0] ? state.next[0].img : '' } )` }}>
            
        </section>
    </>
)};