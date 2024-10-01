#!/bin/bash

echo "⪧ Build image ..."
docker build -t custom-ide-language-server:cpp-clangd .

if [ $? -ne 0 ]; then
    echo "⚠️ Build fail!"
    exit 1
fi

echo "✅ Build success"

