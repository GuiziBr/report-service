"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_fns_1 = require("date-fns");
var ExpensesReportService = /** @class */ (function () {
    function ExpensesReportService() {
    }
    ExpensesReportService.prototype.formatAmount = function (valueInCents) {
        if (valueInCents === void 0) { valueInCents = 0; }
        return Intl.NumberFormat('pt-BR', {
            style: 'currency', currency: 'BRL'
        }).format(valueInCents / 100);
    };
    ExpensesReportService.prototype.buildReport = function (balance, to, name, reportDate) {
        var text = "\n      Dear ".concat(name, ",\n\n      Monthly Report - ").concat((0, date_fns_1.format)(reportDate, 'yyyy/MM'), "\n\n      Shared Balance:\n      Your Incomes are ").concat(this.formatAmount(balance.sharedBalance.paying), "\n      Your Outcomes are ").concat(this.formatAmount(balance.sharedBalance.payed), "\n      Your Current Balance is ").concat(this.formatAmount(balance.sharedBalance.total), "\n\n      Your Current Personal Balance is ").concat(this.formatAmount(balance.personalBalance), "\n\n      Please bear in mind that your deadline for registering new expenses is up to today at 23h59, consider taking a moment to check your expenses\n\n      To see more details visit https://expenses-portal.herokuapp.com/\n\n      Regards,\n\n      Admin\n    ");
        console.log(text);
        return { to: to, subject: 'Expenses Portal - Monthly Report', text: text };
    };
    return ExpensesReportService;
}());
exports.default = ExpensesReportService;
//# sourceMappingURL=ExpensesReportService.js.map