import { LightningElement } from 'lwc';
import { BaseState } from "vlocity_ins/baseState";
import { fetchCustomLabels } from "vlocity_ins/utility";

import template from "./mailUs.html";

export default class mailUs extends BaseState(LightningElement) {

    lang = "en_US";
    labels = {};
    health = {};
    wealth = {}

    connectedCallback() {
        this.health = this.obj.data.health;
        this.wealth = this.obj.data.wealth;

        if (this.obj.user && this.obj.user.language) {
            this.lang = this.obj.user.language;
        }

        console.log("Users language is: " + this.lang);
        this.getCustomLabels();
    }

    isEquivalent(a, b) {
        // Create arrays of property names
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);
    
        // If number of properties is different,
        // objects are not equivalent
        if (aProps.length != bProps.length) {
            return false;
        }
    
        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];
    
            // If values of same property are not equal,
            // objects are not equivalent
            if (a[propName] !== b[propName]) {
                return false;
            }
        }
    
        // If we made it this far, objects
        // are considered equivalent
        return true;
    }

    // Expose the labels to use in the template.
    getCustomLabels() {

        let emptyData = {
                IMS_SAVINGS: "IMS_SAVINGS", 
                IMS_BENEFITS: "IMS_BENEFITS", 
                IMS_MAIL_US: "IMS_MAIL_US"
            };

        fetchCustomLabels(
            ["IMS_MAIL_US", "IMS_BENEFITS", "IMS_SAVINGS"],
            this.lang,
            ["Mail us", "Benefits", "Savings"])
            .then(data => {
                this.labels = data;
                console.log(data);
                if(this.isEquivalent(data,emptyData)){
                    this.labels = {
                        IMS_SAVINGS: "Savings", 
                        IMS_BENEFITS: "Benefits", 
                        IMS_MAIL_US: "Mail us"
                    }
                }
            })
            .catch(error => console.error(error));
    };

    render() {
        return template;
    }
}