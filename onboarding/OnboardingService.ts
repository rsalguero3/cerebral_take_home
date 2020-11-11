import Request from '../network/Request';
import URL from '../constant/Url';
import OnboardingQuestion from '../model/OnboardingQuestion';
import ChatBotStep, {Options} from '../model/ChatBotStep';

export default class OnboardingService {
  private constructor() {}

  /**
   * Checks the user's input value against a regex.
   * @param value user's input
   * @param regex the regex supplied from the json under 'validation'
   */
  public static createValidator(value, regex) {
    const re = regex;
    if (typeof re == 'string') {
      const reExp = new RegExp(re);
      if (reExp.test(value)) {
        return true;
      } else {
        return 'Please try again';
      }
    } else {
      return true;
    }
  }

  /**
   * If question had multiple choices, need to create an optionStep
   * @param options possible answers the user can choose
   * @param path the next questions' id for the answer
   */
  public static createOptionsSteps(options: any, path: any): Options[] {
    const optionSteps: Options[] = [];

    const yesRe = new RegExp('^(yes$|no$)');
    //Check if the path contain a yes or no question
    if (yesRe.test(Object.keys(path)[0])) {
      Object.keys(path).map((key, index) => {
        const option: Options = {
          value: ++index,
          label: key,
          trigger: path[key].toString(),
        };
        optionSteps.push(option);
      });
    } else {
      // validation contains multiple choice
      options.forEach((string, index) => {
        const option: Options = {
          value: ++index,
          label: string,
          trigger: path.toString(),
        };
        optionSteps.push(option);
      });
    }
    return optionSteps;
  }

  /**
   * Creates a step for the user's input
   * @param index adds id value
   * @param options multiple choices answers
   * @param path the path after the input or chosing the multiple choices
   * @param validation regex or a boolean, regex is used against the function validator
   * @param style the type of user input, ex. password
   */
  public static createNewStep(index: number, options, path, validation, style) {
    if (options) {
      return {
        id: index,
        options,
      };
    } else {
      return {
        id: index,
        user: true,
        trigger: path,
        validation,
        validator: this.createValidator,
        hideText: style && style == 'password',
      };
    }
  }

  /**
   * converts the JSON format to a list chatBotStep
   * @param questions OnBoarding questions
   */
  public static convertQuestionsToChatBotStep(
    questions: OnboardingQuestion[],
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      // Add the new steps to the end of the step list after function is over.
      let stepList: ChatBotStep[] = [];
      const newStepList: ChatBotStep[] = [];
      const stepLength = questions.length;
      let lastStepIndex = stepLength - 1;
      questions.forEach((q, index) => {
        lastStepIndex++;
        const step: ChatBotStep = {
          trigger:
            // if validation is first or false, do not create a trigger, leave blank.
            typeof q.validation === 'boolean' && !q.validation && index != 0
              ? ''
              : lastStepIndex.toString(),
          id: q.id,
          message: q.question,
        };
        //validation is array it will contain multiple choices or a yes or no question.
        if (Array.isArray(q.validation)) {
          const options = this.createOptionsSteps(q.validation, q.paths);
          const newStep = this.createNewStep(
            lastStepIndex,
            options,
            undefined,
            undefined,
            undefined,
          );
          newStepList.push(newStep);
        } else {
          // question is asking for user input.
          const newStep = this.createNewStep(
            lastStepIndex,
            undefined,
            q.paths,
            q.validation,
            q.style,
          );
          newStepList.push(newStep);
        }
        stepList.push(step);
      });
      // first question from Json is a negative number.
      const negativeStep = stepList[0];
      stepList = stepList.slice(1);
      stepList.push(negativeStep);
      stepList = stepList.concat(newStepList);
      resolve(stepList);
    });
  }
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
          const questions: OnboardingQuestion[] = [];
          for (const step of res.data) {
            const question: OnboardingQuestion = <OnboardingQuestion>step;
            questions.push(question);
          }
          this.convertQuestionsToChatBotStep(questions).then((steps) => {
            resolve(steps);
          });
        })
        .catch((e) => {
          reject(e);
          console.log(e);
        });
    });
  }
}
