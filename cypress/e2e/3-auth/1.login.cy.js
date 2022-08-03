/// <reference types="cypress" />

describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="username"]').clear()
    cy.get('input[name="password"]').clear()
  })

  it('login button is enabled when form is valid', () => {
    cy.get('input[name="username"]').clear()
    cy.get('input[name="password"]').clear()
    cy.get('input[name="username"]').type('Mario')
    cy.get('input[name="password"]').type('Rossi')
    cy.get('button').should('be.enabled')
  })

  it('login button is enabled when form is not valid', () => {
    cy.get('input[name="username"]').type('Ma')
    cy.get('input[name="password"]').type('12')
    cy.get('button').should('be.disabled')
  })
})
