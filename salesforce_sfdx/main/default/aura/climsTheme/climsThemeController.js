({
  handleMenuClick: function(component, event, helper) {
    console.log("Menu clicked");
    let source = event.getSource();
    let name = source.get("v.name");
    let theme = document.getElementById("ims-theme");
    if (name == "open") {
      theme.classList.remove("is-menu-closed");
      theme.classList.add("is-menu-open");

      let overlay = document.getElementById("ims-page-overlay");
      overlay.classList.remove("is-visible");
    } else {
      theme.classList.remove("is-menu-open");
      theme.classList.add("is-menu-closed");
    }

    component.set("v.currentUrl", window.location.pathname);
  }
});