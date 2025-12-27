import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { nanoid } from "nanoid";
import { storagePut, storageGet } from "./storage";
import {
  createSavedGame,
  getUserSavedGames,
  deleteSavedGame,
  updateSavedGame,
  createUserFile,
  getUserFiles,
  deleteUserFile,
  getUserFileById,
  createGameCollection,
  getUserCollections,
  deleteGameCollection,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Saved Games Router
  games: router({
    // List all saved games for current user
    list: protectedProcedure.query(async ({ ctx }) => {
      return getUserSavedGames(ctx.user.id);
    }),

    // Create a new saved game
    create: protectedProcedure
      .input(z.object({
        name: z.string().min(1).max(255),
        numbers: z.array(z.number().min(1).max(60)).min(6).max(15),
        strategy: z.string().optional(),
        ifr: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return createSavedGame({
          userId: ctx.user.id,
          name: input.name,
          numbers: input.numbers,
          strategy: input.strategy || null,
          ifr: input.ifr || null,
        });
      }),

    // Update a saved game
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().min(1).max(255).optional(),
        numbers: z.array(z.number().min(1).max(60)).min(6).max(15).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { id, ...data } = input;
        return updateSavedGame(id, ctx.user.id, data);
      }),

    // Delete a saved game
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return deleteSavedGame(input.id, ctx.user.id);
      }),
  }),

  // Files Router - S3 Storage Integration
  files: router({
    // List all files for current user
    list: protectedProcedure
      .input(z.object({
        fileType: z.enum(["export", "report", "backup"]).optional(),
      }).optional())
      .query(async ({ ctx, input }) => {
        return getUserFiles(ctx.user.id, input?.fileType);
      }),

    // Upload a file to S3
    upload: protectedProcedure
      .input(z.object({
        filename: z.string().min(1).max(255),
        content: z.string(), // Base64 encoded content
        mimeType: z.string().default("text/plain"),
        fileType: z.enum(["export", "report", "backup"]).default("export"),
      }))
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.user.id;
        const timestamp = Date.now();
        const uniqueId = nanoid(8);
        const safeFilename = input.filename.replace(/[^a-zA-Z0-9.-]/g, "_");
        const fileKey = `users/${userId}/files/${timestamp}-${uniqueId}-${safeFilename}`;

        // Decode base64 content
        const buffer = Buffer.from(input.content, "base64");
        const size = buffer.length;

        // Upload to S3
        const { url } = await storagePut(fileKey, buffer, input.mimeType);

        // Save metadata to database
        const result = await createUserFile({
          userId,
          filename: safeFilename,
          originalName: input.filename,
          fileKey,
          url,
          mimeType: input.mimeType,
          size,
          fileType: input.fileType,
        });

        return {
          id: result.id,
          url,
          fileKey,
          filename: safeFilename,
        };
      }),

    // Get download URL for a file
    getDownloadUrl: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        const file = await getUserFileById(input.id, ctx.user.id);
        if (!file) {
          throw new Error("File not found");
        }
        
        // Get fresh presigned URL
        const { url } = await storageGet(file.fileKey);
        return { url, filename: file.originalName };
      }),

    // Delete a file
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const result = await deleteUserFile(input.id, ctx.user.id);
        // Note: S3 file deletion would require additional implementation
        // For now, we just remove the database record
        return result;
      }),

    // Export games to file and save to S3
    exportGames: protectedProcedure
      .input(z.object({
        gameIds: z.array(z.number()).optional(),
        format: z.enum(["txt", "csv", "json"]).default("txt"),
        filename: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.user.id;
        const games = await getUserSavedGames(userId);
        
        // Filter games if specific IDs provided
        const gamesToExport = input.gameIds 
          ? games.filter(g => input.gameIds!.includes(g.id))
          : games;

        if (gamesToExport.length === 0) {
          throw new Error("No games to export");
        }

        let content: string;
        let mimeType: string;
        const dateStr = new Date().toISOString().split("T")[0];
        const defaultFilename = `mega-sena-jogos-${dateStr}`;

        switch (input.format) {
          case "csv":
            content = "Nome,Números,Estratégia,IFR,Data\n" +
              gamesToExport.map(g => 
                `"${g.name}","${(g.numbers as number[]).join("-")}","${g.strategy || ""}",${g.ifr || ""},"${g.createdAt.toISOString()}"`
              ).join("\n");
            mimeType = "text/csv";
            break;
          case "json":
            content = JSON.stringify(gamesToExport.map(g => ({
              name: g.name,
              numbers: g.numbers,
              strategy: g.strategy,
              ifr: g.ifr,
              createdAt: g.createdAt,
            })), null, 2);
            mimeType = "application/json";
            break;
          default: // txt
            content = gamesToExport.map((g, idx) => 
              `Jogo ${idx + 1}: ${g.name}\nNúmeros: ${(g.numbers as number[]).map(n => n.toString().padStart(2, "0")).join(" - ")}\nEstratégia: ${g.strategy || "N/A"}\nIFR: ${g.ifr || "N/A"}\n`
            ).join("\n---\n\n");
            mimeType = "text/plain";
        }

        const filename = `${input.filename || defaultFilename}.${input.format}`;
        const uniqueId = nanoid(8);
        const fileKey = `users/${userId}/exports/${Date.now()}-${uniqueId}-${filename}`;

        const { url } = await storagePut(fileKey, content, mimeType);

        const result = await createUserFile({
          userId,
          filename,
          originalName: filename,
          fileKey,
          url,
          mimeType,
          size: Buffer.byteLength(content, "utf8"),
          fileType: "export",
        });

        return {
          id: result.id,
          url,
          filename,
          gamesExported: gamesToExport.length,
        };
      }),
  }),

  // Collections Router
  collections: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getUserCollections(ctx.user.id);
    }),

    create: protectedProcedure
      .input(z.object({
        name: z.string().min(1).max(255),
        description: z.string().optional(),
        gameIds: z.array(z.number()),
      }))
      .mutation(async ({ ctx, input }) => {
        return createGameCollection({
          userId: ctx.user.id,
          name: input.name,
          description: input.description || null,
          gameIds: input.gameIds,
        });
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return deleteGameCollection(input.id, ctx.user.id);
      }),
  }),
});

export type AppRouter = typeof appRouter;
