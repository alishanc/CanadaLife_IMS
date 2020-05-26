import { LightningElement, api, track, wire } from "lwc";
import getMenuList1 from "@salesforce/apex/IMSCommunityHelper.getMenuList1";

import IMS_Menu_Overview from "@salesforce/label/c.IMS_Menu_Overview";
import IMS_M_Make_a_claim from "@salesforce/label/c.IMS_M_Make_a_claim";
import IMS_Menu_Benefits from "@salesforce/label/c.IMS_Menu_Benefits";
import IMS_Menu_Claim_History from "@salesforce/label/c.IMS_Menu_Claim_History";
import IMS_Menu_Coverage_and_balances from "@salesforce/label/c.IMS_Menu_Coverage_and_balances";
import IMS_MENU_Contributions from "@salesforce/label/c.IMS_MENU_Contributions";
import IMS_MENU_Savings from "@salesforce/label/c.IMS_MENU_Savings";
import IMS_Menu_Plans_info from "@salesforce/label/c.IMS_Menu_Plans_info";
import IMS_Menu_Statements from "@salesforce/label/c.IMS_Menu_Statements";
import IMS_Menu_Manage_portfolio from "@salesforce/label/c.IMS_Menu_Manage_portfolio";
import IMS_Menu_NextStep_sign_up from "@salesforce/label/c.IMS_Menu_NextStep_sign_up";
import IMS_Menu_Info_center from "@salesforce/label/c.IMS_Menu_Info_center";
import IMS_Menu_For_benefits from "@salesforce/label/c.IMS_Menu_For_benefits";
import IMS_Menu_For_savings from "@salesforce/label/c.IMS_Menu_For_savings";
import IMS_Menu_Resources from "@salesforce/label/c.IMS_Menu_Resources";
import IMS_Menu_Wellness from "@salesforce/label/c.IMS_Menu_Wellness";
import IMS_Menu_Mental_health from "@salesforce/label/c.IMS_Menu_Mental_health";
import IMS_Menu_Savings_tips from "@salesforce/label/c.IMS_Menu_Savings_tips";
import IMS_Menu_Find_a_provider from "@salesforce/label/c.IMS_Menu_Find_a_provider";

export default class ClimsLeftNavComponent extends LightningElement {
  menuList;
  error;
  @api currentPageUrl = window.location.pathname;
  label = {
    IMS_Menu_Overview,
    IMS_M_Make_a_claim,
    IMS_Menu_Benefits,
    IMS_Menu_Claim_History,
    IMS_Menu_Coverage_and_balances,
    IMS_MENU_Contributions,
    IMS_MENU_Savings,
    IMS_Menu_Plans_info,
    IMS_Menu_Statements,
    IMS_Menu_Manage_portfolio,
    IMS_Menu_NextStep_sign_up,
    IMS_Menu_Info_center,
    IMS_Menu_For_benefits,
    IMS_Menu_For_savings,
    IMS_Menu_Resources,
    IMS_Menu_Wellness,
    IMS_Menu_Mental_health,
    IMS_Menu_Savings_tips,
    IMS_Menu_Find_a_provider
  };
  @wire(getMenuList1)
  menus({ error, data }) {
    if (data) {
      this.menuList = JSON.parse(data);
      this.menuList.map((item, index) => {
        item.label = this.label[item.label];
        if (item.url) {
          item.url = "/identity/s/" + item.url;
        } else {
          item.url = "https://www.canadalife.com/" + index;
        }

        item.children.map((child, childIndex) => {
          child.label = this.label[child.label];
          if (child.url) {
            child.url = "/identity/s/" + child.url;
          } else {
            child.url = "https://www.canadalife.com/" + index + childIndex;
          }
          return child;
        });

        return item;
      });
    } else if (error) {
      this.error = error;
    }
  }

  connectedCallback() {
    this.currentPageUrl = this.currentPageUrl;
  }

  renderedCallback() {
    console.log("CALLBACK IMSMainMenu");
    console.log(this.menuList);
    console.log(this.error);
  }
}