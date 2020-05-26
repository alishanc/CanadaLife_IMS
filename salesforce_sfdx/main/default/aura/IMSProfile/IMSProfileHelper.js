({	
    // Constants listed here -- to be used in the helper
    constants : {
        TOAST_ERROR_TYPE : "error",
        SUCCESS_STATE : "SUCCESS",
        ERROR_STATE : "ERROR"
    },
    
    // Called when the component is initialized
    onInit : function(component, event, helper) {
        
        // Attempt to retrieve the identity user
        var getIdentityUserAction = component.get("c.getIdentityUser");
        getIdentityUserAction.setParams({
            currentRecordId : component.get("v.recordId")
        });
        getIdentityUserAction.setCallback(this, function(response) {
            var state = response.getState();
            
            if(state === this.constants.SUCCESS_STATE) {
                var returnData = response.getReturnValue();
                component.set("v.identityUser", returnData);
                this.updateUserStatus(component);
            }
            else if(state === this.constants.ERROR_STATE) {
                this.showToastMessage(this.constants.TOAST_ERROR_TYPE, response.getError()[0].message);
            }
        });
        $A.enqueueAction(getIdentityUserAction);
        
    },
    
    // Generate a toast message with a given type and message
    showToastMessage : function(toastType, toastMessage) {
        var showToast = $A.get("e.force:showToast");
        showToast.setParams({
            "message" : toastMessage,
            "type" : toastType
        });
        showToast.fire();
    },
})