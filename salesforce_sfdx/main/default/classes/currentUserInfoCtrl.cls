public with sharing class currentUserInfoCtrl {
   @AuraEnabled 
    public static user fetchUser(){
     // query current user information  
      User oUser = [select id,Name,TimeZoneSidKey,Username,Alias,Country,Email,FirstName,LastName,IsActive,IsPortalEnabled 
                 FROM User Where id =: userInfo.getUserId()];
        return oUser;
    }
    
    @auraEnabled
    public static List<IMS_English_Menu__c> fetchUserProfileMenu(){        
        List<IMS_English_Menu__c> Profilemenu =  [SELECT Menu_Order__c, Menu_Label__c, Menu_URL__c FROM IMS_English_Menu__c WHERE Menu_Type__c='Profile' ORDER BY Menu_Order__c];
		//inputs.add('Account Info', 'identity/s/settings/'+userInfo.getUserId());
        /*if(){
            
        }else if(){
            
        }*/        
        return Profilemenu;
    }
}