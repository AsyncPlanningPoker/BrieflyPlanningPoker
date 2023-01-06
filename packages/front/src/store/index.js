import { createStore } from 'vuex';
import { signInStore } from './sign-in';
import { signUpStore } from './sign-up';
import { passRecoveryOneStore } from './pass-recovery-one';
import { passRecoveryTwoStore } from './pass-recovery-two';
import { userStore } from './user';
import squads from './squads';
import tasks from './tasks';

export default createStore({
  modules: {
    signIn: signInStore,
    signUp: signUpStore,
    passRecoveryOne: passRecoveryOneStore,
    passRecoveryTwo: passRecoveryTwoStore,
    squads,
    tasks,
    user: userStore,
  },
});
