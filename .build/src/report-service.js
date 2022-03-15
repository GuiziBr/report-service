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
        while (_) try {
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
exports.reportService = void 0;
var ExpensesAuthenticationService_1 = require("./services/ExpensesAuthenticationService");
var ExpensesBalanceService_1 = require("./services/ExpensesBalanceService");
var ExpensesReportService_1 = require("./services/ExpensesReportService");
var ExpensesEmailService_1 = require("./services/ExpensesEmailService");
var Handler = /** @class */ (function () {
    function Handler(_a) {
        var authSvc = _a.authSvc, balanceSvc = _a.balanceSvc, reportSvc = _a.reportSvc, emailSvc = _a.emailSvc, reportDate = _a.reportDate;
        this.AuthSvc = authSvc;
        this.balanceSvc = balanceSvc;
        this.reportSvc = reportSvc;
        this.emailSvc = emailSvc;
        this.reportDate = reportDate;
    }
    Handler.prototype.main = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userSession, sessionToken, userEmail, username, balance, report, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.AuthSvc.getSessionToken()];
                    case 1:
                        userSession = _a.sent();
                        if (!userSession)
                            return [2 /*return*/, 'Non Authorized'];
                        sessionToken = userSession.sessionToken, userEmail = userSession.userEmail, username = userSession.username;
                        return [4 /*yield*/, this.balanceSvc.getBalance(sessionToken, this.reportDate)];
                    case 2:
                        balance = _a.sent();
                        if (!balance)
                            return [2 /*return*/, 'No balance found'];
                        report = this.reportSvc.buildReport(balance, 'guizi189@gmail.com', 'Guizi', this.reportDate);
                        return [4 /*yield*/, this.emailSvc.sendEmail({
                                sourceEmail: userEmail,
                                sourceName: username,
                                subjectData: report.subject,
                                textData: report.text,
                                toAddresses: [report.to]
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, {
                            statusCode: 200
                        }];
                }
            });
        });
    };
    return Handler;
}());
var handler = new Handler({
    authSvc: new ExpensesAuthenticationService_1.default(),
    balanceSvc: new ExpensesBalanceService_1.default(),
    reportSvc: new ExpensesReportService_1.default(),
    emailSvc: new ExpensesEmailService_1.default(),
    reportDate: new Date(2022, 1)
});
exports.reportService = handler.main.bind(handler);
//# sourceMappingURL=report-service.js.map