import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { useFingerprintStore } from '@/app/store/FingerprintStore'

// Initialize an agent at application startup.
const fpPromise = FingerprintJS.load();

/**
 * Get the visitor id and store it in the global zustand store.
 * If already stored, returns the stored id.
 */
export const getVisitorId = async (): Promise<string> => {
  const existing = useFingerprintStore.getState().fingerprint;
  if (existing) return existing as string;

  const fp = await fpPromise;
  const result = await fp.get();
  const id = result.visitorId;
  // persist into store for global access
  useFingerprintStore.setState({ fingerprint: id });
  return id;
}

// Optionally run at module load for eager resolution (keeps previous behavior)
(async () => {
  try {
    const id = await getVisitorId();
    // keep a console.log for parity with previous implementation
    console.log(id);
  } catch {
    // ignore errors during init
  }
})();

export default getVisitorId;