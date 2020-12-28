# install hugo
https://gohugo.io/getting-started/installing/
## Windows
### install with scoop
install scoop by PowerShell Prompt
```
PS: Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
PS: iwr -useb get.scoop.sh | iex
```
and install hugo
```
scoop install hugo
```

## Mac
If you are on macOS and using Homebrew, you can install Hugo with the following one-liner:
```
brew install hugo
```

# if want to update
```angular2
git add --all
git commit
git push origin source
git subtree push --prefix docs/ origin master
```