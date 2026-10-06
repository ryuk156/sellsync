import { mockSyncJobs } from '@/lib/data/mock/syncJobs';
import type { SyncJob, SyncRepository } from '@/lib/types';

const storageKey = 'sellsync-sync-jobs';

function readSyncJobs(): SyncJob[] {
  if (typeof window === 'undefined') {
    return mockSyncJobs;
  }

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      window.localStorage.setItem(storageKey, JSON.stringify(mockSyncJobs));
      return mockSyncJobs;
    }

    return JSON.parse(raw) as SyncJob[];
  } catch {
    return mockSyncJobs;
  }
}

function persistSyncJobs(jobs: SyncJob[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(jobs));
}

export const syncRepository: SyncRepository = {
  async getAll(): Promise<SyncJob[]> {
    return readSyncJobs();
  },

  async retry(id: string): Promise<void> {
    const current = readSyncJobs();
    const index = current.findIndex((job) => job.id === id);

    if (index === -1) {
      return;
    }

    const currentJob = current[index];
    const runningJob: SyncJob = {
      ...currentJob,
      status: 'RUNNING',
      completedAt: undefined,
      error: undefined,
    };

    const next = [...current];
    next[index] = runningJob;
    persistSyncJobs(next);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const succeededJob: SyncJob = {
      ...runningJob,
      status: 'SUCCEEDED',
      completedAt: new Date().toISOString(),
      durationSeconds: 2.4,
      error: undefined,
    };

    const finalJobs = [...readSyncJobs()];
    finalJobs[index] = succeededJob;
    persistSyncJobs(finalJobs);
  },
};

// TODO: Replace this mock repository with a PostgreSQL/Supabase repository when the real database is configured.
