class PIMTab {
  elements = {
    date: () => cy.get('input[placeholder="yyyy-mm-dd"]').eq(1),
    MaritalStatus : () => cy.get ('.oxd-select-text--after').eq(1),
    smoke: () => cy.get('[type="checkbox"]').eq(0),
    employeeSearchId: () => cy.get('input').eq(2),
    searchBtn: () => cy.get('.orangehrm-left-space'),
    mainMenuItems: () => cy.get('.oxd-sidepanel-body'),
    addEmp: () => cy.get('.oxd-button--secondary'),
    employeeInputName: () => cy.get('.--name-grouped-field'),
    employeeInputId: () => cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input'),
    createLoginDetails: () => cy.get('input[type="checkbox"]'),
    userName: () => cy.get(':nth-child(4) > .oxd-grid-2 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input'),
    passwords: () => cy.get('input[type="password"]'),
    saveNewEmp: () => cy.get('button[type="submit"]'),
    result: () => cy.get('.oxd-toast'),
    loading: () => cy.get('.oxd-loading-spinner-container'),
    employeeInputNickName: () => cy.get('.oxd-input').eq(4),
    resultData: () => cy.get('.oxd-table-cell'),
    resultActions: () => cy.get('.oxd-table-cell-actions'),
  }
  openPIMTab() {
    this.elements.mainMenuItems().contains('PIM').click();
  }
  addNewEmployee(firstName: string, middleName: string, lastName: string, id: number, userName: string, password: string, confirmPassword: string) {

    const status = true; 
    const userRoleId = 1; 
    const empNumber = id; 

   // cy.request({
   //   method: 'POST',
   //   url: '/web/index.php/api/v2/admin/users',
   //  / body: {
     //   username: userName,
     //   password,
     //   status,
      //  userRoleId,
      //  empNumber,
     // },
    //}).then((response) => {
      
      //expect(response.status).to.equal(200);
    //});
    
    this.elements.addEmp().eq(1).click();
    this.elements.employeeInputName().children().eq(0).type(firstName);
    this.elements.employeeInputName().children().eq(1).type(middleName);
    this.elements.employeeInputName().children().eq(2).type(lastName);
    this.elements.employeeInputId().clear().type(`${id}`);
    this.elements.createLoginDetails().click({ force: true });
    this.elements.userName().type(userName);
    this.elements.passwords().eq(0).type(password);
    this.elements.passwords().eq(1).type(confirmPassword);
    this.elements.saveNewEmp().click();
    this.elements.result().contains('Successfully Saved').as('Successfully Added Employee');
  }

  editPersonalDetails(nickName: string, licenseExpiryDate: string, MaritalStatus: string,  gender: string) {
    this.elements.date().type(licenseExpiryDate);
    this.elements.MaritalStatus().click({ force: true });
    cy.get('[role="listbox"]').first().click();
    this.elements.smoke().click({force: true});
    this.elements.saveNewEmp().eq(0).click();
    this.openPIMTab();

    
  }

  SearchEmployee(id: string) {
    this.elements.employeeSearchId().type(id);
    this.elements.searchBtn().click({ force: true });
    this.elements.resultActions().children().eq(0).click();
  }

  

}

export default PIMTab;