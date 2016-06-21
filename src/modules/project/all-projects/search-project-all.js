import {inject} from "aurelia-framework";
import {SearchProjectData} from "./searchProjectData";
import {Router} from "aurelia-router";

@inject(SearchProjectData, Router)
export class SearchProjectAll {

  constructor(searchProjectData, router) {
  		this.searchProjectData = searchProjectData;
      this.router = router;
  	}

  	activate(params, router, navigationInstruction) {
      this.projects = [];
  		this.router = navigationInstruction.router;
  		return this.searchProjectData.searchAllByName(searchText)
      .then( projects => {
  			this.projects = projects;
  		});
  	}

  	executeSearch(searchText) {
  		this.router.navigateToRoute("result-all",{searchText:searchText});
  	}

  }