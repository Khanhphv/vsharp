#!/bin/bash

# Create icons directory if it doesn't exist
mkdir -p public/icons

# Download the favicon
echo "Downloading favicon from vsharp.net..."
curl -o public/favicon.ico https://www.vsharp.net/favicon.ico

echo "
To generate all required icons, please follow these steps:

1. Visit https://realfavicongenerator.net/
2. Upload the favicon.ico file from your public directory
3. Configure the following settings:
   - iOS: Enable 'Apple Touch Icon'
   - Android: Enable 'Android Chrome Icons'
   - Safari: Enable 'Safari Pinned Tab'
   - Windows: Enable 'Windows Tiles'
   - Theme Color: #000000
   - Background Color: #000000

4. Click 'Generate your Favicons and HTML code'
5. Download the package
6. Extract the contents and copy all files from the 'favicons' directory to your 'public/icons' directory

Required files to copy:
- favicon-16x16.png
- favicon-32x32.png
- apple-touch-icon.png
- android-chrome-192x192.png
- android-chrome-512x512.png
- safari-pinned-tab.svg

After copying the files, your website will have complete favicon support for all platforms!
" 