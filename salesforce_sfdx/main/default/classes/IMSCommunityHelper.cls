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
    public static List<IMS_Menu__mdt> getMenuList() {
        String key = '';
        if(UserInfo.getName().containsIgnoreCase('GLH')){
            key = 'GLH';
        }else if(UserInfo.getName().containsIgnoreCase('GRS')){
            key = 'GRS';
        }else{
            key = 'Combo';
        }        
        return  [SELECT QualifiedApiName,Label,French_Label__c,MasterLabel,Menu_Order__c,Parent_Menu__c,submenu_count__c,url__c,UserType__c 
                 FROM IMS_Menu__mdt 
                 WHERE UserType__c =: key]; 
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
        public String id {get;set;} 
        //public String title {get;set;} 
        //public String url {get;set;} 
        //public String icon {get;set;} 
        //public Decimal order {get;set;} 
        public String parentId {get;set;} 
        public Decimal childCount {get;set;}
        public List<subMenu> children{get;set;}        
    } 
    
    public class subMenu { 
        public String id {get;set;} 
        //public String title {get;set;} 
        //public String url {get;set;} 
        //public String icon {get;set;} 
        //public Decimal order {get;set;} 
        public String parentId {get;set;} 
        public Decimal childCount {get;set;}     
    }
    
    public class keyVal{
        public String key {get;set;} 
    }
    
    @AuraEnabled(cacheable=true)
    public static String getMenuList1() {
        String key = '';
        if(UserInfo.getName().containsIgnoreCase('GLH')){
            key = 'GLH';
        }else if(UserInfo.getName().containsIgnoreCase('GRS')){
            key = 'GRS';
        }else{
            key = 'Combo';
        }        
        
        //List<IMS_Menu__mdt> lstMenu = [SELECT QualifiedApiName,Label,Menu_Order__c,Parent_Menu__c FROM IMS_Menu__mdt WHERE UserType__c = 'GLH' ORDER BY Menu_Order__c ASC];
        List<IMS_Menu__mdt> lstMenu = [SELECT Menu_Order__c,QualifiedApiName,Parent_Menu__c,submenu_count__c FROM IMS_Menu__mdt WHERE UserType__c = 'GLH' ORDER BY Menu_Order__c ASC ];
        
        Map<String, mainMenu> menu = new Map<String, mainMenu>();
        List<subMenu> smLst = new List<subMenu>();
        
        for(IMS_Menu__mdt tempMM : lstMenu){            
            mainMenu mm = new mainMenu();
            system.debug('@@tempMM@@'+tempMM);
            if(tempMM.Parent_Menu__c == 'HEAD'){                
                mm.id = tempMM.QualifiedApiName; 
                mm.parentId = tempMM.Parent_Menu__c;   
                mm.childCount = tempMM.submenu_count__c;
                mm.children = null;  
                menu.put(tempMM.QualifiedApiName, mm);
                system.debug('@@sbMnu Inside@@'+smLst);
                smLst.clear();
            }else{
                subMenu sm = new subMenu();
                if(menu.ContainsKey(tempMM.Parent_Menu__c)){  //All child will check parent exists in a map
                    mainMenu mainParent = menu.get(tempMM.Parent_Menu__c);  //get the parent value 
                    system.debug('@@mainParent@@'+mainParent); system.debug('@@sbMnu Else@@'+smLst);                    
                    if(tempMM.Parent_Menu__c == mainParent.id){  //check parent & child parent keys are matched 
                        sm.id = tempMM.QualifiedApiName; 
                        sm.parentId = tempMM.Parent_Menu__c; 
                        sm.childCount = tempMM.submenu_count__c;
                        smLst.add(sm);                         
                        mainParent.children = smLst;
                        menu.put(mainParent.parentId, mainParent);
                    }    
                }
            }            
        }              
        
        string jsonstring = JSON.serialize(menu);
        //system.debug('@@@Map@@@'+jsonstring); 
        return jsonstring;
    } 
    
}