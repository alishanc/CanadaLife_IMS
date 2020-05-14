public class ClImsFileToCaseAssociationWrapper {
	public cls_attachment[] attachment;
    public String CaseId;
	public class cls_attachment {
		public String filename;	
		public Integer size;	
		public String data;	
	}
	public static ClImsFileToCaseAssociationWrapper parse(String json){
		return (ClImsFileToCaseAssociationWrapper) System.JSON.deserialize(json, ClImsFileToCaseAssociationWrapper.class);
	}    

}