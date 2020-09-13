export type apiInformationType = {
  actionName: string;
  controllerName: string;
};

export type GeneralComponent =
  | React.ComponentClass<any, any>
  | React.FunctionComponent<any>;

export type routeDetailType = {
  path: string;
  component: GeneralComponent;
  children?: routeDetailType[];
  label?: string;
};

export type TselectOptions = {
  label: string;
  value: string;
};

export type TSelectOption = {
  label: string;
  value: string;
};

export type TSelectOptions = TSelectOptions[];

export type TTranslationFunction = (translationKey: string) => string;
