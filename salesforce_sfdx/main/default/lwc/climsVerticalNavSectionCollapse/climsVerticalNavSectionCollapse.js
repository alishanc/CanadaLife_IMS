/**
 * Based off of https://github.com/salesforce/base-components-recipes/tree/master/force-app/main/default/lwc/accordionSection
 */

import { LightningElement, api, track } from "lwc";
import { classSet } from "lightning/utils";
import { generateUniqueId } from "c/inputUtils";

export default class ClimsVerticalNavSectionCollapse extends LightningElement {
  @api name;
  @api label;
  @api title;

  @track privateIsOpen = false;

  pendingFocus = false;

  privateUniqueId = generateUniqueId("clims-vertical-nav__section-collapse");

  renderedCallback() {
    if (this.privateIsOpen && this.pendingFocus) {
      this.pendingFocus = false;
      this.focusSection();
    }
  }

  get computedAriaExpanded() {
    return this.privateIsOpen.toString();
  }

  get computedAriaHidden() {
    return (!this.privateIsOpen).toString();
  }

  get computedSectionClasses() {
    return classSet("clims-vertical-nav-section-collapse")
      .add({
        "slds-is-open": this.privateIsOpen
      })
      .toString();
  }

  get computedHidden() {
    return this.privateIsOpen ? "" : (!this.privateIsOpen).toString();
  }

  handleSelectSection() {
    this.pendingFocus = true;
    this.toggleSection();
  }

  toggleSection() {
    if (this.privateIsOpen) {
      this.closeSection();
    } else {
      this.openSection();
    }
  }

  openSection() {
    this.privateIsOpen = true;
  }

  closeSection() {
    this.privateIsOpen = false;
  }

  focusSection() {
    const sectionButton = this.template.querySelector("button.section-control");

    sectionButton.blur();
    sectionButton.focus();
  }

  isOpen() {
    return this.privateIsOpen;
  }
}