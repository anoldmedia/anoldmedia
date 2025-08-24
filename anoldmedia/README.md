# ANOLDMEDIA — Online TV

A static website for ANOLDMEDIA: live streaming, shows listing, and daily schedule.

## Features
- Responsive layout and navigation
- Live page with HLS playback (using hls.js)
- Shows grid driven by `data/shows.json`
- Schedule table rendered from data
- PWA manifest + simple service worker for basic offline caching

## Structure
```
/anoldmedia
  index.html
  /assets
    /css/styles.css
    /js/main.js
    /js/player.js
    /images/logo.svg
  /pages
    live.html
    shows.html
    schedule.html
    about.html
    contact.html
  /data/shows.json
  manifest.webmanifest
  service-worker.js
```

## Development
Use any static server. Example with Python:
```bash
cd /workspace/anoldmedia
python3 -m http.server 8000
```
Then open `http://localhost:8000/index.html`.

For Live playback, replace the sample HLS URL in `pages/live.html` with your own stream.

## Deployment
Host the folder contents on any static host (Netlify, Vercel, GitHub Pages, S3/CloudFront, Nginx). If the site is not served at the domain root, update `manifest.webmanifest` `start_url` and `scope` accordingly.

## License
MIT