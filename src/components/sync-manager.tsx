'use client';

import { useState } from 'react';
import { syncRepository } from '@/lib/data/repositories/syncRepository';
import type { SyncJob } from '@/lib/types';

export function SyncManager({ initialJobs }: { initialJobs: SyncJob[] }) {
  const [jobs, setJobs] = useState(initialJobs);

  const handleRetry = async (jobId: string) => {
    setJobs((current) => current.map((job) => (job.id === jobId ? { ...job, status: 'RUNNING' } : job)));
    await syncRepository.retry(jobId);
    const refreshed = await syncRepository.getAll();
    setJobs(refreshed);
  };

  return (
    <div className="page-stack">
      <div className="panel">
        <div className="section-header">
          <h2>Synchronization monitoring</h2>
          <span className="badge neutral">{jobs.length} jobs</span>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Marketplace</th>
                <th>Sync Type</th>
                <th>Status</th>
                <th>Started</th>
                <th>Completed</th>
                <th>Records</th>
                <th>Error</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.marketplace}</td>
                  <td>{job.syncType}</td>
                  <td>
                    <span className={`badge ${job.status === 'SUCCEEDED' ? 'success' : job.status === 'FAILED' ? 'danger' : job.status === 'RUNNING' ? 'warning' : 'neutral'}`}>
                      {job.status}
                    </span>
                  </td>
                  <td>{new Date(job.startedAt).toLocaleString()}</td>
                  <td>{job.completedAt ? new Date(job.completedAt).toLocaleString() : '—'}</td>
                  <td>{job.records}</td>
                  <td>{job.error ?? '—'}</td>
                  <td>
                    {job.status === 'FAILED' ? (
                      <button type="button" className="small-button" onClick={() => handleRetry(job.id)}>
                        Retry
                      </button>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
