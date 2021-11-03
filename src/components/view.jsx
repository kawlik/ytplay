import React, { useContext } from 'react';

// store context
import { StoreContext } from '../context/store';


/*  Component schema
/*   *   *   *   *   *   *   *   *   *   */

export default function View() {

    // global state
    const { state, dispatchState } = useContext( StoreContext );


/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */

return(
    <>
        <section className='view' style={{ backgroundImage: `url( ${ state.next[0] ? state.next[0].img : '' }` }}>
            
            <div className='backdrop'></div>

        </section>
    </>
)};