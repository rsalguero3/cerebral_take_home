export interface Options {
  value: number;
  label: string;
  trigger: string;
}

export default interface ChatBotStep {
  id: number;
  message?: string;
  options?: Options[];
  trigger?: string;
  validator?(value, regex);
  validation?: any;
  end?: boolean;
  hideText?: boolean;
}
