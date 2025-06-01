export type RootStackParamList = {
    Home: {course : Course} | undefined;
    Search: undefined;
};

export type Course = {
    subject: string;
    startHour: number;
    endHour: number;
    day: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';
  };