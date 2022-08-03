const API = Cypress.env('REACT_APP_BASE_API');

const mockData = [
  {id: 1, name: 'Fabio', role: 'admin', description: 'bla bla fabbbio'},
  {id: 2, name: 'Lorenzo', role: 'editor', description: 'bla bla lollo'},
  {id: 3, name: 'Silvia', role: 'editor', description: 'bla bla Silvy'},
]

describe('Cities Page', () => {
  beforeEach(() => {
    // Mock Login
    cy.intercept(
      `${API}/login`,
      {method: 'GET'},
      {accessToken: 123}
    )

    // Do login
    cy.login('Fabio', 'Biondi')

    // Mock Cities request and provide mock data
    cy.intercept(`${API}/users`, {method: 'GET'}, mockData)
    cy.visit('http://localhost:3000/users');
  })


  it(`should display ${mockData.length} elements in the list`, () => {
    cy.get('[data-testid="user-list"]').children().should('have.length', mockData.length)
  })

  it(`should properly display the first element`, () => {
    cy.get('[data-testid="user-list"]').first().contains(mockData[0].name) // Fabio
  })

  it(`should properly display the last element`, () => {
    cy.get('[data-testid="user-list"]').last().contains(mockData[mockData.length - 1].name) // Silvia
  })

})
