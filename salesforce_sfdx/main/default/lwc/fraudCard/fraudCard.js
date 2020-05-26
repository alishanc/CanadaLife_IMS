import { LightningElement } from 'lwc';
import { BaseState } from "vlocity_ins/baseState";
import { load as loadNewport } from 'vlocity_ins/newportLoader';

import template from "./fraudCard.html";

export default class mailUs extends BaseState(LightningElement) {


    lang = "en-CA";
    isEnglish = true;
    isVisible = true;
    
    connectedCallback() {
        loadNewport(this).then();

        if (this.obj.user && this.obj.user.language) {
            this.lang = this.obj.user.language;
            this.isEnglish = this.lang.includes("en");
        }

        if(this.obj.user && this.obj.user.type){
            if(this.obj.user.type == "GRS"){
                this.isVisible = false;
            }
        }

    
    }

    render() {
        return template;
    }
}