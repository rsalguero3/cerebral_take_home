export default interface OnboardingQuestion {
  id: number;
  question: string;
  style?: string;
  validation: any;
  paths?: any;
}
