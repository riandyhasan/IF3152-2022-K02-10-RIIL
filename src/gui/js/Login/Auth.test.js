import { Auth } from "./Auth";

test("Jika password salah", () => {
  expect(Auth.validateAuth("kamunanyeu?")).toBe(false);
});

test("Jika password benar", () => {
  expect(Auth.validateAuth("RIILBGT")).toBe(true);
});