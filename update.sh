#!/usr/bin/env bash
hugo
git add --all
git commit -a -m "update file"
git push origin source
git subtree push --prefix docs/ origin master