global without sharing class ClImsFileToCaseAssociation implements vlocity_ins.VlocityOpenInterface
{
    
    global ClImsFileToCaseAssociation() {
        system.debug('***');
    }
    
    global Boolean invokeMethod(String methodName, Map<String,Object> inputMap, Map<String,Object> outMap, Map<String,Object> options) {
        
        Boolean result = true;
        
        try{
            
            if(methodName.equals('AssociateFiles')){
                
                String JSONString = JSON.serialize(inputMap);
                System.debug('Serialized list of input into JSON format: ' + JSON.serialize(inputMap));
                ClImsFileToCaseAssociationWrapper obj = ClImsFileToCaseAssociationWrapper.parse(JSONString);
                
                System.debug('Serialized list of attachment in JON format: ' + obj.attachment);
                
                for(ClImsFileToCaseAssociationWrapper.cls_attachment att : obj.attachment ){
                    if(!String.isEmpty(obj.CaseId) && !String.isEmpty(att.data))
                        associateFileToCase(obj.CaseId, att.data); 
                }
                
                
                // outMap.put('APEXResponse',obj);
                outMap.put('APEXProcessedCase',obj.CaseId);
                outMap.put('APEXProcesStatus','Succcss');
                System.debug('Case Id ' + obj.CaseId);
                
                //added for testing
           //     callIntegrationProcedure(obj.CaseId);
                
            }
            
            
        } catch(Exception e){
            system.debug(e);
            result = false;
            
        }
        
        return result;
        
    }
    
    public static void associateFileToCase(ID caseId, ID contentDocId){
        ContentDocumentLink conDocLink = New ContentDocumentLink();
        conDocLink.LinkedEntityId = caseId; 
        conDocLink.ContentDocumentId = contentDocId;  //ContentDocumentId Id from ContentVersion
        conDocLink.shareType = 'V';
        insert conDocLink;  
        System.debug('Success file association');
        
    }
    
    public static void callIntegrationProcedure(String caseId){
        /* Initialize variables */
        String procedureName = 'climsContactUs_ContactUsSendEmails';
        Map<String, Object> ipInput = new Map<String, Object> ();
        Map<String, Object> ipOutput = new Map<String, Object> ();
        Map<String, Object> ipOptions = new Map<String, Object> ();
        
        /* Populating input map for an Integration Procedure. 
		Follow whatever structure your VIP expects */
      //  String caseId = '5004g0000036a1PAAQ';
        ipInput.put('caseId', caseId);
        
        /* Call the IP via runIntegrationService, 
			and save the output to ipOutput */
        ipOutput = (Map<String, Object>) vlocity_ins.IntegrationProcedureService.runIntegrationService(procedureName, ipInput, ipOptions);
        
        System.debug('IP Output: ' + ipOutput);        
        
    }
    
}