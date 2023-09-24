import LoginPage from "../../../support/pageObjects/LoginPage";
import PIMTab from "../../../support/pageObjects/PIMTab/PIMTab";

const loginPage: LoginPage = new LoginPage();
const pimTab: PIMTab = new PIMTab();

describe('Login Page', () => {
  beforeEach(() => {
    cy.intercept('/web/index.php/dashboard/index').as('Login');
    cy.visit('/');
    loginPage.login('Admin', 'admin123');
    cy.fixture('employeeInfoPIM').as('empInfo');
    pimTab.openPIMTab();
  });

  it('Add employee', () => {
    cy.get('@empInfo').then((infoData: any) => {
      pimTab.addNewEmployee(infoData.firstName, infoData.middleName, infoData.lastName, infoData.id, infoData.userName, infoData.password, infoData.password);

      pimTab.editPersonalDetails(infoData.nickName,  infoData.licenseExpiryDate, infoData.MaritalStatus, infoData.gender);
    });
  });

  it('Search Employee', () => {
    cy.get('@empInfo').then((infoData: any) => {
      pimTab.SearchEmployee(infoData.id);
    });
  });

 
});