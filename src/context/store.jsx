import React, { createContext, useState, useEffect } from 'react';


/*  Component schema
/*   *   *   *   *   *   *   *   *   *   */

export const StoreContext = createContext( null );

export function StoreProvider({ children }) {


    // store global state
    const [ audio, setAudio ] = useState( new Audio( 'https://cdn01.ytjar.xyz/get.php/f/3e/J3YdO44YNBE.mp3?h=bC0UJPclE2LJKTE_CkSstA&s=1635894987&n=sanah-etc-na-disco-Official-video') );
    

    // store global object
    const storeValue = {

        audio, setAudio,    // state audio object
    };


    // store init
    useEffect(() => {

    }, []);

/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */

return(
    <>
    <StoreContext.Provider value={ storeValue }>

        { children }

    </StoreContext.Provider>
    </>
)};