import { LightningElement, api, track, wire } from 'lwc';

import CustomerCommunityFooter_Copyright from "@salesforce/label/c.CustomerCommunityFooter_Copyright";
import CustomerCommunity_footer_privacyLink from "@salesforce/label/c.CustomerCommunity_footer_privacyLink";
import CustomerCommunityFooter_Privacy from "@salesforce/label/c.CustomerCommunityFooter_Privacy";
import CustomerCommunityFooter_NewTab from "@salesforce/label/c.CustomerCommunityFooter_NewTab";
import CustomerCommunity_footer_legalLink from "@salesforce/label/c.CustomerCommunity_footer_legalLink";
import CustomerCommunityFooter_Legal from "@salesforce/label/c.CustomerCommunityFooter_Legal";
import CustomerCommunity_footer_securityLink from "@salesforce/label/c.CustomerCommunity_footer_securityLink";
import CustomerCommunityFooter_Internet_Security from "@salesforce/label/c.CustomerCommunityFooter_Internet_Security";
import CustomerCommunity_footer_accessibilityLink from "@salesforce/label/c.CustomerCommunity_footer_accessibilityLink";
import CustomerCommunityFooter_Accessibility from "@salesforce/label/c.CustomerCommunityFooter_Accessibility";

export default class ImsFooter extends LightningElement {

    label = {
        CustomerCommunityFooter_Copyright, 
        CustomerCommunity_footer_privacyLink,
        CustomerCommunityFooter_Privacy,
        CustomerCommunityFooter_NewTab,
        CustomerCommunity_footer_legalLink,
        CustomerCommunityFooter_Legal,
        CustomerCommunity_footer_securityLink,
        CustomerCommunityFooter_Internet_Security,
        CustomerCommunity_footer_accessibilityLink,
        CustomerCommunityFooter_Accessibility,
    };

    currentYear = new Date().getFullYear();
}