'use strict';
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
Object.defineProperty(exports, "__esModule", { value: true });
var GetItems = /** @class */ (function () {
    function GetItems() {
    }
    GetItems.prototype.getStatus = function (jsonObj, node_id) {
        for (var obj in jsonObj) {
            if (jsonObj[obj]['node']['id'] == node_id) {
                return jsonObj[obj]['node']['fieldValueByName']['name'];
            }
        }
        return null;
    };
    GetItems.prototype.getProItems = function (context, organization, projectNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, context.octokit.graphql("\n          {\n              organization(login: \"".concat(organization, "\") {\n                id\n                projectV2(number: ").concat(projectNumber, ") {\n                  id\n                  title\n                  number\n                  items(first: 100) {\n                    edges {\n                      node {\n                        id\n                        fieldValueByName(name: \"Status\") {\n                          ... on ProjectV2ItemFieldSingleSelectValue {\n                            id\n                            name\n                          }\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          "))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GetItems.prototype.getIssueNumber = function (context, issueId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, context.octokit.graphql("\n        {\n          node(id: \"".concat(issueId, "\") {\n            ... on Issue {\n              id \n              title\n              number\n              url\n              resourcePath              \n            }\n          }\n        }\n        "))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GetItems.prototype.addLabelsToIssue = function (context, owner, repo, labels, issue_number) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, context.octokit.rest.issues.addLabels({
                            owner: owner,
                            repo: repo,
                            issue_number: issue_number,
                            labels: labels
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GetItems.prototype.removeALabelFromIssue = function (context, owner, repo, name, issue_number) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, context.octokit.rest.issues.removeLabel({
                            owner: owner,
                            repo: repo,
                            issue_number: issue_number,
                            name: '"' + name.trim() + '"'
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GetItems.prototype.removeAllLabelsFromIssue = function (context, owner, repo, issue_number) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, context.octokit.rest.issues.removeAllLabels({
                            owner: owner,
                            repo: repo,
                            issue_number: issue_number
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GetItems.prototype.removeDefaultLabelsFromIssue = function (context, owner, repo, labels, issue_number) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _i, label;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = labels;
                        _b = [];
                        for (_c in _a)
                            _b.push(_c);
                        _i = 0;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _b.length)) return [3 /*break*/, 4];
                        _c = _b[_i];
                        if (!(_c in _a)) return [3 /*break*/, 3];
                        label = _c;
                        return [4 /*yield*/, this.removeALabelFromIssue(context, owner, repo, "\"".concat(labels[label], "\""), issue_number)];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GetItems.prototype.ListIssueLabels = function (context, owner, repo, issue_number) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, context.octokit.rest.issues.listLabelsOnIssue({
                            owner: owner,
                            repo: repo,
                            issue_number: issue_number
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GetItems.prototype.getProjectNumber = function (context, projectId, organiztion) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(projectId, organiztion);
                        return [4 /*yield*/, context.octokit.graphql("\n        {\n          node(id: \"".concat(projectId, "\") {\n            ... on ProjectV2 {\n              id \n              title\n              number\n            }\n          }\n        }\n        "))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return GetItems;
}());
exports.default = GetItems;
//# sourceMappingURL=getProjItems.js.map