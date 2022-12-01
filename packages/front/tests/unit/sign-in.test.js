import { createStore } from 'vuex';
import { screen, render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import SignIn from '../../src/pages/sign-in.vue';
import { signInStore } from '../../src/store/sign-in';

function setup() {
  const storeInstance = createStore({ modules: { signIn: signInStore } });
  render(SignIn, { global: { plugins: [storeInstance] } });
}

describe('SignIn', () => {
  it('shows an error message for required fields that are not filled', async () => {
    setup();

    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText('email is a required field')).toBeDefined();
    expect(await screen.findByText('password is a required field')).toBeDefined();
  });
});
