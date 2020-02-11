#!/usr/bin/env bash
git add --all
git commit -a -m "update file"
hugo
git push origin source
git subtree push --prefix docs/ origin master