<template>
  <div class="user-account">
    <aside>
      <BSidebar />
    </aside>

    <main v-if="squad.squad">
      <div class="user__section">
        <BSquad :squad="squad" />
      </div>

      <div class="user__section">
        <BTaskContainer
          title="Active"
          :active="true"
          :tasks="activeTasks"
        />
      </div>

      <div class="user__section">
        <BTaskContainer
          title="Archived"
          :active="false"
          :tasks="archivedTasks"
        />
      </div>
    </main>


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
            <div class="button">
              <BButton
                size="medium"
                variant="transparent"
                value="Delete Account"
                @click="onDelete"
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
      import { computed, onMounted } from 'vue';
      import { useStore } from 'vuex';
      import { Form } from 'vee-validate';
      import BButton from '../components/b-button.vue';
      import BSidebar from '../components/b-sidebar.vue';
      import BSquad from '../components/b-squad.vue';
      import BTaskContainer from '../components/b-task-container.vue';
      import BInput from '../components/b-input.vue';
      import BInputField from '../components/b-input-field.vue';

      export default {
          // eslint-disable-next-line vue/multi-word-component-names
          name: 'UserAccount',

          components: {
              BSidebar,
              BSquad,
              BTaskContainer,
              BButton,
              BInput,
              BInputField,
              Form,
          },
      };
  </script>

  <script setup>
      const store = useStore();

      const squad = computed(() => {
          const req = store.getters.getSquadActive;
          if (req.id) {
              store.dispatch('gatherTasks', req.id);
          }

          return req;
      });

      const activeTasks = computed(() => store.getters.getEnabledTasks);

      const archivedTasks = computed(() => store.getters.getDisabledTasks);

      onMounted(() => store.dispatch('gatherSquadList'));

      const schema = Yup.object().shape({
        oldPassword: Yup.string().required('Old password is required.'),
        newPassword: Yup.string().required('New password is required.'),
        confirmPassword: Yup.string().required('Confirm password is required.').oneOf([Yup.ref('newPassword'), null], 'Confirm password must be equal the new password.'),
      });

      function onSubmit(values) {
        const { newPassword, oldPassword } = values;
        store.dispatch('updateYourself', { newPassword, oldPassword });
      }

      function onDelete() {
        store.dispatch('deleteYourself');
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
      margin-left: 68px;

      @media (min-width: 768px) {
        margin-left: 120px;
      }
    }
  }

    *{
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
        width: 150%;
        background: #0d0d0d;
        border-radius: 10px;
        margin: 10%;
        padding: 50px;
    }

    .button {
        display: flex;
        gap: var(--unit-1000);
        width: 100%;
        margin-top: calc(var(--unit-1000) * 1);
        margin-left: auto;
        margin-right: auto;
    }

  </style>
