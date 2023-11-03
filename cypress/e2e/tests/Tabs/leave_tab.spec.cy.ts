import leaveHelper from "../../../support/helpers/leaveHelper";
import pimHelper from "../../../support/helpers/pimHelper";
import adminHelper from "../../../support/helpers/adminHelper";
import commonHelper from "../../../support/helpers/commonHelper";
import MyLeavePage from "../../../support/pageObjects/LeaveTab/MyLeavePage";

const myLeavePage: MyLeavePage = new MyLeavePage();
let loginData: any = {};
let employeeData: any = {};

describe("Leave Management Floww: ", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fixture("loginInfo").then((logData: any) => {
      loginData = logData;
      cy.loginOrangeHRM(logData.userName.valid, logData.password.valid);
    });
    cy.fixture("employeeInfo").then((empData: any) => (employeeData = empData));
  });

  it("Employee Applies for Leave, Admin Approves, and Employee Checks Leave Status", () => {
    pimHelper.addEmployee(employeeData).then((employeeResponse) => {
      employeeData.empNumber = employeeResponse.data.empNumber;
      cy.fixture("adminInfo").then((adminData) => {
        adminHelper.addAdmin(adminData, employeeResponse.data.empNumber);
      });
    })
    .then(() => {
      return cy
        .fixture("leaveEntitlementInfo")
        .then((leaveEntitlementData) => {
          return leaveHelper.addLeaveEntitlement(
            leaveEntitlementData,
            employeeData.empNumber
          );
        });
    })
    .then((leaveEntitlementResponse) => {
      cy.logoutOrangeHRM();
      cy.loginOrangeHRM(employeeData.userName, employeeData.password);
      return cy.fixture("leaveRequestInfo").then((leaveRequestData) => {
        return leaveHelper.applyLeave(
          leaveRequestData,
          leaveEntitlementResponse.data.leaveType.id
        );
      });
    })
    .then((leaveRequestResponse) => {
      cy.logoutOrangeHRM();
      cy.loginOrangeHRM(loginData.userName.valid, loginData.password.valid);
      cy.fixture("actionOnLeaveRequestInfo").then(
        (actionOnLeaveRequestData) => {
          leaveHelper.actionOnLeaveRequest(
            actionOnLeaveRequestData,
            leaveRequestResponse.data.id
          );
        }
      );
    })
    .then(() => {
      cy.logoutOrangeHRM();
      cy.loginOrangeHRM(employeeData.userName, employeeData.password);
      myLeavePage.open();
      cy.fixture("myLeaveTableInfo").then((myLeaveTableData) => {
        commonHelper.checkRows(".oxd-table-row", myLeaveTableData);
      });
    })
    .then(() => {
      cy.logoutOrangeHRM();
      cy.loginOrangeHRM(loginData.userName.valid, loginData.password.valid);
      pimHelper.deleteEmployee(employeeData.empNumber);
    });
  });
});
