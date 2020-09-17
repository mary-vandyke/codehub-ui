import { inject, computedFrom } from 'aurelia-framework';
import CHContants from '../constants/ch-constants';
import StageConfig from '../stageConf';
import { DialogFunctions } from '../resources/shared/dialog-functions';

@inject(StageConfig, DialogFunctions)
export class CardSearch {
  constructor(stageConfig, dialogFunctions) {
    this.repo = [];
    this.downloads = 0;
    this.releases = [];
    this.infected_files = 0;
    this.language_image = '/img/language-icons/default.svg';
    this.stageConfig = stageConfig;
    this.badge_status_image = '/img/pending_review_final_29w_35h.svg';
    this.dialogFunctions = dialogFunctions;
  }

  activate(modelData) {
    if (modelData) {
      this.repo = modelData;
      if(this.repo.sourceData.language) {
        let url = `/img/language-icons/${this.repo.sourceData.language.toLowerCase()}.svg`;
        url = url.replace(/\#/g,'_sharp');
        this.validateImage(url, (isValid) => {
          this.language_image = isValid ? url : this.language_image;
        });
      }

      if (modelData.sourceData.releases) {
        this.releases = modelData.sourceData.releases;
      }
      if (modelData.generatedData.vscan && modelData.generatedData.vscan.infected_files) {
        this.infected_files = modelData.generatedData.vscan.infected_files;
      }

      if (modelData.codehubData.badges && modelData.codehubData.badges.status) {
        switch(modelData.codehubData.badges.status.toLowerCase()) {
          case 'active':
            this.badge_status_image = '/img/active_flame_final_28w_35h.svg';
            break;
          case 'inactive':
            this.badge_status_image = '/img/inactive_zzz_final_32w_35h.svg';
            break;
          case 'pending':
              this.badge_status_image = '/img/pending_review_final_29w_35h.svg';
              break;
          case 'read-only':
              this.badge_status_image = '/img/lock_final_28w_35h.svg';
              break;
          default:
            this.badge_status_image = '/img/pending_review_final_29w_35h.svg';
        }
      }
    }

    this.releases.forEach(element => {
      this.downloads += (element.total_downloads && element.total_downloads !== undefined) ? element.total_downloads : 0;
    });
  }

  @computedFrom("repo.project_description", "repo.highlights['sourceData.description']")
  get hasdescription() {
    return this.repo ? (this.repo.sourceData && this.repo.sourceData.description ? true : false) : false;
  }
  get description() {
    if (!this.repo || !this.repo.sourceData || !this.repo.sourceData.description) {
      return CHContants.NO_DESCRIPTION_MESSAGE;
    }

    if (this.repo.highlights) {
      return this.repo.highlights['sourceData.description'] ? this.repo.highlights['sourceData.description'] : this.repo.sourceData.description;
    }

    return this.repo.sourceData.description;
  }
  get language() {
    return this.repo ? (this.repo.sourceData && this.repo.sourceData.language ? this.repo.sourceData.language : this.stageConfig.NO_LANG) : this.stageConfig.NO_LANG;
  }

  validateImage(url, cbfx) {
    let img = new Image()
    img.onload = () => cbfx(true);
    img.onerror = () => cbfx(false);
    img.src = url;
  }

}
