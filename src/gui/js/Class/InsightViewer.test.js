import { InsightViewer } from "./InsightViewer";

describe("Testing Kelas InsightViewer", () => {
  test("Test prosedur sendForm()", () => {
    const viewer = new InsightViewer();
    expect(typeof viewer.showCart).toBe("function");
  });
});