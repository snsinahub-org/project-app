'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var config = require('config');
var commonLables = config.get('commonLables');
var GetInfo = /** @class */ (function () {
    function GetInfo() {
        this.defaultLables = commonLables;
    }
    GetInfo.prototype.removeDefaultLables = function (lables) {
        var _this = this;
        return lables.filter(function (el) { return !_this.defaultLables.includes(el); });
    };
    GetInfo.prototype.showIssueDefaultLables = function (lables) {
        var _this = this;
        return lables.filter(function (el) { return _this.defaultLables.includes(el); });
    };
    GetInfo.prototype.convertDataToArray = function (jsonObj) {
        return _.map(jsonObj, 'name');
    };
    GetInfo.prototype.getOwnerRepo = function (uri) {
        var uriObj = uri.split("/");
        return {
            "owner": uriObj[1],
            "repo": uriObj[2]
        };
    };
    return GetInfo;
}());
exports.default = GetInfo;
//# sourceMappingURL=getInfo.js.map