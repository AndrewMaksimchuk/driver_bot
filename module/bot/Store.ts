import { IRoadSign, IRoadMark } from "./databaseTables.ts";

interface IState {
  sign: IRoadSign | undefined;
  mark: IRoadMark | undefined;
  rule: string | undefined;
}

const state: IState = {
  sign: undefined,
  mark: undefined,
  rule: undefined,
};

const Store = {
  get: {
    get sign() {
      return state.sign;
    },
    get mark() {
      return state.mark;
    },
    get rule() {
      return state.rule;
    },
  },

  set: {
    set sign(newValue: IRoadSign) {
      state.sign = { ...newValue };
    },
    set mark(newValue: IRoadMark) {
      state.mark = { ...newValue };
    },
    set rule(newValue: string) {
      state.rule = newValue;
    },
  },
};

export default Store;
