#!/bin/bash

#take in the argument as a folder name
if [ -z "$1" ]
  then
    echo "Please provide a name for your project folder."
    exit 1
fi

#setup the directories
mkdir "$1"
mkdir "$1"/assets
mkdir "$1"/src
mkdir "$1/builds"

#create a configuration.json file and save some project details into it.
echo '{"name": "'"$1"'", "build_path": "./builds"}' > "$1/configuration.json"