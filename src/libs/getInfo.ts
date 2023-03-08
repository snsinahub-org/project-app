'use strict';

const _ = require('lodash');


export default class GetInfo {
    defaultLables = [
        "In Progress",
        "Todo",
        "Done"
    ]
    constructor() {
        
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

