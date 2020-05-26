import { LightningElement, api } from "lwc";
import { OmniscriptBaseMixin } from "vlocity_ins/omniscriptBaseMixin";
import tmpl from "./climsAttachmentValidationService.html";

export default class ClimsAttachmentValidationService extends OmniscriptBaseMixin( LightningElement) {

  listVIDs = "";
  validateAttachmentFlag = 0;

  @api checkValidity() {
    return true;
  }

  validateAttachmentFiles() {
    
    const CODE_VALIDATION_SUCCESS = 0;
    const CODE_VALIDATION_NO_FILES = 0; 
    const CODE_VALIDATION_ERROR_FILE_SIZE_MIN = 1;
    const CODE_VALIDATION_ERROR_FILE_SIZE_MAX = 2;
    const CODE_VALIDATION_ERROR_FILE_SIZE_TOTAL_MAX = 3;
    const CODE_VALIDATION_ERROR_FILE_NAME_EXTENSION = 4;
    const CODE_VALIDATION_ERROR_FILE_NAME_LENGTH = 5;
    const CODE_VALIDATION_ERROR_FILE_NAME_CHARS = 6;

    const FILE_SIZE_MIN = 1;
    const FILE_SIZE_MAX = 7*1024*1024;
    const FILE_SIZE_TOTAL_MAX = 28*1024*1024;

    const FILE_NAME_LENGTH_MAX = 200;

    let validFileExtentsionList = "JPG, JPEG, TIFF, PNG, BMP, PDF, GIF, DOC, DOCX, XLS, XLSX";
    let validFileNameCharsRegEx = new RegExp(/^([a-zA-Z0-9_\-\. ()ÀÂÆÇÉÈÊËÎÏÔŒÙÛÜŸàâæçéèêëîïôœùûüÿ]){5,}$/); 

    let index = 0;
    let totalFileSize = 0;

    let objFile = this.omniJsonData.StepForTypeNotCallCenter.File;

    this.listVIDs = "";

    if ((typeof objFile == "undefined") || (objFile.length == 0)) {
      return CODE_VALIDATION_NO_FILES;
    }

    // Need to build the list of ID's upfront
    for (index = 0; index < objFile.length; index++) {
      this.listVIDs = (this.listVIDs != "") ? (this.listVIDs + ",") : this.listVIDs;
      this.listVIDs += objFile[index].vId;
    }

    // Proceed with actual validation steps
    for (index = 0; index < objFile.length; index++) {
      if (objFile[index].size < FILE_SIZE_MIN) {
        return CODE_VALIDATION_ERROR_FILE_SIZE_MIN;
      }

      if (objFile[index].size > FILE_SIZE_MAX) {
        return CODE_VALIDATION_ERROR_FILE_SIZE_MAX;
      }

      totalFileSize += objFile[index].size;
      if (totalFileSize > FILE_SIZE_TOTAL_MAX) {
        return CODE_VALIDATION_ERROR_FILE_SIZE_TOTAL_MAX;
      }

      let fileName = objFile[index].filename;
      let fileExtension = fileName.split('.').pop();
      if (!validFileExtentsionList.includes(fileExtension.toUpperCase())) {
        return CODE_VALIDATION_ERROR_FILE_NAME_EXTENSION;
      }

      if (fileName.length > FILE_NAME_LENGTH_MAX) {
        return CODE_VALIDATION_ERROR_FILE_NAME_LENGTH;
      }
      
      if (!validFileNameCharsRegEx.test(fileName)) {
        return CODE_VALIDATION_ERROR_FILE_NAME_CHARS;
      }
    }

    return CODE_VALIDATION_SUCCESS;
  }

  connectedCallback() {

    let valueValidateAttachmentFlag = this.validateAttachmentFiles();

    console.log("validateAttachmentFlag: " + valueValidateAttachmentFlag);

    if (valueValidateAttachmentFlag > 0) {
      this.omniApplyCallResp({
        listVIDs : this.listVIDs,
        validateAttachmentFlag: valueValidateAttachmentFlag
      });
      this.omniPrevStep();
    }
    else {
      this.omniNextStep();
    }
 }

}