import { AvailabilitySlot } from "@models/ISpecialist";
import { Theme } from "@mui/material";

export const getStyles = (name: string, selected: readonly string[], theme: Theme) => {
  return {
    fontWeight: selected.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export type SpecialistFormValues = {
  avatar: File | null;
  email: string;
  dateOfBirth: string;
  gender: string;
  bio: string;
  dateOfStart: string;
  mainAreas: string[];
  secondaryAreas: string[];
  excludedAreas: string[];
  methods: string[];
  specialNeeds: string[];
  availability: {
    dayOfWeek: string;
    from: string;
    to: string;
  }[];
};

export const DEFAULT_AVAILABILITY: AvailabilitySlot[] = [
  { dayOfWeek: 'monday', from: '08:00', to: '17:00' },
  { dayOfWeek: 'tuesday', from: '08:00', to: '17:00' },
  { dayOfWeek: 'wednesday', from: '08:00', to: '17:00' },
  { dayOfWeek: 'thursday', from: '08:00', to: '17:00' },
  { dayOfWeek: 'friday', from: '08:00', to: '17:00' },
];

export const dayLabels: Record<string, string> = {
    monday: 'Понеділок',
    tuesday: 'Вівторок',
    wednesday: 'Середа',
    thursday: 'Четвер',
    friday: 'П’ятниця',
    saturday: 'Субота',
    sunday: 'Неділя',
  };

export const days = Object.keys(dayLabels);
