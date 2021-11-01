import React from 'react';
import ReactDOM from 'react-dom';

// local components
import App from '@/app';

// stylesheets
import '@/style/main.scss';


/*  Final render
/*   *   *   *   *   *   *   *   *   *   */

ReactDOM.render(

    // renders whole app
    <React.StrictMode>
        <App />
    </React.StrictMode>,

    // render DOM target
    document.getElementById( 'root' )
);