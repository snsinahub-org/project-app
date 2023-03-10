import { Probot } from "probot";
import  GetItems  from './libs/getProjItems';
import GetInfo from './libs/getInfo'


let items = new GetItems();
let utils = new GetInfo();


export = (app: Probot) => {
  
  app.on("projects_v2_item", async (context) => {
    
    let contentType = context.payload.projects_v2_item.content_type;

    if(contentType == 'Issue' && context.payload.action == 'edited' && context.payload.changes.field_value.field_type == 'single_select') {
      
      //  Define variables based on context payload
      let itemNodeId = context.payload.projects_v2_item.node_id;
      let projectId = context.payload.projects_v2_item.project_node_id;
      let issueId = context.payload.projects_v2_item.content_node_id;
      let issueInfo = await items.getIssueNumber(context, issueId);
      let issueOrgRepo = utils.getOwnerRepo(issueInfo.node.resourcePath)
      let issueOrg = issueOrgRepo.owner;
      let issueRepo = issueOrgRepo.repo;
      // @ts-ignore
      let organization = context.payload.organization.login;

      // Get Project and Issue information
      let projectInfo = await items.getProjectNumber(context, projectId, organization)
      let projectNumber = projectInfo.node.number
      let issueNumber = issueInfo.node.number
      let projectItems = await items.getProItems(context, organization, projectNumber)
      let itemObjects = projectItems.organization.projectV2.items.edges;
      let itemStaus = items.getStatus(itemObjects, itemNodeId);    
      let statusIsDefaultLabel = utils.searchDefaultLables(itemStaus)
      
      // Read and modify issue labels
      
            
      

      let listIssueLabels = await items.ListIssueLabels(context, issueOrg, issueRepo, issueNumber)      
      let issueLabels = utils.convertDataToArray(listIssueLabels.data)
      let listIssueLabelsWithoutDefault = Array.from(utils.removeDefaultLables(issueLabels))
      // @ts-ignore
      let listDefaultIssueLabels = Array.from(utils.showIssueDefaultLables(issueLabels))
      listIssueLabelsWithoutDefault.push(itemStaus)
      if(statusIsDefaultLabel) {
        // @ts-ignore
        // let removeDefaultLabelsFromIssue = await items.removeDefaultLabelsFromIssue(context, issueOrg, issueRepo, listDefaultIssueLabels, issueNumber);
        let removeDefaultLabelsFromIssueawait = await items.removeAllLabelsFromIssue(context, issueOrg, issueRepo, issueNumber)
      }
      // @ts-ignore
      let addLabelsToIssue = await items.addLabelsToIssue(context, issueOrg, issueRepo, listIssueLabelsWithoutDefault, issueNumber) 
            

      // console.log("PR2 ", context.payload.projects_v2_item.node_id)
      // console.log("PR2 ", context.payload.projects_v2_item.node_id)
      // console.log("WHAT", JSON.stringify(projectItems))
      // console.log("projectInfo", JSON.stringify(projectInfo))
      // console.log("issuetInfo", JSON.stringify(issueInfo))
      // console.log("issueOrgRepo", JSON.stringify(issueOrgRepo))
      // // console.log("addLabelsToIssue", JSON.stringify(addLabelsToIssue))
      // console.log("ListIssueLabels", JSON.stringify(listIssueLabels))
      // console.log("issueLabels", JSON.stringify(issueLabels))
      // console.log("listIssueLabelsWithoutDefault", JSON.stringify(listIssueLabelsWithoutDefault))
      // console.log("listDefaultIssueLabels", JSON.stringify(listDefaultIssueLabels))
      console.log("info ===>", itemNodeId, projectId, organization, itemStaus, projectNumber, issueId, issueNumber, issueOrg, issueRepo, typeof listIssueLabelsWithoutDefault)
    } else {
      console.log("the item has been changed is not a repository issue")
    }

    console.log("ContentType:", contentType)
    
  });

 

  console.log("called")
  
};
