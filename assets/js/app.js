if ('compileRulex' in window) {
  initPlayground()
} else {
  window.addEventListener('rulex-initialized', initPlayground)
}

function initPlayground() {}
