#!/bin/bash

mkdir -p .ssh
ssh-keygen -t rsa -b 4096 -m PEM -f .ssh/jwtRS256.key -q -N ""
openssl rsa -in .ssh/jwtRS256.key -pubout -outform PEM -out .ssh/jwtRS256.key.pub
