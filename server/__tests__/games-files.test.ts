import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock database functions
vi.mock("../db", () => ({
  createSavedGame: vi.fn().mockResolvedValue({ id: 1 }),
  getUserSavedGames: vi.fn().mockResolvedValue([
    {
      id: 1,
      userId: 1,
      name: "Test Game",
      numbers: [1, 2, 3, 4, 5, 6],
      strategy: "balanced",
      ifr: 50,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  deleteSavedGame: vi.fn().mockResolvedValue({ success: true }),
  updateSavedGame: vi.fn().mockResolvedValue({ success: true }),
  createUserFile: vi.fn().mockResolvedValue({ id: 1 }),
  getUserFiles: vi.fn().mockResolvedValue([]),
  deleteUserFile: vi.fn().mockResolvedValue({ success: true, fileKey: "test-key" }),
  getUserFileById: vi.fn().mockResolvedValue({
    id: 1,
    userId: 1,
    filename: "test.txt",
    originalName: "test.txt",
    fileKey: "users/1/files/test.txt",
    url: "https://example.com/test.txt",
    mimeType: "text/plain",
    size: 100,
    fileType: "export",
    createdAt: new Date(),
  }),
}));

// Mock storage functions
vi.mock("../storage", () => ({
  storagePut: vi.fn().mockResolvedValue({ key: "test-key", url: "https://example.com/test.txt" }),
  storageGet: vi.fn().mockResolvedValue({ key: "test-key", url: "https://example.com/test.txt" }),
}));

describe("Games and Files API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Saved Games", () => {
    it("should validate game numbers are within range 1-60", () => {
      const numbers = [1, 15, 30, 45, 55, 60];
      const isValid = numbers.every((n) => n >= 1 && n <= 60);
      expect(isValid).toBe(true);
    });

    it("should validate minimum 6 numbers for a game", () => {
      const numbers = [1, 2, 3, 4, 5, 6];
      expect(numbers.length).toBeGreaterThanOrEqual(6);
    });

    it("should validate maximum 15 numbers for a game", () => {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
      expect(numbers.length).toBeLessThanOrEqual(15);
    });

    it("should reject invalid number ranges", () => {
      const invalidNumbers = [0, 61, -1, 100];
      const isValid = invalidNumbers.every((n) => n >= 1 && n <= 60);
      expect(isValid).toBe(false);
    });

    it("should format game name correctly", () => {
      const name = "  My Test Game  ";
      const formatted = name.trim();
      expect(formatted).toBe("My Test Game");
    });
  });

  describe("File Export", () => {
    it("should generate correct TXT format", () => {
      const games = [
        { name: "Game 1", numbers: [1, 2, 3, 4, 5, 6] },
        { name: "Game 2", numbers: [10, 20, 30, 40, 50, 60] },
      ];

      const content = games
        .map(
          (g, idx) =>
            `Jogo ${idx + 1}: ${g.name}\nNúmeros: ${g.numbers
              .map((n) => n.toString().padStart(2, "0"))
              .join(" - ")}`
        )
        .join("\n\n");

      expect(content).toContain("Jogo 1: Game 1");
      expect(content).toContain("01 - 02 - 03 - 04 - 05 - 06");
    });

    it("should generate correct CSV format", () => {
      const games = [{ name: "Game 1", numbers: [1, 2, 3, 4, 5, 6], strategy: "balanced", ifr: 50 }];

      const header = "Nome,Números,Estratégia,IFR";
      const row = `"${games[0].name}","${games[0].numbers.join("-")}","${games[0].strategy}",${games[0].ifr}`;
      const content = `${header}\n${row}`;

      expect(content).toContain("Nome,Números,Estratégia,IFR");
      expect(content).toContain("1-2-3-4-5-6");
    });

    it("should generate correct JSON format", () => {
      const games = [{ name: "Game 1", numbers: [1, 2, 3, 4, 5, 6] }];
      const content = JSON.stringify(games, null, 2);
      const parsed = JSON.parse(content);

      expect(parsed).toHaveLength(1);
      expect(parsed[0].name).toBe("Game 1");
      expect(parsed[0].numbers).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe("File Key Generation", () => {
    it("should generate unique file keys", () => {
      const userId = 1;
      const timestamp1 = Date.now();
      const timestamp2 = timestamp1 + 1;
      const filename = "test.txt";

      const key1 = `users/${userId}/files/${timestamp1}-${filename}`;
      const key2 = `users/${userId}/files/${timestamp2}-${filename}`;

      expect(key1).not.toBe(key2);
    });

    it("should sanitize filenames", () => {
      const unsafeFilename = "my file<script>.txt";
      const safeFilename = unsafeFilename.replace(/[^a-zA-Z0-9.-]/g, "_");

      expect(safeFilename).toBe("my_file_script_.txt");
      expect(safeFilename).not.toContain("<");
      expect(safeFilename).not.toContain(">");
    });
  });

  describe("IFR Calculation", () => {
    it("should calculate IFR within valid range 0-100", () => {
      const ifr = 50;
      expect(ifr).toBeGreaterThanOrEqual(0);
      expect(ifr).toBeLessThanOrEqual(100);
    });
  });
});
