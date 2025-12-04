export type TabOption = 'install' | 'manual' | 'features';

export interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
}