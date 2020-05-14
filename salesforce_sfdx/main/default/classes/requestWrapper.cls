public class requestWrapper{
	public cls_attachment[] attachment;
    public String CaseId;
	public class cls_attachment {
		public String filename;	//Digital_GRS_Dashboard.pdf
		public Integer size;	//237819
		public String data;	//3227c3a3-cd4d-41e5-a350-88ab6fb6c199
	}
	public static requestWrapper parse(String json){
		return (requestWrapper) System.JSON.deserialize(json, requestWrapper.class);
	}
}