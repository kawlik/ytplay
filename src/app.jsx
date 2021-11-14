import React from 'react';

// context
import { StoreProvider } from '@/context/store';

// local components
import Search from '@/components/search';
import View from '@/components/view';
import Play from '@/components/play';


/*  Component schema
/*   *   *   *   *   *   *   *   *   *   */

export default function App() {


/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */

return(
    <>
        <StoreProvider>

            <Search />

            <View />

            <Play />

        </StoreProvider>
    </>
)};