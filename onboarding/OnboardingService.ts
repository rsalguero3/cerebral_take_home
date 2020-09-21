import Request from '../network/Request';
import URL from '../constant/Url';


export default class OnboardingService {
  private constructor() {}

  /**
   * Retrieves questions to be ask.
   * @returns {Promise<R>} the questions and possible paths in JSON format.
   */
  public static fetchOnboardingQuestions(): Promise<any> {
    return new Promise((resolve, reject) => {
      Request.enqueue({
        url: URL.ONBOARDING_QUESTIONS(),
        method: 'get',
      })
        .then((res) => {

        })
        .catch((e) => {
          reject(e);
          console.log(e);
        });
    });
  }
}
