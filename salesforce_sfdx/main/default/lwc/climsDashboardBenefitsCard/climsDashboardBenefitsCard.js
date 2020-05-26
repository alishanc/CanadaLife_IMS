import { LightningElement, api } from 'lwc';
import { BaseState } from "vlocity_ins/baseState";
import template from "./climsDashboardBenefitsCard.html";
import { fetchCustomLabels } from "vlocity_ins/utility";
import { load as loadNewport } from 'vlocity_ins/newportLoader';

export default class ClimsDashboardBenefitsCard extends BaseState(LightningElement) {

    userLanguage = "en-CA";
    isBenefitWaived = false;
    plans = {};
    labels = {};

    connectedCallback() {
        loadNewport(this).then();

        if (this.obj) {
            this.userLanguage = this.obj.data.userLanguage;
            this.isBenefitWaived = this.obj.data.isBenefitWaived;
            this.plans = this.obj.data.plans;
        }

        this.adjustUrlForIcons();

        console.log("userLanguage: " + this.userLanguage);
        console.log("isBenefitWaived: " + this.isBenefitWaived);
        console.log("plans: " + JSON.stringify(this.plans));

        this.getCustomLabels();
    }

    adjustUrlForIcons () {
        if (this.plans) {
            // console.log("adjusting plan attributes...");
            // console.log("adjusting plan attributes... before:"+this.plans[0]["iconURL"]);

        //     let obj = this.plans[0];

        //     Object.assign(obj, {
        //         iconURL: 'woohoo!'
        //     });

        //    //obj["iconURL"] = this.plans[0]["iconURL"]+"-AAA";
        //     console.log("adjusting plan attributes... after 1:"+obj["iconURL"]);
        //     //this.plans[0] = obj;
        //     console.log("adjusting plan attributes... after 2:"+this.plans[0]["iconURL"]);

        }
    }

    getCustomLabels() {
        fetchCustomLabels(
            ["IMS_Dashborad_Benefits_Title", "IMS_Dashborad_Benefits_PlanNumber", "IMS_Dashborad_Benefits_LinkViewNore"],
            this.userLanguage,
            ["Health benefits overview", "Plan number", "View more"])
            .then(data => {
                this.labels = data;
            })
            .catch(error => console.error(error));
    };
    
    render() {
        return template;
    }
}