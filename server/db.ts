import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  savedGames, 
  InsertSavedGame, 
  userFiles, 
  InsertUserFile,
  gameCollections,
  InsertGameCollection
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============================================
// Saved Games Functions
// ============================================

export async function createSavedGame(game: InsertSavedGame) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(savedGames).values(game);
  return { id: Number(result[0].insertId) };
}

export async function getUserSavedGames(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(savedGames)
    .where(eq(savedGames.userId, userId))
    .orderBy(desc(savedGames.createdAt));
}

export async function deleteSavedGame(id: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Verify ownership before deleting
  const game = await db.select().from(savedGames)
    .where(eq(savedGames.id, id))
    .limit(1);
  
  if (game.length === 0 || game[0].userId !== userId) {
    throw new Error("Game not found or unauthorized");
  }
  
  await db.delete(savedGames).where(eq(savedGames.id, id));
  return { success: true };
}

export async function updateSavedGame(id: number, userId: number, data: Partial<InsertSavedGame>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Verify ownership before updating
  const game = await db.select().from(savedGames)
    .where(eq(savedGames.id, id))
    .limit(1);
  
  if (game.length === 0 || game[0].userId !== userId) {
    throw new Error("Game not found or unauthorized");
  }
  
  await db.update(savedGames)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(savedGames.id, id));
  
  return { success: true };
}

// ============================================
// User Files Functions
// ============================================

export async function createUserFile(file: InsertUserFile) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(userFiles).values(file);
  return { id: Number(result[0].insertId) };
}

export async function getUserFiles(userId: number, fileType?: string) {
  const db = await getDb();
  if (!db) return [];
  
  let query = db.select().from(userFiles)
    .where(eq(userFiles.userId, userId))
    .orderBy(desc(userFiles.createdAt));
  
  return query;
}

export async function deleteUserFile(id: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Verify ownership before deleting
  const file = await db.select().from(userFiles)
    .where(eq(userFiles.id, id))
    .limit(1);
  
  if (file.length === 0 || file[0].userId !== userId) {
    throw new Error("File not found or unauthorized");
  }
  
  await db.delete(userFiles).where(eq(userFiles.id, id));
  return { success: true, fileKey: file[0].fileKey };
}

export async function getUserFileById(id: number, userId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(userFiles)
    .where(eq(userFiles.id, id))
    .limit(1);
  
  if (result.length === 0 || result[0].userId !== userId) {
    return null;
  }
  
  return result[0];
}

// ============================================
// Game Collections Functions
// ============================================

export async function createGameCollection(collection: InsertGameCollection) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(gameCollections).values(collection);
  return { id: Number(result[0].insertId) };
}

export async function getUserCollections(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(gameCollections)
    .where(eq(gameCollections.userId, userId))
    .orderBy(desc(gameCollections.createdAt));
}

export async function deleteGameCollection(id: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const collection = await db.select().from(gameCollections)
    .where(eq(gameCollections.id, id))
    .limit(1);
  
  if (collection.length === 0 || collection[0].userId !== userId) {
    throw new Error("Collection not found or unauthorized");
  }
  
  await db.delete(gameCollections).where(eq(gameCollections.id, id));
  return { success: true };
}
