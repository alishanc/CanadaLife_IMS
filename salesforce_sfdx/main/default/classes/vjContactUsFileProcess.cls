global with sharing class vjContactUsFileProcess implements vlocity_ins.VlocityOpenInterface
{
    
    global vjContactUsFileProcess() {
        system.debug('***');
    }
    
    global Boolean invokeMethod(String methodName, Map<String,Object> inputMap, Map<String,Object> outMap, Map<String,Object> options) {
        
        Boolean result = true;
        
        try{
            
            if(methodName.equals('AssociateFile')){

                String JSONString = JSON.serialize(inputMap);
                System.debug('Serialized list of input into JSON format: ' + JSON.serialize(inputMap));
                requestWrapper obj = requestWrapper.parse(JSONString);
                
                System.debug('Serialized list of attachment in JON format: ' + obj.attachment);
                
                for(requestWrapper.cls_attachment att : obj.attachment ){
                    if(!String.isEmpty(obj.CaseId) && !String.isEmpty(att.data))
                        associateFileToCase(obj.CaseId, att.data); 
                }
               
                              
 //               outMap.put('APEXResponse',obj);
                outMap.put('APEXProcessedCase',obj.CaseId);
                outMap.put('APEXProcesStatus','Succcss');
                System.debug('Case Id ' + obj.CaseId);
                           
            }
                                      
            
        } catch(Exception e){
            system.debug('hi');
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
    
}