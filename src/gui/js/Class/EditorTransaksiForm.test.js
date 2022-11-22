import { EditorTransaksiForm } from "./EditorTransaksiForm";

describe("Testing Kelas EditorTransaksiForm", () => {
  test("Jika form editor transaksi kosong", () => {
    const editor = new EditorTransaksiForm({});
    expect(editor.validateForm()).toBe(false);
  });

  test("Jika form editor transaksi tidak kosong", () => {
    const editor = new EditorTransaksiForm({total_pembayaran: 1, metode_pembayaran: 1, waktu: 1, items: [1,2,3]})
    expect(editor.validateForm()).toBe(true);
  });

  test("Test prosedur sendForm()", () => {
    const editor = new EditorTransaksiForm({});
    expect(typeof editor.sendForm).toBe("function");
  });
});