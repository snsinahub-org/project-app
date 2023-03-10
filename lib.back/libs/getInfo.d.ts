export default class GetInfo {
    defaultLables: any;
    constructor();
    removeDefaultLables(lables: any): any;
    showIssueDefaultLables(lables: any): any;
    convertDataToArray(jsonObj: any): any;
    getOwnerRepo(uri: string): {
        owner: string;
        repo: string;
    };
}
