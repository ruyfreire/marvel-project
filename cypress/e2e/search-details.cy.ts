describe('Navigation on hero', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should enter details hero and navigate tabs', () => {
    cy.get('[data-testid^="hero-card-"]').should('have.length', 20)

    cy.get('[data-hero-name="Wolverine"]').click()

    cy.location('pathname').should('contain', '/detalhes/')

    cy.get('[data-testid="hero-name"]').should('have.text', 'Wolverine')

    cy.get('[data-testid^="card-tab-"]').should('have.length', 20)

    cy.get('[data-testid="pagination-previous"]').should('be.disabled')
    cy.get('[data-testid="pagination-next"]').should('not.be.disabled')

    cy.get('[data-testid="pagination-next"]').click()

    cy.get('[data-testid^="card-tab-"]').should('have.length', 2)

    cy.get('[data-testid="pagination-previous"]').should('not.be.disabled')
    cy.get('[data-testid="pagination-next"]').should('be.disabled')

    cy.get('[data-testid="tab-series"]').click()
    cy.get('[data-testid="no-card-tab"]').should(
      'have.text',
      'Nada foi encontrado!',
    )

    cy.get('[data-testid="tab-stories"]').click()
    cy.get('[data-testid^="card-tab-"]').should('have.length', 2)
  })
})
