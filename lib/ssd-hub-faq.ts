/**
 * Main SSD hub FAQ — used for on-page `<details>` and FAQPage JSON-LD (keep in sync).
 */
export type SsdHubFaqItem = { q: string; a: string }

export const SSD_HUB_FAQ: SsdHubFaqItem[] = [
  {
    q: 'What is a Backyard Small Second Home in Victoria?',
    a: 'Same meaning as the headline and Quick Answer: a Victorian SSD — second dwelling on one title within the published tests (including the 60 sqm GFA cap, siting, all-electric, no subdivision). Formal provisions sit in the planning scheme and State amendments such as VC253/VC282 — always confirm against your title.',
  },
  {
    q: 'Do I need a planning permit for a backyard second home in Victoria?',
    a: 'Not always. If your proposal meets every Deemed-to-Comply test for the SSD pathway (sometimes described as a “Green Lane” style outcome), you may not need a planning permit. Heritage, flood, bushfire, and other overlays, or siting and size issues, can still require a planning permit, VicSmart, or a full planning process. Nothing is guaranteed until your site is checked against current instruments.',
  },
  {
    q: 'Do I still need a building permit if planning is not required?',
    a: 'Yes. A building permit is separate from planning. You still need compliance with the National Construction Code, energy provisions, and structural safety through a registered building surveyor — even when no planning permit is required.',
  },
  {
    q: 'Can the second dwelling have gas connected?',
    a: 'Under the SSD framework the second dwelling is required to be all-electric — reticulated gas to that dwelling is not consistent with the usual SSD model. If you need gas, you are likely outside this pathway.',
  },
  {
    q: 'Can I subdivide and sell the second home on its own block?',
    a: 'No. An SSD must stay on the same title as the main dwelling. If you need a separate lot to sell, you are not using the SSD pathway.',
  },
  {
    q: 'What if my property has a heritage overlay or is in a bushfire area?',
    a: 'Overlays do not disappear because the building is small. Bushfire management, heritage controls, flood, and other layers can still trigger planning or change how you meet SSD tests. Use the Victoria rules summary and the feasibility check to see what typically applies, then verify with your council and professionals.',
  },
  {
    q: 'How big can the second dwelling be under SSD?',
    a: 'The State cap for a Small Second Dwelling is 60 sqm gross floor area for that second dwelling. More than that is outside the SSD framework and usually means a standard planning route.',
  },
]
