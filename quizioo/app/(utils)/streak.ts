import * as SecureStore from "expo-secure-store";

export type StreakState = {
  visitedDays: string[];     
  currentStreak: number;     
  bestStreak: number;        
};

const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);

export const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
};

const parseDay = (key: string) => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
};

const dayDiff = (aKey: string, bKey: string) => {
  const a = parseDay(aKey).getTime();
  const b = parseDay(bKey).getTime();
  const ms = 24 * 60 * 60 * 1000;
  return Math.round((a - b) / ms);
};

const addDays = (dayKey: string, delta: number) => {
  const d = parseDay(dayKey);
  d.setDate(d.getDate() + delta);
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
};

export const streakStorageKey = (userId: string) => `streak_${userId}`;

export async function loadStreak(userId: string): Promise<StreakState> {
  const raw = await SecureStore.getItemAsync(streakStorageKey(userId));
  if (!raw) return { visitedDays: [], currentStreak: 0, bestStreak: 0 };

  try {
    const parsed = JSON.parse(raw) as Partial<StreakState>;
    const visitedDays = Array.isArray(parsed.visitedDays) ? parsed.visitedDays.filter(Boolean) : [];
    return {
      visitedDays,
      currentStreak: Number(parsed.currentStreak ?? 0),
      bestStreak: Number(parsed.bestStreak ?? 0),
    };
  } catch {
    return { visitedDays: [], currentStreak: 0, bestStreak: 0 };
  }
}

export async function saveStreak(userId: string, s: StreakState) {
  await SecureStore.setItemAsync(streakStorageKey(userId), JSON.stringify(s));
}

/**
 * Rejestruje wizytę dla dzisiejszego dnia:
 * - dopisuje today do visitedDays (bez duplikatów)
 * - przycina historię do ostatnich `keepDays` dni
 * - przelicza currentStreak i bestStreak
 */
export async function registerVisit(
  userId: string,
  opts?: { keepDays?: number }
): Promise<StreakState> {
  const keepDays = opts?.keepDays ?? 365; 
  const today = todayKey();

  const s = await loadStreak(userId);

  let visited = s.visitedDays.includes(today) ? s.visitedDays : [...s.visitedDays, today];

  visited = Array.from(new Set(visited)).sort((a, b) => parseDay(a).getTime() - parseDay(b).getTime());

  if (visited.length > keepDays) visited = visited.slice(visited.length - keepDays);

  const current = computeCurrentStreakFromVisited(visited, today);
  const best = Math.max(s.bestStreak ?? 0, current);

  const next: StreakState = {
    visitedDays: visited,
    currentStreak: current,
    bestStreak: best,
  };

  await saveStreak(userId, next);
  return next;
}

export function computeCurrentStreakFromVisited(visitedDays: string[], today: string): number {
  const visitedSet = new Set(visitedDays);
  if (!visitedSet.has(today)) return 0;

  let streak = 1;
  // cofamy się: today-1, today-2, ...
  for (let i = 1; ; i++) {
    const prev = addDays(today, -i);
    if (visitedSet.has(prev)) streak++;
    else break;
  }
  return streak;
}

export function buildWeekArrayFromVisited(visitedDays: string[], today = todayKey()): boolean[] {
  const visitedSet = new Set(visitedDays);
  const out: boolean[] = [];

  // od 6 dni temu do dziś
  for (let delta = -6; delta <= 0; delta++) {
    const day = addDays(today, delta);
    out.push(visitedSet.has(day));
  }
  return out;
}

