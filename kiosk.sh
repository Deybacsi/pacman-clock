#!/bin/bash

#chromium-browser --disable-web-security --user-data-dir="./temp" --kiosk "./index.html"

firefox -url "./index.html" & xdotool search --sync --onlyvisible --class "Firefox" windowactivate key F11