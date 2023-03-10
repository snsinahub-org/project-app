export default class GetItems {
    constructor();
    getStatus(jsonObj: any, node_id: any): any;
    getProItems(context: any, organization: any, projectNumber: any): Promise<any>;
    getIssueNumber(context: any, issueId: any): Promise<any>;
    addLabelsToIssue(context: any, owner: string, repo: string, labels: any, issue_number: any): Promise<any>;
    removeALabelFromIssue(context: any, owner: string, repo: string, name: string, issue_number: any): Promise<any>;
    removeAllLabelsFromIssue(context: any, owner: any, repo: any, issue_number: any): Promise<any>;
    removeDefaultLabelsFromIssue(context: any, owner: any, repo: any, labels: any, issue_number: any): Promise<void>;
    ListIssueLabels(context: any, owner: any, repo: any, issue_number: any): Promise<any>;
    getProjectNumber(context: any, projectId: any, organiztion: any): Promise<any>;
}
