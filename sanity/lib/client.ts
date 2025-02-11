import { createClient } from 'next-sanity'

import { apiVersion, dataset, token, projectId } from '../env'

export const sanity = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
