import { getByText, wait } from "@testing-library/dom"
import { Akkordeon } from "./akkordeon"

let dl

beforeEach(() => {
  const div = document.createElement("div")
  div.innerHTML = `
      <dl id="my-accordion" class="Akkordeon">
        <dt class="Akkordeon-title"><span class="Akkordeon-expansionIcon"></span>Vanity</dt>
        <dd class="Akkordeon-content">
          Prettiest accordion
        </dd>
        <dt class="Akkordeon-title"><span class="Akkordeon-expansionIcon"></span>Anger</dt>
        <dd class="Akkordeon-content">
          Accordions are hard
        </dd>
        <dt class="Akkordeon-title"><span class="Akkordeon-expansionIcon"></span>Envy</dt>
        <dd class="Akkordeon-content">
          His amazing accordion
        </dd>
      </dl>
    `
  dl = div.children[0]
})

describe("Akkordeon", () => {
  it("initialises all content nodes as hidden", () => {
    new Akkordeon(dl, { delay: 0 })

    expect(getByText(dl, /prettiest/i).classList).toContain("is-hidden")
    expect(getByText(dl, /accordions are hard/i).classList).toContain(
      "is-hidden",
    )
    expect(getByText(dl, /his amazing accordion/i).classList).toContain(
      "is-hidden",
    )
  })

  it("expands content when title is clicked and retracts when clicked again", async () => {
    new Akkordeon(dl)

    getByText(dl, /vanity/i).click()
    expect(getByText(dl, /prettiest/i).classList).not.toContain("is-hidden")

    await wait(() => {
      getByText(dl, /vanity/i).click()
      expect(getByText(dl, /prettiest/i).classList).toContain("is-hidden")
    })
  })
})
