/*********************************************************************************************
*   Class: IMSCommunityHelper
*   Purpose: Helper class for methods used across IMS Community
*   
*   @ChangeLog
*   Date        User                 Description
*   2019-05-11  Kuldeep Chauhan      Initial Implementation
**********************************************************************************************/
global class IMSCommunityHelper implements vlocity_ins.VlocityOpenInterface {
public Boolean InvokeMethod(
    String methodName,
    Map<String,Object> input,
    Map<String,Object> output,
    Map<String,Object> options) {
    if (methodName=='getCurrentUserType') {
        
        // Delegated to another method or a helper class
        /*
        if(UserInfo.getName().containsIgnoreCase('GLH'))
            output.put('UserType','GLH');
        else if(UserInfo.getName().containsIgnoreCase('GRS'))
            output.put('UserType','GRS');
        else
            output.put('UserType','Combo');*/
        getCurrentUserType(output);
    }
    return Boolean.valueOf('TRUE');   
    }
    
    @AuraEnabled(cacheable=true)
    public static Map<String,Object> getCurrentUserType(Map<String,Object> output){
        
        if(output==NULL)
            output = new Map<String,Object>();
        if(UserInfo.getName().containsIgnoreCase('GLH'))
            output.put('UserType','GLH');
        else if(UserInfo.getName().containsIgnoreCase('GRS'))
            output.put('UserType','GRS');
        else
            output.put('UserType','Combo');
        return output;
    }
    
    @AuraEnabled(cacheable=true)
    public static Map<String, IMS_Menu__mdt> getMenuList() {
        String key = '';
        if(UserInfo.getName().containsIgnoreCase('GLH')){
            key = 'GLH';
        }else if(UserInfo.getName().containsIgnoreCase('GRS')){
            key = 'GRS';
        }else{
            key = 'Combo';
        }        
            
        List<IMS_Menu__mdt> lstMenu = [SELECT QualifiedApiName,Label,French_Label__c,MasterLabel,Menu_Order__c,Parent_Menu__c,submenu_count__c,url__c,UserType__c 
        FROM IMS_Menu__mdt WHERE UserType__c =: key];
        
        System.Debug('RRR ' + lstMenu);
        Map<String, IMS_Menu__mdt> menuHead = new Map<String, IMS_Menu__mdt>();
        //Map<String, IMS_Menu__mdt> menuSubHead = new Map<String, IMS_Menu__mdt>();
        List<mainMenu> mm = new List<mainMenu>();
        for(IMS_Menu__mdt tempJA : lstMenu){
            if(tempJA.Parent_Menu__c == 'HEAD'){         
                menuHead.put(tempJA.QualifiedApiName,tempJA);
            }else{
                menuHead.put(tempJA.Parent_Menu__c,tempJA);
            }            
        } 
		system.debug('@@@Map@@@'+menuHead); 
        return menuHead;
    } 

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [
            SELECT Id, Name, Title, Phone, Email
            FROM Contact
            WHERE Name != null
            WITH SECURITY_ENFORCED
            LIMIT 10
        ];
    }
    
    public class mainMenu { 
        public String title {get;set;} 
        public String url {get;set;} 
        public String icon {get;set;} 
        public Integer order {get;set;} 
        public String parentId {get;set;} 
        public Integer childCount {get;set;}
        public List<subMenu> children{get;set;}        
    } 
    
    public class subMenu { 
        public String title {get;set;} 
        public String url {get;set;} 
        public String icon {get;set;} 
        public Integer order {get;set;} 
        public String parentId {get;set;} 
        public Integer childCount {get;set;}      
    }    

}