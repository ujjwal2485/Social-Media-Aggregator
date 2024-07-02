#!/bin/sh

hash=`git rev-parse --short=10 HEAD`
docker build -t zacanger/loonaverse.co:$hash .
