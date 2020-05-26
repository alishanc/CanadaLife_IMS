import { LightningElement,wire,api} from 'lwc';
import {loadStyle } from 'lightning/platformResourceLoader';
import newportNest from '@salesforce/resourceUrl/newportNest';
import getCurrentUserType from "@salesforce/apex/IMSCommunityHelper.getCurrentUserType";
import header from '@salesforce/label/c.IMS_CONTACTUS_HEADER';
import comboHeaderMessage1 from '@salesforce/label/c.IMS_CONTACTUS_HEADER_COMBO_MSG1';
import comboHeaderMessage2 from '@salesforce/label/c.IMS_CONTACTUS_HEADER_COMBO_MSG2';
import comboHeaderMessage3 from '@salesforce/label/c.IMS_CONTACTUS_HEADER_COMBO_MSG3';
import comboHeaderMessage4 from '@salesforce/label/c.IMS_CONTACTUS_HEADER_COMBO_MSG4';
import comboHeaderMessage5 from '@salesforce/label/c.IMS_CONTACTUS_HEADER_COMBO_MSG5';
import grsglhHeaderMessage1 from '@salesforce/label/c.IMS_CONTACTUS_HEADER_GRS_GLH_MSG1';
import grsglhHeaderMessage2 from '@salesforce/label/c.IMS_CONTACTUS_HEADER_GRS_GLH_MSG2';
import grsglhHeaderMessage3 from '@salesforce/label/c.IMS_CONTACTUS_HEADER_GRS_GLH_MSG3';
import or from '@salesforce/label/c.IMS_OR';
import makeClaim from '@salesforce/label/c.IMS_MAKE_A_CLAIM';




export default class ImsContactUsHeader extends LightningElement {
   @api title;
    userType;
    error;
    isCombo = false;

    label = {
        header,
        comboHeaderMessage1,
        comboHeaderMessage2,
        comboHeaderMessage3,
        comboHeaderMessage4,
        comboHeaderMessage5,
        grsglhHeaderMessage1,
        grsglhHeaderMessage2,
        grsglhHeaderMessage3,
        or,
        makeClaim,

    };

    @wire(getCurrentUserType) 
    wiredUser({ error, data }) {
        if (data) {
            this.userType = data;
            this.error = undefined;
            this.isCombo = this.userType.UserType === 'Combo';
        } else if (error) {
            this.error = error;
            this.userType = undefined;
        }
    }

    connectedCallback() {
        Promise.all([
            loadStyle(this, newportNest + '/assets/styles/vlocity-newport-design-system.min.css')
        ])
            .then(() => {
                console.log('scripts loaded');
            })
            .catch((error) => {
                console.log('scripts loading failed');
            });
    }

}