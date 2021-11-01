export default {


    // Google API
    google: {

        // base url string with API key
        base: 'https://youtube.googleapis.com/youtube/v3/search?key=AIzaSyCIlq-5vydLWLcPGzI4H3sGWm3YA3rCheI&part=snippet&maxResults=10&',

        // search by string
        string: 'q=',

        // search related to video ID
        related: 'type=video&relatedToVideoId=',
    },


    // PWA setings
    PWA: {
        name: 'yt play',
        short_name: 'yt play',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
            {
                src: '/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                src: '/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png'
            }
        ],
    },
};