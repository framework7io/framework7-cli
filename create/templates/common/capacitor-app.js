var capacitorApp = {
  f7: null,
  /*
  This method hides splashscreen after 2 seconds
  */
  handleSplashscreen: function() {
    var f7 = capacitorApp.f7;
    if (!window.Capacitor || f7.device.electron) return;
    setTimeout(() => {
      window.Capacitor.Plugins.SplashScreen.hide();
    }, 2000);
  },
  /*
  This method prevents back button tap to exit from app on android.
  In case there is an opened modal it will close that modal instead.
  In case there is a current view with navigation history, it will go back instead.
  */
  handleAndroidBackButton: function () {
    var f7 = capacitorApp.f7;
    const $ = f7.$;
    if (f7.device.electron || !window.Capacitor) return;

    window.Capacitor.Plugins.App.addListener('backButton', function () {
      if ($('.actions-modal.modal-in').length) {
        f7.actions.close('.actions-modal.modal-in');
        return;
      }
      if ($('.dialog.modal-in').length) {
        f7.dialog.close('.dialog.modal-in');
        return;
      }
      if ($('.sheet-modal.modal-in').length) {
        f7.sheet.close('.sheet-modal.modal-in');
        return;
      }
      if ($('.popover.modal-in').length) {
        f7.popover.close('.popover.modal-in');
        return;
      }
      if ($('.popup.modal-in').length) {
        if ($('.popup.modal-in>.view').length) {
          const currentView = f7.views.get('.popup.modal-in>.view');
          if (currentView && currentView.router && currentView.router.history.length > 1) {
            currentView.router.back();
            return;
          }
        }
        f7.popup.close('.popup.modal-in');
        return;
      }
      if ($('.login-screen.modal-in').length) {
        f7.loginScreen.close('.login-screen.modal-in');
        return;
      }

      if ($('.page-current .searchbar-enabled').length) {
        f7.searchbar.disable('.page-current .searchbar-enabled');
        return;
      }

      if ($('.page-current .card-expandable.card-opened').length) {
        f7.card.close('.page-current .card-expandable.card-opened');
        return;
      }

      const currentView = f7.views.current;
      if (currentView && currentView.router && currentView.router.history.length > 1) {
        currentView.router.back();
        return;
      }

      if ($('.panel.panel-in').length) {
        f7.panel.close('.panel.panel-in');
        return;
      }
    }, false);
  },
  /*
  This method does the following:
    - provides cross-platform view "shrinking" on keyboard open/close
    - hides keyboard accessory bar for all inputs except where it required
  */
  handleKeyboard: function () {
    var f7 = capacitorApp.f7;
    if (!window.Capacitor) return;
    var $ = f7.$;
    var Keyboard = window.Capacitor.Plugins.Keyboard;
    if (!Keyboard) return;
    Keyboard.setResizeMode({mode: 'native'});
    Keyboard.setScroll({isDisabled: true});
    Keyboard.setAccessoryBarVisible({isVisible: false});
    window.addEventListener('keyboardWillShow', () => {
      f7.input.scrollIntoView(document.activeElement, 0, true, true);
    });
    window.addEventListener('keyboardDidShow', () => {
      f7.input.scrollIntoView(document.activeElement, 0, true, true);
    });
    window.addEventListener('keyboardDidHide', () => {
      if (document.activeElement && $(document.activeElement).parents('.messagebar').length) {
        return;
      }
      Keyboard.setAccessoryBarVisible({isVisible: true});
    });

    $(document).on('touchstart', 'input, textarea, select', function (e) {
      var nodeName = e.target.nodeName.toLowerCase();
      var type = e.target.type;
      var showForTypes = ['datetime-local', 'time', 'date', 'datetime'];
      if (nodeName === 'select' || showForTypes.indexOf(type) >= 0) {
        Keyboard.setAccessoryBarVisible({isVisible: true});
      } else {
        Keyboard.setAccessoryBarVisible({isVisible: false});
      }
    }, true);
  },
  init: function (f7) {
    // Save f7 instance
    capacitorApp.f7 = f7;

    // Handle Android back button
    capacitorApp.handleAndroidBackButton();

    // Handle Splash Screen
    capacitorApp.handleSplashscreen();

    // Handle Keyboard
    capacitorApp.handleKeyboard();
  },
};
