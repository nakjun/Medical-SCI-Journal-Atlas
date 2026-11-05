import jmirPlosResearch from '../docs/research/jmir-plos-metrics-2026-11-05.json' with { type: 'json' };
import wileyResearch from '../docs/research/wiley-editorial-metrics-2026-11-05.json' with { type: 'json' };
import springerResearch from '../docs/research/springer-editorial-metrics-2026-11-05.json' with { type: 'json' };
import elsevierResearch from '../docs/research/elsevier-editorial-metrics-2026-11-05.json' with { type: 'json' };
import ieeeResearch from '../docs/research/ieee-editorial-metrics-2026-11-05.json' with { type: 'json' };
import iopResearch from '../docs/research/iop-editorial-metrics-2026-11-05.json' with { type: 'json' };
import taylorFrancisResearch from '../docs/research/taylor-francis-editorial-metrics-2026-11-05.json' with { type: 'json' };

// Add future publisher research snapshots here; missing values never become 0%.
export const editorialResearch = [wileyResearch, springerResearch, elsevierResearch, ieeeResearch, iopResearch, taylorFrancisResearch, jmirPlosResearch];
const metricsById = new Map(editorialResearch.flatMap(research => research.journals.map(metric => [metric.journalId, metric])));

export function getEditorialMetrics(journal) {
  const metric = metricsById.get(journal.id);
  if (!metric || metric.name !== journal.name || !Number.isFinite(metric.acceptanceRatePercent)
    || metric.acceptanceRatePercent < 0 || metric.acceptanceRatePercent > 100) return null;
  return metric;
}
