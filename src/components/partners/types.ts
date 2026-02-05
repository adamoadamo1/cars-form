export interface PartnerConfig {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  mission: string;
  impact: string;
  logo: string;
  color: string;
  colorLight: string;
  colorMid: string;

  // Custom copy per screen (supports {car} interpolation)
  welcome: { h: string; s: string };
  reason: { h: string; s: string };
  memories: { h: string; s: string };
  condition: { h: string; s: string };
  causeSub: string;
  story: string;
  done: { h: string; s: string };
}

export type PartnerId = 'stjude' | 'mow' | 'sierra';
