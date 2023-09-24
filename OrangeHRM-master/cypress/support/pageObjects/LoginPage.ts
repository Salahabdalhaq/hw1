class LoginPage {

  elements = {
    userName: () => cy.getByAttribute('placeholder', 'Username'),
    password: () => cy.getByAttribute('placeholder', 'Password'),
    loginBtn: () => cy.get('button'),

    alertLogin: () => cy.get('.oxd-alert-content-text'),
    dashboardLabel: () => cy.get('.oxd-topbar-header-breadcrumb > .oxd-text'),
    userDropdown: () => cy.get('.oxd-userdropdown-tab'),
    logoutOption: () => cy.get(':nth-child(4) > .oxd-userdropdown-link'),
  }

  login(userName: string, password: string) {
    userName && this.elements.userName().type(userName);
    password && this.elements.password().type(password);
    this.elements.loginBtn().click();
  }

  checkValidLogin(msg: string) {
    this.elements.dashboardLabel().contains(msg).as('Login Successfully');
  }


}

export default LoginPage;