'use strict';

export default class GetItems {

  constructor() {

  }
  

  getStatus(jsonObj:any, node_id:any) {
      for(let obj in jsonObj) {
          if(jsonObj[obj]['node']['id'] == node_id) {
              return jsonObj[obj]['node']['fieldValueByName']['name']
          }
      }

      return null
      
  }

  
  async getProItems(context:any, organization:any, projectNumber:any) {
      

      return await context.octokit.graphql(
          `
          {
              organization(login: "${organization}") {
                id
                projectV2(number: ${projectNumber}) {
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


    
  async getIssueNumber(context:any, issueId:any) {
        
    return await context.octokit.graphql(
        `
        {
          node(id: "${issueId}") {
            ... on Issue {
              id 
              title
              number
              url
              resourcePath              
            }
          }
        }
        `
    );   
  }

  async addLabelsToIssue (context:any, owner: string, repo:string, labels:any, issue_number:any)  {
    return await context.octokit.rest.issues.addLabels({
      owner,
      repo,
      issue_number,
      labels
    })
  }

  async removeALabelFromIssue (context:any, owner: string, repo:string, name:string, issue_number:any)  {
    return await context.octokit.rest.issues.removeLabel({
      owner: owner,
      repo: repo,
      issue_number: issue_number,
      name: '"' + name.trim() + '"'
    })
  }

  async removeAllLabelsFromIssue (context:any, owner: any, repo:any, issue_number:any)  {
    return await context.octokit.rest.issues.removeAllLabels({
      owner,
      repo,
      issue_number
    })
  }

  async removeDefaultLabelsFromIssue (context:any, owner: any, repo:any, labels:any, issue_number:any)  {
    

    for(let label in labels) {
      await this.removeALabelFromIssue(context, owner, repo, `"${labels[label]}"`, issue_number)
    }
    
  }

  async ListIssueLabels (context:any, owner: any, repo:any, issue_number:any)  {
    
    return await context.octokit.rest.issues.listLabelsOnIssue({
      owner,
      repo,
      issue_number
    })
  }

  async getProjectNumber(context:any, projectId:any, organiztion: any) {
        
    console.log(projectId, organiztion)
    return await context.octokit.graphql(
        `
        {
          node(id: "${projectId}") {
            ... on ProjectV2 {
              id 
              title
              number
            }
          }
        }
        `
    );   
  }
}

