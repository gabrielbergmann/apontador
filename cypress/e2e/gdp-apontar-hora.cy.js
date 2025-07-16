describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://gdp.mouts.info/');
    cy.get('.t-Login-buttons > button:nth-child(1)').should('be.visible');
    cy.get('#P9999_USERNAME').type(Cypress.env('USERNAME'));
    cy.get('.password').type(Cypress.env('PASSWORD'));
    cy.get('.t-Login-buttons > button:nth-child(1)').click();

    cy.get('#t_MenuNav_1 > span > span').should('be.visible');
    cy.get('#t_MenuNav_1 > span > span').click();
    cy.get('#t_MenuNav_1m').click();
    
    cy.task('readExcelFromFixture', {
      filename: 'planilhaHoras.xlsx',
      sheetName: 'horas'
    }).then((apontamentos) => {
      // Log para verificar conteúdo lido
      cy.log(`📋 Total de apontamentos: ${apontamentos.length}`);
      
      Cypress._.each(apontamentos, (linha, index) => {
        cy.log(`🔁 Executando apontamento linha ${index + 1}`);
        
        cy.get('span').contains('Novo Registro').click();
        cy.wait(3000);

        cy.get('iframe').then($iframe => {
          const body = $iframe.contents().find('body');
          const projeto = linha.PROJECT;

          cy.wrap(body).find('#P46_W_CD_PROJETO').select(projeto, { force: true });
          cy.wrap(body).find('#P46_DT_HORA_INICIO').clear().type(linha.START_HOUR);
          cy.wrap(body).find('#P46_DT_HORA_FIM').clear().type(linha.END_HOUR);
          cy.wrap(body).find('#P46_PR_CONCLUSAO').clear().type('0,01');

          if (linha.PASS) {
            cy.wrap(body).find('#P46_CD_SENHA').clear().type(linha.PASS);
          }

          cy.wrap(body).find('#P46_DS_OBSERVACAO').clear().type(linha.DESCRIPTION);
          cy.wrap(body).find('#P46_DT_REFERENCIA').clear().type(linha.DATE);

          cy.wrap(body).contains('Salvar').click();
          cy.wait(1000); // tempo para salvar
        });
      });
    });
  });
});
