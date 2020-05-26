import { LightningElement } from 'lwc';
import { BaseState } from "vlocity_ins/baseState";
import { fetchCustomLabels } from "vlocity_ins/utility";
import template from "./phoneUs.html";

export default class phoneUs extends BaseState(LightningElement) {

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

        this.getCustomLabels();
    }

    // Expose the labels to use in the template.
    getCustomLabels() {
        console.log("inside getCustomLabels");

        fetchCustomLabels(
            ["IMS_CALL_US", "IMS_ISSUES_WITH_WEBSITE", "IMS_GENERAL_INQUIRIES", "IMS_BENEFITS", "IMS_SAVINGS"],
            this.lang,
            ["Call us", "For issues with this website:", "For general inquiries:", "Benefits", "Savings"])
            .then(data => {
                this.labels = data;
            })
            .catch(error => console.error(error));
    };

    render() {
        return template;
    }
}