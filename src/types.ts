export type PastelColorId = 'peach' | 'mint' | 'lavender' | 'sky' | 'lemon' | 'rose';

export interface PastelColorConfig {
  id: PastelColorId;
  name: string;
  bg: string;
  border: string;
  text: string;
  subtext: string;
  accent: string;
  chipBg: string;
  chipActiveBorder: string;
  shadow: string;
}

export interface GuestbookEntry {
  id: string | number;
  timestamp: string;
  name: string;
  message: string;
  color: PastelColorId;
  mood: string;
  likes?: number;
}

export type ConnectionStatus = 'disconnected' | 'testing' | 'connected' | 'error';
