import LoginPage from "../../../support/pageObjects/LoginPage";
import CandidatesPage from "../../../support/pageObjects/RecruitmentTab/CandidatesPage";
import VacanciesPage from "../../../support/pageObjects/RecruitmentTab/VacanciesPage";
import vacanciesHelper from "../../../support/helpers/vacanciesHelper";
import candidatesHelper from "../../../support/helpers/candidatesHelper";
import pimHelper from "../../../support/helpers/pimHelper";
import commonHelper from "../../../support/helpers/commonHelper";

const loginPage: LoginPage = new LoginPage();
const candidatesPage: CandidatesPage = new CandidatesPage();
const vacanciesPage: VacanciesPage = new VacanciesPage();

let employeeData: any = {};
let loginData: any = {};
describe("Recruitment: Vacancy Attachment", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fixture("loginInfo").then((logData: any) => {
      loginData = logData;
      cy.loginOrangeHRM(logData.userName.valid, logData.password.valid);
    });

    cy.fixture("employeeInfo").then((empData) => {
      employeeData = empData;
    });
  });

  it("User Attaches a File to a Vacancy", () => {
    pimHelper.addEmployee(employeeData).then((employeeResponse) => {
        return cy.fixture("vacancyInfo").then((vacancyData) => {
          return vacanciesHelper.addVacancy(
            vacancyData,
            employeeResponse.data.empNumber
          );
        });
      })
      .then((vacancyResponse) => {
        cy.visit(
          `/web/index.php/recruitment/addJobVacancy/${vacancyResponse.data.id}`
        );
        vacanciesPage.addAttachment("cypress/fixtures/VacancyAttachment.xlsx");
        cy.get(".oxd-toast").should("exist");
        cy.fixture("vacancyAttachmentsInfo").then((attachmentsData) => {
          commonHelper.checkRows(".oxd-table-row", attachmentsData);
        });
      })
      .then(() => {
        return pimHelper.getEmployee(employeeData.employeeId);
      })
      .then((employeeResponse) => {
        pimHelper.deleteEmployee(employeeResponse.data[0].empNumber);
      });
  });

 
});
