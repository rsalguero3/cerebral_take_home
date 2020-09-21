import OnboardingService from './OnboardingService';

export default class OnboardingRepository {
  private static instance: OnboardingRepository;

  private constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new OnboardingRepository();
    }
    return this.instance;
  }

  public getOnboardingQuestions() {
    return OnboardingService.fetchOnboardingQuestions();
  }
}
