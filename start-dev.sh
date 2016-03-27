#!/bin/bash

{
    nodemon --watch api --watch config --watch views --watch app.js -e .js,.jade app.js
} || {

    echo 'please install nodemon'
}