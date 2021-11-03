export default {


    // Google API
    google: {

        // base url string with API key
        base: 'https://youtube.googleapis.com/youtube/v3/search?key=AIzaSyCIlq-5vydLWLcPGzI4H3sGWm3YA3rCheI&part=snippet&type=video&',

        // search by string
        string: 'maxResults=5&q=',

        // search related to video ID
        related: 'maxResults=1&relatedToVideoId=',
    },

    ytmp3: {

        // base url string with API key
        base: 'https://youtube-mp36.p.rapidapi.com/dl?id=',

        // required headers
        headers: {
            'x-rapidapi-key': '1b0dbbddf1mshd3b40f307c84bb8p1ce739jsnd4c8e2a3e284',
            'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com',
        },
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