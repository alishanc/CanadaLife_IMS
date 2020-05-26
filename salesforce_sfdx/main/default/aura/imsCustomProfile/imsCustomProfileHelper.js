({
  // Constants listed here -- to be used in the helper
  constants: {
    TOAST_ERROR_TYPE: "error",
    SUCCESS_STATE: "SUCCESS",
    ERROR_STATE: "ERROR"
  },

  // Called when the component is initialized
  onInit: function(component, event, helper) {
    // Attempt to retrieve the identity user
    var getIdentityUserAction = component.get("c.fetchUser");
    getIdentityUserAction.setCallback(this, function(response) {
      var state = response.getState();

      if (state === this.constants.SUCCESS_STATE) {
        var returnData = response.getReturnValue();
        component.set("v.identityUser", returnData);
        component.set(
          "v.initials",
          returnData.FirstName.charAt(0) + returnData.LastName.charAt(0)
        );
      } else if (state === this.constants.ERROR_STATE) {
        this.showToastMessage(
          this.constants.TOAST_ERROR_TYPE,
          response.getError()[0].message
        );
      }
    });
    $A.enqueueAction(getIdentityUserAction);

    document.addEventListener("DOMContentLoaded", function(event) {
      let headerBar = document.getElementById("ims-header-bar");
      let overlay = document.getElementById("ims-page-overlay");
      let navigation = document.getElementById("ims-navigation");
      overlay.addEventListener("click", helper.closeMenu, true);
      headerBar.addEventListener("click", helper.removeOverlay, true);
      headerBar.addEventListener("click", helper.closeMenu, true);
      navigation.addEventListener("click", helper.removeOverlay, true);
    });
  },

  // Generate a toast message with a given type and message
  showToastMessage: function(toastType, toastMessage) {
    var showToast = $A.get("e.force:showToast");
    showToast.setParams({
      message: toastMessage,
      type: toastType
    });
    showToast.fire();
  },

  onSignout: function(component, event) {
    var href =
      "https://vlocity1-lifeco.cs142.force.com/secur/logout.jsp?retUrl=https://vlocity1-lifeco.cs142.force.com/identity/s";
    var urlEvent = $A.get("e.force:navigateToURL");
    urlEvent.setParams({
      url: href,
      isredirect: true
    });
    urlEvent.fire();
  },

  closeMenu: function() {
    document.getElementById("ims-page-overlay").classList.remove("is-visible");
    let theme = document.getElementById("ims-theme");
    theme.classList.remove("is-menu-open");
    theme.classList.add("is-menu-closed");
  },

  removeOverlay: function() {
    document.getElementById("ims-page-overlay").classList.remove("is-visible");
  },

  checkForEscape: function(event) {
    const key = event.key;
    if (key === "Escape") {
      document
        .getElementById("ims-page-overlay")
        .classList.remove("is-visible");
    }
  }
});