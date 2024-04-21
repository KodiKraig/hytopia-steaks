import { toTOPIA } from "../utils"

describe("Test utils", () => {
  describe("toTOPIA", () => {
    it("single TOPIA", () => {
      expect(toTOPIA("1000000000000000000")).toBe("1.0")
    })

    it("many TOPIA", () => {
      expect(toTOPIA("1231231243242342342342342")).toBe("1231231.243242342342342342")
    })
  })
})
