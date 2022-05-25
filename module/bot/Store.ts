import { IRoadSign } from "./databaseTables.ts";

interface IState {
  sign: IRoadSign | undefined;
  rule: string | undefined;
}

const state: IState = {
  sign: undefined,
  rule: undefined,
};

const Store = {
  get: {
    get sign() {
      return state.sign;
    },
    get rule() {
      return state.rule;
    },
  },

  set: {
    set sign(newValue: IRoadSign) {
      state.sign = { ...newValue };
    },
    set rule(newValue: string) {
      state.rule = newValue;
    },
  },
};

export default Store;
