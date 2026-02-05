import { PartnerConfig, PartnerId } from './types';

export const partners: Record<PartnerId, PartnerConfig> = {
  stjude: {
    id: 'stjude',
    name: "St. Jude Children's Research Hospital",
    shortName: "St. Jude",
    tagline: "Finding cures. Saving children.",
    mission: "To advance cures and means of prevention for pediatric catastrophic diseases through research and treatment. No child is denied treatment based on race, religion, or a family's ability to pay.",
    impact: "9,000+ patients yearly · Survival up from 20% to 80%+",
    logo: "🏥",
    color: "#C10F3A",
    colorLight: "#C10F3A12",
    colorMid: "#C10F3A30",
    welcome: {
      h: "Your car can help save a child's life.",
      s: "When you donate through CARS, proceeds go directly to St. Jude — where families never receive a bill for treatment, travel, housing, or food."
    },
    reason: {
      h: "Why are you letting go?",
      s: "Whatever the reason, it means a child at St. Jude gets closer to a cure."
    },
    memories: {
      h: "What memories does {car} hold?",
      s: "Your car carried your story. Now it can help write a child's."
    },
    condition: {
      h: "How's {car} doing?",
      s: "Any condition — St. Jude needs help in every form."
    },
    causeSub: "This helps St. Jude understand the people behind their mission.",
    story: "to help the kids at St. Jude get the treatment they deserve",
    done: {
      h: "A child just got closer to a cure.",
      s: "Because of your donation, St. Jude families will never receive a bill. We'll reach out within 24 hours to schedule your free pickup."
    }
  },

  mow: {
    id: 'mow',
    name: "Meals on Wheels America",
    shortName: "Meals on Wheels",
    tagline: "Together, we can deliver.",
    mission: "To empower local community programs to improve the health and quality of life of seniors, so that no one is left hungry or isolated.",
    impact: "251M meals · 2.2M seniors served · 5,000+ programs",
    logo: "🍽️",
    color: "#0077B6",
    colorLight: "#0077B612",
    colorMid: "#0077B630",
    welcome: {
      h: "Your car can deliver a meal — and a moment of connection.",
      s: "When you donate through CARS, proceeds support Meals on Wheels — delivering nutritious meals, friendly visits, and safety checks to seniors who need them most."
    },
    reason: {
      h: "Why are you letting go?",
      s: "Whatever brings you here, it means a senior won't go hungry tonight."
    },
    memories: {
      h: "What memories does {car} hold?",
      s: "Your car carried you through life. Now it can carry a warm meal to someone's door."
    },
    condition: {
      h: "How's {car} doing?",
      s: "Running or not — every vehicle helps end the wait."
    },
    causeSub: "1 in 3 providers has a waitlist. Your donation helps end it.",
    story: "so a senior neighbor won't spend tonight hungry or alone",
    done: {
      h: "A senior just got off the waitlist.",
      s: "A Meals on Wheels volunteer will knock on someone's door with a warm meal — and a reason to smile. We'll reach out within 24 hours."
    }
  },

  sierra: {
    id: 'sierra',
    name: "Sierra Club Foundation",
    shortName: "Sierra Club Foundation",
    tagline: "Explore. Enjoy. Protect.",
    mission: "To educate, inspire, and empower people to protect the natural and human environment — through climate solutions, conservation, and grassroots advocacy.",
    impact: "2.4M+ acres protected · 389 coal plants retired · 132 years of impact",
    logo: "🌲",
    color: "#2d6a4f",
    colorLight: "#2d6a4f12",
    colorMid: "#2d6a4f30",
    welcome: {
      h: "Your car can protect wild places.",
      s: "When you donate through CARS, proceeds support the Sierra Club Foundation — driving climate solutions, protecting public lands, and building a movement for the planet."
    },
    reason: {
      h: "Why are you letting go?",
      s: "Whatever the reason, it means cleaner air and wilder places for everyone."
    },
    memories: {
      h: "What memories does {car} hold?",
      s: "Your car took you places. Now it can help protect them."
    },
    condition: {
      h: "How's {car} doing?",
      s: "Any condition — even retired cars can fuel a clean energy future."
    },
    causeSub: "This helps the Sierra Club Foundation understand the people powering their movement.",
    story: "to protect the wild places and clean air we all share",
    done: {
      h: "The planet just got a little more hope.",
      s: "Your donation supports climate solutions, conservation, and grassroots advocacy. We'll reach out within 24 hours to schedule your free pickup."
    }
  }
};

export function getPartner(id: PartnerId | null): PartnerConfig | null {
  if (!id) return null;
  return partners[id] || null;
}
