import { Login } from "./Login";

test("Jika form kosong", () => {
  expect(Login.validateForm("")).toBe(false);
});

test("Jika form tidak kosong", () => {
  expect(Login.validateForm("RIILBGT")).toBe(true);
});