import { IRoadMark, IRoadSign, ITestPdr, ITrafficRule } from "./databaseTables.ts";

interface IState {
  sign: IRoadSign | undefined;
  mark: IRoadMark | undefined;
  test: ITestPdr | undefined;
  rule: ITrafficRule | undefined;
}

const state: IState = {
  sign: undefined,
  mark: undefined,
  test: undefined,
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
    get test() {
      return state.test;
    },
    get rule() {
      return state.rule;
    },
  },

  set: {
    set sign(newValue: IRoadSign) {
      state.sign = newValue;
    },
    set mark(newValue: IRoadMark) {
      state.mark = newValue;
    },
    set test(newValue: ITestPdr) {
      state.test = newValue;
    },
    set rule(newValue: ITrafficRule) {
      state.rule = newValue;
    },
  },
};

export default Store;
