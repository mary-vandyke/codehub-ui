import { transient } from 'aurelia-framework';

@transient()
export class Filters {
  constructor() {
    this.selectedOrganizations = [];
    this.selectedLanguages = [];
  }

  activate(modelData) {
    this.repo = modelData;
  }

  getUniqueValues(array, property) {
    const propertyArray = [];
    for (const object of array) {
      if (object[property]) {
        propertyArray.push(object[property]);
      } else {
        propertyArray.push('None');
      }
    }
    return Array.from(new Set(propertyArray));
  }

  toggleOrg(event, projects) {
    if (event.target.checked) {
      this.selectedOrganizations = this.getUniqueValues(projects, 'organization');
      return true;
    }
    this.selectedOrganizations = [];
    return true;
  }

  toggleLang(event, projects) {
    if (event.target.checked) {
      this.selectedLanguages = this.getUniqueValues(projects, 'language');
      return true;
    }
    this.selectedLanguages = [];
    return true;
  }

}
