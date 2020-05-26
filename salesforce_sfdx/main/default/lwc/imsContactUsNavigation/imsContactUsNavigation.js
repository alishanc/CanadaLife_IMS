import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import { BaseState } from "vlocity_ins/baseState";
import template from "./imsContactUsNavigation.html";

export default class ImsContactUsNavigation extends BaseState(NavigationMixin(LightningElement)) {

    health = {};
    navigateToContactUs() {
        console.log('in contact us navigate');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'contactus__c'
            },
        },false);
    }

    navigateToThirdParty() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'callcentre_contactus__c'
            },
        });
    }

    connectedCallback() {
       console.log("in connected callbackNavCard1");
       this.isExt = false;
       this.health = this.obj.data.health;
       this.isExt = this.health.isExternalContactCentre === 'true';
       console.log("isExternal:" + this.isExt);
       console.log("test:" );
       
       if(this.isExt) {
            this.navigateToThirdParty();
       }
       else {
            console.log("in else");
            this.navigateToContactUs();
       }
    }

    render() {
        return template;
        
    }
}