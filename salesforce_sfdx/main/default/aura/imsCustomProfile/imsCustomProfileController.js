({
  handleClick: function(component, event, helper) {
    var source = event.getSource();
    var consoleid = source.get("v.id");
    var recordId = component.get("c.identityUser.Id");
    console.log("Id" + consoleid);
    console.log("recordId" + recordId);
    helper.navigate(component);
  },

  handleMenuClick: function(component, event, helper) {
    component.set("v.menuOpen", false);
  },

  doInit: function(component, event, helper) {
    helper.onInit(component, event, helper);
  },

  signout: function(component, event, helper) {
    helper.onSignout(component, event, helper);
  },

  showOverlay: function(component, event, helper) {
    let headerBar = document.getElementById("ims-header-bar");
    headerBar.removeEventListener("click", helper.removeOverlay, true);
    let overlay = document.getElementById("ims-page-overlay");
    overlay.classList.add("is-visible");
    headerBar.addEventListener("click", helper.removeOverlay, true);

    document.removeEventListener("keydown", helper.checkForEscape, true);
    document.addEventListener("keydown", helper.checkForEscape);
  }
});