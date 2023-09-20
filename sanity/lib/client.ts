import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "../env";

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token: "skQTqB6hvaiVaHEUftQjBc9y6RrUsVmeLPBN3scR13CSnobks4A9IIpdruy2FfgA1IY59dp2diA41u9GJdCRsjxKKGrox8EstsYuxHtMvHwtKe1krzDnjmYUiem31oXRPL4kQvdF6epuYc5YThOZsAsAVzceYhycbhGnCyI2579910DfJSvi",
});
