({
  handleClick: function(component, event, helper) {
    var source = event.getSource();
    var consoleid = source.get("v.id");
    var recordId = component.get("c.identityUser.Id");
    console.log("Id" + consoleid);
    console.log("recordId" + recordId);
    helper.navigate(component);
  },

  doInit: function(component, event, helper) {
    helper.onInit(component, event, helper);
  },

  signout: function(component, event, helper) {
    helper.onSignout(component, event, helper);
  }
});