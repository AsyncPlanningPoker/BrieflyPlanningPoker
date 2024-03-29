<template>
  <div class="user-profile">
    <aside>
      <BSidebar />
    </aside>

    <BModal
      color="gray-30"
      :open="deleteAccountModal"
    >
      <FConfirmation
        action="delete"
        message="Are you sure you want to delete your account?"
        @close="hideDeleteAccountModal"
        @confirm="onDelete"
      />
    </BModal>

    <main>
      <BContainer class="user-profile__form-container">
        <Form
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
import BSidebar from '../components/b-sidebar.vue';
import BText from '../components/b-text.vue';
import router from '../router';
import FConfirmation from '../forms/f-confirmation.vue';

export default {
  name: 'UserProfile',

  components: {
    BButton,
    BContainer,
    BInput,
    BInputField,
    BModal,
    BSidebar,
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
  min-height: 100vh;

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
    margin-left: 68px;

    @media (min-width: 768px) {
      margin-left: 120px;
    }
  }
}

.user-profile__form-container {
  display: block;
  margin: auto;
  width: 80%;

  @media (min-width: 768px) {
    width: 350px;
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
</style>
