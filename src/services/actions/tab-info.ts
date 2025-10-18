export const TAB_ACTIONS = {
  CHANGE_TAB: "CHANGE_TAB",
};

export interface ITabAction {
  type: typeof TAB_ACTIONS.CHANGE_TAB;
  tab: string;
}

export type TTabInfoActions = ITabAction;
