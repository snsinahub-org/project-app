"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var getProjItems_1 = __importDefault(require("./libs/getProjItems"));
var getInfo_1 = __importDefault(require("./libs/getInfo"));
var items = new getProjItems_1.default();
var utils = new getInfo_1.default();
module.exports = function (app) {
    app.on("projects_v2_item", function (context) { return __awaiter(void 0, void 0, void 0, function () {
        var contentType, itemNodeId, projectId, issueId, issueInfo, issueOrgRepo, issueOrg, issueRepo, organization, projectInfo, projectNumber, issueNumber, projectItems, itemObjects, itemStaus, listIssueLabels, issueLabels, listIssueLabelsWithoutDefault, listDefaultIssueLabels, removeDefaultLabelsFromIssueawait, addLabelsToIssue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contentType = context.payload.projects_v2_item.content_type;
                    if (!(contentType == 'Issue' && context.payload.action == 'edited' && context.payload.changes.field_value.field_type == 'single_select')) return [3 /*break*/, 7];
                    itemNodeId = context.payload.projects_v2_item.node_id;
                    projectId = context.payload.projects_v2_item.project_node_id;
                    issueId = context.payload.projects_v2_item.content_node_id;
                    return [4 /*yield*/, items.getIssueNumber(context, issueId)];
                case 1:
                    issueInfo = _a.sent();
                    issueOrgRepo = utils.getOwnerRepo(issueInfo.node.resourcePath);
                    issueOrg = issueOrgRepo.owner;
                    issueRepo = issueOrgRepo.repo;
                    organization = context.payload.organization.login;
                    return [4 /*yield*/, items.getProjectNumber(context, projectId, organization)];
                case 2:
                    projectInfo = _a.sent();
                    projectNumber = projectInfo.node.number;
                    issueNumber = issueInfo.node.number;
                    return [4 /*yield*/, items.getProItems(context, organization, projectNumber)];
                case 3:
                    projectItems = _a.sent();
                    itemObjects = projectItems.organization.projectV2.items.edges;
                    itemStaus = items.getStatus(itemObjects, itemNodeId);
                    return [4 /*yield*/, items.ListIssueLabels(context, issueOrg, issueRepo, issueNumber)];
                case 4:
                    listIssueLabels = _a.sent();
                    issueLabels = utils.convertDataToArray(listIssueLabels.data);
                    listIssueLabelsWithoutDefault = Array.from(utils.removeDefaultLables(issueLabels));
                    listDefaultIssueLabels = Array.from(utils.showIssueDefaultLables(issueLabels));
                    listIssueLabelsWithoutDefault.push(itemStaus);
                    return [4 /*yield*/, items.removeAllLabelsFromIssue(context, issueOrg, issueRepo, issueNumber)
                        // @ts-ignore
                    ];
                case 5:
                    removeDefaultLabelsFromIssueawait = _a.sent();
                    return [4 /*yield*/, items.addLabelsToIssue(context, issueOrg, issueRepo, listIssueLabelsWithoutDefault, issueNumber)
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
                    ];
                case 6:
                    addLabelsToIssue = _a.sent();
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
                    console.log("info ===>", itemNodeId, projectId, organization, itemStaus, projectNumber, issueId, issueNumber, issueOrg, issueRepo, typeof listIssueLabelsWithoutDefault);
                    return [3 /*break*/, 8];
                case 7:
                    console.log("the item has been changed is not a repository issue");
                    _a.label = 8;
                case 8:
                    console.log("ContentType:", contentType);
                    return [2 /*return*/];
            }
        });
    }); });
    console.log("called");
};
//# sourceMappingURL=index.js.map