import { EditorProdukForm } from './EditorProdukForm';

describe("Testing Kelas EditorProdukForm", () => {
  test("Jika form editor produk kosong", () => {
    const editor = new EditorProdukForm({});
    expect(editor.validateForm()).toBe(false);
  });

  test("Jika form editor produk tidak kosong", () => {
    const editor = new EditorProdukForm({nama: 1, kategori: 1, ukuran: 1, gambar: 1, harga: 1, supplier: 1, telp: 1, kuantitas: 1})
    expect(editor.validateForm()).toBe(true);
  });

  test("Test prosedur sendForm()", () => {
    const editor = new EditorProdukForm({});
    expect(typeof editor.sendForm).toBe("function");
  });
});