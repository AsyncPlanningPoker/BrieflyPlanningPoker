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
      <!DOCTYPE html>
      <html lang="pt-Br">
        <head>
          <meta charset="UTF-8">
          <meta
            http-equiv="X-UA-Compatible"
            content="IE=edge"
          >
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          >
          <title>Página do Cliente</title>
          <link
            rel="stylesheet"
            href="css/style.css"
          >
        </head>
        <body>
          <div class="client">
            <div class="contents">
              <div class="original-password">
                <div class="password">
                  <div id="title">
                    Old Password
                  </div>

                  <div class="field-new-password">
                    <input
                      type="password"
                      name="new-password"
                      id="new-password"
                    >
                    <a
                      href="#"
                      class="icon-password"
                    ><i class="fa-regular fa-eye-slash" /></a>
                  </div>
                </div>

                <div class="edit-password">
                  <div class="edit-new-password">
                    <div id="title">
                      New Password
                    </div>

                    <div class="field-new-password">
                      <input
                        type="password"
                        name="new-password"
                        id="new-password"
                      >
                      <a
                        href="#"
                        class="icon-password"
                      ><i class="fa-regular fa-eye-slash" /></a>
                    </div>
                  </div>

                  <div class="edit-new-password">
                    <div id="title">
                      Confirm Password
                    </div>

                    <div class="field-new-password">
                      <input
                        type="password"
                        name="new-password"
                        id="new-password"
                      >
                      <a
                        href="#"
                        class="icon-password"
                      ><i class="fa-regular fa-eye-slash" /></a>
                    </div>
                  </div>
                </div>
                <div class="button">
                  <BButton
                    size="medium"
                    value="Delete Account"
                    @click="any"
                  />
                  <BButton
                    size="medium"
                    value="Save"
                    @click="any"
                  />
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    </main>
  </div>
</template>

  <script>
      import { computed, onMounted } from 'vue';
      import { useStore } from 'vuex';
      import BButton from '../components/b-button.vue';
      import BSidebar from '../components/b-sidebar.vue';
      import BSquad from '../components/b-squad.vue';
      import BTaskContainer from '../components/b-task-container.vue';

      export default {
          // eslint-disable-next-line vue/multi-word-component-names
          name: 'UserAccount',

          components: {
              BSidebar,
              BSquad,
              BTaskContainer,
              BButton
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
  </script>

  <style lang="scss" scoped>

    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Sora:wght@200;300;400;500;600;700;800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Hammersmith+One&display=swap');

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

    body {
        background: #333333;
    }

    .client {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .profile {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50%;
        height: 90%;
        background: #0d0d0d;
        border-radius: 10px;
        margin: 5% 0 5% 10%;
        padding: 5.3% 2%;
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
    /*------------------------------------------- CONTEÚDO DESCRIÇÃO DO USUÁRIO-------------------------------------------*/
    .teste {
        font: 400 16px 'Hammersmith one', sans-serif;
        width: 100%;
        color: #fff;
        padding: 15px 0;
    }

    .teste-password {
        font: 400 16px 'Hammersmith one', sans-serif;
        width: 100%;
        color: #fff;
        padding: 6px 30px;
    }

    #linha-horizontal-description {
        width: 90%;
        margin: 5% 0 0 0;
        border: 1px solid #000;
        opacity: 70%;
        box-shadow: rgba(240, 239, 239, 0.887) 0 2px;
        filter: blur(1px);
    }

    .original-password {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 90%;
    }
    .edit-password {
        position: relative;
        display: flex;
        flex-direction: row;
    }

    .password {
        position: relative;
        width: 45%;
        height: 50%;
        border: 1px solid #fff;
        border-radius: 10px;
        margin: 10% 0 10% 0;
        padding: 0px 0 2% 0;
    }

    .edit-new-password {
        position: relative;
        width: 45%;
        height: 50%;
        align-items: flex-start;
        border: 1px solid #fff;
        border-radius: 10px;
        margin-right: 30px;
        padding: 0px 0 2% 0px;
    }

    .field-new-password {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .icon-password {
        position: relative;
        color: #fff;
        padding: 0 5% 0 0;
    }

    .password #new-password{
        position: relative;
        width: 100%;
        height: 50%;
        padding: 2px 0 2px 30px;
        border: none;
        border-radius: 10px;
        background: none;
        outline: none;
        color: #fff;
        font-size: 150%;
    }

    .edit-password #new-password{
        position: relative;
        width: 100%;
        height: 50%;
        padding: 2px 0 2px 30px;
        border: none;
        border-radius: 10px;
        background: none;
        outline: none;
        color: #fff;
        font-size: 150%;
    }

    .password #title {
        position: relative;
        top: -0.7em;
        display: inline;
        background-color: #0d0d0d;
        color: #fff;
        font: 200 20px 'Hammersmith one', sans-serif;
        padding: 0 10px;
        margin: 0 0 0 30px;
    }

    .edit-password #title {
        position: relative;
        top: -0.7em;
        display: inline;
        background-color: #0d0d0d;
        color: #fff;
        font: 200 20px 'Hammersmith one', sans-serif;
        padding: 0 10px;
        margin: 0 0 0 30px;
    }

    .button {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

  </style>
