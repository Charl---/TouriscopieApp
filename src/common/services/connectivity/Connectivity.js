class Connectivity {
  constructor($window) {
    this.$window = $window;
    this.hasNetwork = this.$window.navigator.onLine;
  }

  init() {
    this.$window.document.addEventListener('online', this.isOnline, false);
    this.$window.document.addEventListener('online', this.isOffline, false);
  }

  isOnline() {
    this.hasNetwork = true;
  }

  isOffline() {
    this.hasNetwork = false;
  }
}

export default Connectivity;
