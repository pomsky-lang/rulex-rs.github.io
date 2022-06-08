build:
  cd rulex-play && wasm-pack build --target web

  npm ci
  npm run build

  rm -rf ../rulex-rs-public
  mv public ../rulex-rs-public

  git stash
  git checkout gh-pages

  rm -rf ./**
  rm -rf .nojekyll

  mv ../rulex-rs-public/* .
  rm -rf ../rulex-rs-public

  touch .nojekyll
  rm -rf .gitignore
  rm -rf contributors fonts videos
  rm -rf doks.svg logo-doks.svg logo-doks.png doks.png README.md
  rm -rf node_modules rulex-play .hugo_build.lock

  git add .
