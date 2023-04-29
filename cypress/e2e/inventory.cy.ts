import { OUT_OF_STOCK } from "@app/modules/inventory/const";

describe('Inventory E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('GIVEN the inventory is not empty', () => {
    describe('AND item amount > 1', () => {
      it('WHEN user clicks the increment button THEN the amount should be incremented', () => {
        cy.get('[data-test-id="amount-1"]').should('contain', '419');
        cy.get('[data-test-id="increment-btn-1"]').click();
        cy.get('[data-test-id="amount-1"]').should('contain', '420');
      });

      it('WHEN user clicks the decrement button THEN the amount should be decremented', () => {
        cy.get('[data-test-id="amount-1"]').should('contain', '419');
        cy.get('[data-test-id="decrement-btn-1"]').click();
        cy.get('[data-test-id="amount-1"]').should('contain', '418');
      });
    });

    describe('AND item amount equals 1 ', () => {
      it('WHEN user clicks the decrement button THEN should mark as out of stock', () => {
        cy.get('[data-test-id="amount-3"]').should('contain', '1');
        cy.get('[data-test-id="decrement-btn-3"]').click();
        cy.get('[data-test-id="amount-3"]').should('contain', OUT_OF_STOCK);
      });
    });

    it('WHEN user clicks the remove button THEN item should be removed', () => {
      cy.get('[data-test-id="amount-1"]').should('exist');
      cy.get('[data-test-id="remove-btn-1"]').click();
      cy.get('[data-test-id="amount-1"]').should('not.exist');
    });

    it('WHEN user enters name and amount AND clicks add button THEN item should be added', () => {
      cy.get('[data-test-id="name-4"]').should('not.exist');
      cy.get('[data-test-id="amount-4"]').should('not.exist');

      cy.get('[data-test-id="new-name-input"]').type('New Item');
      cy.get('[data-test-id="new-amount-input"]').type('8');
      cy.get('[data-test-id="add-btn"]').click();

      cy.get('[data-test-id="name-4"]').should('contain', 'New Item');
      cy.get('[data-test-id="amount-4"]').should('contain', '8');
    });

    it('WHEN user removes all items THEN should display empty state page', () => {
      cy.get('[data-test-id="empty-inventory"]').should('not.exist');
      cy.get('[data-test-id="remove-btn-1"]').click();
      cy.get('[data-test-id="remove-btn-2"]').click();
      cy.get('[data-test-id="remove-btn-3"]').click();
      cy.get('[data-test-id="empty-inventory"]').should('exist');
    });
  });

  describe('GIVEN inventory is empty', () => {
    beforeEach(() => {
      cy.get('[data-test-id="remove-btn-1"]').click();
      cy.get('[data-test-id="remove-btn-2"]').click();
      cy.get('[data-test-id="remove-btn-3"]').click();
    });

    it('WHEN user enters name and amount AND clicks add button THEN should displazy the inventory with one new item', () => {
      cy.get('[data-test-id="name-1"]').should('not.exist');
      cy.get('[data-test-id="amount-1"]').should('not.exist');

      cy.get('[data-test-id="ei-new-name-input"]').type('Another New Item');
      cy.get('[data-test-id="ei-new-amount-input"]').type('123');
      cy.get('[data-test-id="ei-add-btn"]').click();

      cy.get('[data-test-id="name-1"]').should('contain', 'Another New Item');
      cy.get('[data-test-id="amount-1"]').should('contain', '123');
      cy.get('[data-test-id="empty-inventory"]').should('not.exist');
    });
  });
})