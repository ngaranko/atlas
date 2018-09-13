function checkBootstrapAngular() {
  if (window.allowAngularToBootstrap) {
    window.allowAngularToBootstrap = false;
    angular.bootstrap(document, ['atlas']);
  }
}
document.body.addEventListener('bootstrapAngular', checkBootstrapAngular);
checkBootstrapAngular();
