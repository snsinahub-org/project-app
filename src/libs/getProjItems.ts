'use strict';

// const _ = require('lodash');


export default class GetItems {

    constructor() {

    }

    getStatus(jsonObj:any, node_id:any) {
        console.log("jsonObj: ", JSON.stringify(jsonObj))
        for(let obj in jsonObj) {
            console.log("OBJ: ", JSON.stringify(obj))
            console.log("jsonObj[obj]: ", JSON.stringify(jsonObj[obj]))
            console.log("jsonObj[obj]['node']['id']: ", jsonObj[obj]['node_id'], node_id)
            if(jsonObj[obj]['node']['id'] == node_id) {
                return jsonObj[obj]['node']
            }
        }

        return null
        
    }
 
    
    async getProItems(context:any) {
        

        return await context.octokit.graphql(
            `
            {
                organization(login: "snsinahub-org") {
                  id
                  projectV2(number: 7) {
                    id
                    title
                    number
                    items(first: 100) {
                      edges {
                        node {
                          id
                          fieldValueByName(name: "Status") {
                            ... on ProjectV2ItemFieldSingleSelectValue {
                              id
                              name
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            `
        );   
    }
}

