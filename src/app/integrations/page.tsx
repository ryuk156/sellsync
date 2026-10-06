import { IntegrationManager } from '@/components/integration-manager';
import { storeRepository } from '@/lib/data/repositories/storeRepository';

export default async function IntegrationsPage() {
  const stores = await storeRepository.getAll();

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">Channels</div>
          <h2>Marketplace connections</h2>
        </div>
      </div>

      <IntegrationManager initialStores={stores} />
    </>
  );
}
