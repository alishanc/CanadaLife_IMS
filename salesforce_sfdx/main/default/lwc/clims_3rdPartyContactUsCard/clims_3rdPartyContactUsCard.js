import { LightningElement, api } from 'lwc';
import { BaseState } from "vlocity_ins/baseState";
import template from "./clims_3rdPartyContactUsCard.html";
import { fetchCustomLabels } from "vlocity_ins/utility";
import { load as loadNewport } from 'vlocity_ins/newportLoader';

export default class iconCard extends BaseState(LightningElement) {

    @api cardType = '';
    lang = "en-CA";
    labels = {};
    health = {};
    wealth = {};
    hrefvalue = '';

    connectedCallback() {
        loadNewport(this).then();

        this.health = this.obj.data.health;
        this.wealth = this.obj.data.wealth;

        if (this.obj.user && this.obj.user.language) {
            this.lang = this.obj.user.language;
        }
        console.log("Language of the user is: " + this.lang);
        
        this.hrefvalue = this.health.emailurl;
        console.log("href value " + this.hrefvalue);

        this.getCustomLabels();
    }

    // Expose the labels to use in the template.
    getCustomLabels() {
      
   
            fetchCustomLabels(
                ["IMS_CALL_US","IMS_SEND_CLAIMS_TO","IMS_EMAIL_US"],
                this.lang,
                ["Call us","Send claims to","Email us"])
                .then(data => {
                    this.labels = data;
                })
                .catch(error => console.error(error));
      

        // if(this.obj.card.type === 'mail'){
        //     fetchCustomLabels(
        //         ["IMS_SEND_CLAIMS_TO"],
        //         this.lang,
        //         ["Send claims to"])
        //         .then(data => {
        //             this.labels = data;
        //         })
        //         .catch(error => console.error(error));
        // }

        // if(this.obj.card.type === 'email'){
        //     fetchCustomLabels(
        //         ["IMS_EMAIL_US"],
        //         this.lang,
        //         ["Email us"])
        //         .then(data => {
        //             this.labels = data;
        //         })
        //         .catch(error => console.error(error));
        // }
        
    };
    
    render() {
        return template;
        
    }
}