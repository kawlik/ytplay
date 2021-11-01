import React from 'react';

// local modules
import Song from '@/components/view/song';
import Add from '@/components/view/add';


/*  Component schema
/*   *   *   *   *   *   *   *   *   *   */

export default function View() {

    

/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */

return(
    <>
        <section className='view' style={{ backgroundImage: '' }}>
            
            <div className='backdrop'>

                <Song target='Teraz' />

                <Add />

            </div>

        </section>
    </>
)};