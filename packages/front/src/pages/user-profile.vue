<template>
  <div class="user-account">
    <div class="b-sidebar">
      <div class="b-sidebar__logo-wrapper">
        <a href="/">
          <img
            class="b-sidebar__image"
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
      <div class="button">
        <BButton size="medium" variant="transparent" value="Cancel" @click="hideDeleteAccountModal">Cancel</BButton>
        <BButton size="medium" value="Delete" @click="onDelete">Delete</BButton>
      </div>
    </BModal>

    <main>
      <div class="client">
        <div class="contents">
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
              class="success-text"
              size="small"
              tag="div"
            >
              Saved.
            </BText>
            <div class="button">
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
        </div>
      </div>
    </main>
  </div>
</template>

  <script>
      import * as Yup from 'yup';
      import { ref, onMounted } from 'vue';
      import { useStore } from 'vuex';
      import { Form } from 'vee-validate';
      import BButton from '../components/b-button.vue';
      import BInput from '../components/b-input.vue';
      import BInputField from '../components/b-input-field.vue';
      import BModal from '../components/b-modal.vue';
      import BText from '../components/b-text.vue';

      export default {
          // eslint-disable-next-line vue/multi-word-component-names
          name: 'UserAccount',

          components: {
              BButton,
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

      onMounted(() => store.dispatch('gatherSquadList'));

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
        window.location.href = '/';
      }
  </script>

  <style lang="scss" scoped>

  .user__section {
    margin-top: var(--unit-0500);
    padding: var(--unit-0300);

    @media (min-width: 768px) {
      padding: var(--unit-0900);
    }

    &:first-child {
      margin-top: var(--unit-0000);
    }
  }

  .user-account {
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
    }
  }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .client {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }


    .contents {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #0d0d0d;
        border-radius: 10px;
        margin: 10%;
        padding: 50px;
        max-width: 350px;
    }

    .button {
      display: flex;
      width: 100%;
      margin-top: calc(var(--unit-0300) * 1);
      margin-left: auto;
      margin-right: auto;
      flex-wrap: wrap-reverse;

      button + button {
        margin-bottom: var(--unit-0300);
      }

      @media (min-width: 768px) {
        flex-wrap: nowrap;
        margin-top: calc(var(--unit-1000) * 1);

        button + button {
          margin-bottom: 0;
          margin-left: var(--unit-0300);
        }
      }
    }
    .b-sidebar {
      align-content: start;
      background-color: var(--color-black);
      display: grid;
      height: 100vh;
      justify-items: center;
      padding: var(--unit-0900);
      row-gap: var(--unit-0900);

      @media (max-width: 768px) {
        height: 100vh;
        padding: var(--unit-0300);
        row-gap: var(--unit-0600);
      }
    }
    .b-sidebar__logo-wrapper {
      cursor: pointer;
      height: calc(12 * var(--unit-0100));
      width: calc(12 * var(--unit-0100));

      @media (max-width: 768px) {
        height: calc(11 * var(--unit-0100));
        width: calc(11 * var(--unit-0100));
      }

      & .b-sidebar__image {
        height: 100%;
        width: 100%;
      }
    }

    .success-text {
      color: var(--color-success);
    }

  </style>
