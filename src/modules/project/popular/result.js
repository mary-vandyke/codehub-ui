import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {SearchProjectData} from "../dataRepository/searchProjectData";
//import {SearchProject} from "./search-project";
import {bindable} from 'aurelia-framework';

@inject(SearchProjectData, Router)
export class Result {
  heading = 'Projects List';

  // getViewStrategy() {
  //       return '../common/result.html';
  //   }
  constructor(searchProjectData, searchProject, searchText) {
		this.searchProjectData = searchProjectData;
    this.searchProject = searchProject;
    console.log(searchText);
    this.projects = ["Nooooop"];
    this.orgs = ["boozallen","booz-allen-hamilton","netflix"];
	}

  activate(params, routeConfig, navigationInstruction) {
    console.log(routeConfig.settings)
    return this.searchProjectData.getAllProjects(this.orgs)
    .then( projects => {
      var projs = JSON.parse(JSON.stringify(projects));
      console.log(projs);
      if(!(params.searchText) || params.searchText == ''){
        var projList = [];
        for(var projArr of projs){
          for(var proj of projArr){
            projList.push(proj);
          }
        }
        this.projects = projList;
        return this.projects;
      }
      else{
        var projList = [];
        for(var projArr of projs){
          for(var proj of projArr){
          if(new RegExp(params.searchText).test(proj.full_name) || new RegExp(params.searchText).test(proj.description)){
            console.log("owner: "+proj.owner.login+" name:"+proj.name+" :fullname:" + proj.full_name );
            console.log(new RegExp(params.searchText).test(proj.owner.login));
            projList.push(proj);
          }

        }

      }
      console.log(projList);
      this.projects = projList;
     return this.projects;
      }
    });

	}
}
