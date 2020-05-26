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

  navigate: function(component, event) {
    var consoleid = event.getSource().get("v.id");
    var recordId = component.get("c.identityUser.Id");
    console.log("Id" + consoleid);
    console.log("recordId" + recordId);
    if (consoleid == "profilesummery") {
      var address = "/s/detail/" + recordId;
    } else if (consoleid == "accountinfo") {
      var address = "/s/profile/" + recordId;
    } else if (consoleid == "personalinfo") {
      var address = "/s/settings/" + recordId;
    } else if (consoleid == "changepassword") {
      var address = "/s/settings/" + recordId;
    } else if (consoleid == "contactus") {
      var address = "/s/contactus/";
    }

    var urlEvent = $A.get("e.force:navigateToURL");
    urlEvent.setParams({
      url: address,
      isredirect: false
    });
    urlEvent.fire();
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
  }
});