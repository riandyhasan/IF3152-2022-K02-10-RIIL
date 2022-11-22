import { Login } from "./Login.js";
describe("Testing Kelas Login", () => {
  test("Jika form login kosong", () => {
    expect(Login.validateForm("")).toBe(false);
  });

  test("Jika form login tidak kosong", () => {
    expect(Login.validateForm("RIILBGT")).toBe(true);
  });

  test("Test prosedur sendForm()", () => {
    expect(typeof Login.sendForm).toBe("function");
  });
});