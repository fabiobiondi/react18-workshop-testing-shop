import {BASE_API} from "../../../src/core/config";
import {Client} from "../../../src/model/order";

describe('Cart Summary', () => {
    beforeEach(() => {
        cy.intercept(
          `${BASE_API}/orders`,
          { method: 'POST' },
          {
              statusCode: 200,
              body: {
                  ok: true
              }
          }
        ).as('orderService')

        cy.visit('http://localhost:3000/checkout');
    })

    it('should disabled "Send Order" button when form is opened first time and invalid', () => {
        cy.get('button[type=submit]').should('be.disabled')
    })

    it('should enable "Send Order" button when form is valid', () => {
        fillForm()
        cy.get('button[type=submit]').should('be.enabled')
    })

    it('should send client data via POST to the service', () => {
        const formData = fillForm()
        cy.get('button[type=submit]').click()
        cy.wait('@orderService')
          .then(xhr => {
              expect(xhr.request.method).to.eq('POST')
              expect(xhr.request.body.client).deep.equals(formData)
          })
    })
    it('should navigate to the confirm page when form is submitted', () => {
        fillForm()
        cy.get('button[type=submit]').should('be.enabled')
        cy.get('button[type=submit]').click()
        cy.location().should((location) => {
            expect(location.pathname).to.eq(`/checkout-confirm`)
        })
    })

})

function fillForm() {

    const formData: Omit<Client, 'id'> = {
        first_name: 'Mario',
        last_name: 'Rossi',
        email: 'info@mariorossi.com',
        country: 'Italy',
        street: 'Via xyz 123',
        city: 'Monfalcone',
        state_prov: 'Go',
        zip: '12345',
        notification_email: true,
        notification_sms: false,
    }

    cy.get('input[name="first_name"]').type(formData.first_name)
    cy.get('input[name="last_name"]').type(formData.last_name)
    cy.get('input[name="email"]').type(formData.email)
    cy.get('select[name="country"]').select(formData.country)
    cy.get('input[name="street"]').type(formData.street)
    cy.get('input[name="city"]').type(formData.city)
    cy.get('input[name="state_prov"]').type(formData.state_prov)
    cy.get('input[name="zip"]').type(formData.zip)

    return formData;
}
