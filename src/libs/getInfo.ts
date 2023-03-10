'use strict';

const _ = require('lodash');
const config = require('config');
const commonLables = config.get('commonLables');


export default class GetInfo {
    defaultLables = commonLables
    constructor() {
        
    }

    searchDefaultLables(label:string) {
        let index = _.indexOf(this.defaultLables, label)
        return (index == -1 ) ? false:true
    }

    removeDefaultLables(lables:any) {
        return lables.filter((el:any) => !this.defaultLables.includes(el))
    }

    showIssueDefaultLables(lables:any) {
        return lables.filter((el:any) => this.defaultLables.includes(el))
    }


    convertDataToArray(jsonObj:any) {
        return _.map(jsonObj, 'name')
    }

    getOwnerRepo(uri:string){
        let uriObj = uri.split("/")
        return {
            "owner": uriObj[1],
            "repo":  uriObj[2]
        }
    }

  
}

