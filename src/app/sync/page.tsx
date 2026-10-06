import { SyncManager } from '@/components/sync-manager';
import { syncRepository } from '@/lib/data/repositories/syncRepository';

export default async function SyncPage() {
  const jobs = await syncRepository.getAll();

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">Sync</div>
          <h2>Synchronization monitoring</h2>
        </div>
      </div>

      <SyncManager initialJobs={jobs} />
    </>
  );
}
