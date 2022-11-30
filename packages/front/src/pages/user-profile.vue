<template>
  <div class="user-profile">
    <div class="user-profile__sidebar">
      <div class="user-profile__sidebar-logo-wrapper">
        <a href="/">
          <img
            src="../assets/square-logo-80.png"
            alt="brand-logo"
          >
        </a>
      </div>
    </div>

    <BModal
      color="gray-30"
      :open="deleteAccountModal"
    >
      <p>Are you sure you want to delete your account?</p>
      <div class="user-profile__form-buttons">
        <BButton
          size="medium"
          variant="transparent"
          value="Cancel"
          @click="hideDeleteAccountModal"
        >
          Cancel
        </BButton>
        <BButton
          size="medium"
          value="Delete"
          @click="onDelete"
        >
          Delete
        </BButton>
      </div>
    </BModal>

    <main>
      <BContainer class="user-profile__form-container">
        <Form
          class="change-password-form"
          @submit="onSubmit"
          :validation-schema="schema"
        >
          <BInputField
            label="Old Password"
            name="oldPassword"
          >
            <BInput
              name="oldPassword"
              type="password"
            />
          </BInputField>

          <BInputField
            label="New Password"
            name="newPassword"
          >
            <BInput
              name="newPassword"
              type="password"
            />
          </BInputField>

          <BInputField
            label="Confirm Password"
            name="confirmPassword"
          >
            <BInput
              name="confirmPassword"
              type="password"
            />
          </BInputField>
          <BText
            v-if="this.$store.state.user.errorMessage"
            color="error"
            size="small"
            tag="div"
          >
            {{ this.$store.state.user.errorMessage }}
          </BText>
          <BText
            v-if="this.$store.state.user.success"
            color="success"
            size="small"
            tag="div"
          >
            Saved.
          </BText>
          <div class="user-profile__form-buttons">
            <BButton
              size="medium"
              variant="transparent"
              value="Delete Account"
              @click="showDeleteAccountModal"
            />
            <BButton
              size="medium"
              type="submit"
              value="Save"
            />
          </div>
        </Form>
      </BContainer>
    </main>
  </div>
</template>

<script>
import * as Yup from 'yup';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { Form } from 'vee-validate';
import BButton from '../components/b-button.vue';
import BContainer from '../components/b-container.vue';
import BInput from '../components/b-input.vue';
import BInputField from '../components/b-input-field.vue';
import BModal from '../components/b-modal.vue';
import BText from '../components/b-text.vue';
import router from '../router';

export default {
  name: 'UserProfile',

  components: {
    BButton,
    BContainer,
    BInput,
    BInputField,
    BModal,
    BText,
    Form,
  },
};
</script>

<script setup>
const store = useStore();

const deleteAccountModal = ref(false);
const showDeleteAccountModal = () => deleteAccountModal.value = true;
const hideDeleteAccountModal = () => deleteAccountModal.value = false;

const schema = Yup.object().shape({
  oldPassword: Yup.string().required('Old password is required.'),
  newPassword: Yup.string().required('New password is required.'),
  confirmPassword: Yup.string().required('Confirm password is required.').oneOf([Yup.ref('newPassword'), null], 'Confirm password must be equal the new password.'),
});

function onSubmit(values) {
  const { newPassword, oldPassword } = values;
  store.dispatch('updateYourself', { newPassword, oldPassword });
}

async function onDelete() {
  await store.dispatch('deleteYourself');
  router.push('/signin');
}
</script>

<style lang="scss" scoped>
.user-profile {
  display: flex;

  aside {
    max-width: 68px;
    position: fixed;

    @media (min-width: 768px) {
      max-width: 120px;
    }
  }

  main {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.user-profile__form-container {
  display: block;
  margin: var(--unit-0600);
  min-width: 70%;

  @media (min-width: 768px) {
    width: 350px;
    min-width: auto;
  }
}

.user-profile__form-buttons {
  display: flex;
  width: 100%;
  margin-top: calc(var(--unit-0300) * 1);
  margin-left: auto;
  margin-right: auto;
  flex-wrap: wrap-reverse;

  button+button {
    margin-bottom: var(--unit-0300);
  }

  @media (min-width: 768px) {
    flex-wrap: nowrap;
    margin-top: calc(var(--unit-1000) * 1);

    button+button {
      margin-bottom: 0;
      margin-left: var(--unit-0300);
    }
  }
}

.user-profile__sidebar {
  align-content: start;
  background-color: var(--color-black);
  display: grid;
  height: calc(100vh - 2 * var(--unit-0900));
  justify-items: center;
  padding: var(--unit-0900);
  row-gap: var(--unit-0900);

  @media (max-width: 768px) {
    height: calc(100vh - (2 * var(--unit-0300)));
    padding: var(--unit-0300);
    row-gap: var(--unit-0600);
  }
}

.user-profile__sidebar-logo-wrapper {
  cursor: pointer;
  height: calc(12 * var(--unit-0100));
  width: calc(12 * var(--unit-0100));

  @media (max-width: 768px) {
    height: calc(11 * var(--unit-0100));
    width: calc(11 * var(--unit-0100));
  }

  & img {
    height: 100%;
    width: 100%;
  }
}
</style>
