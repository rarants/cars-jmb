<template>
  <div class="layout">
    <div class="row g-0">
      <div class="content shadow p-0 d-none d-lg-block">
        <sidebar />
      </div>
      <div class="page-content content m-0 p-0">
        <div class="m-0 p-0 header">
          <navbar
            :showModalMenu="showModalMenu"
            @setShowModalMenu="showModalMenu = $event"
          />
        </div>
        <div class="row g-0 scroll"> 
          <div class="col-12 m-0 p-0">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
    <div
      v-show="showModalMenu"
      modal-classes="modal-dialog modal-sm"
      body-classes="pb-0"
      class="modal-content d-lg-none"
      header-classes="pb-0"
    >
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close m-3"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="handleOpenMenu()"
          ></button>
        </div>
        <div class="modal-body">
          <div>
            <div class="center upper">
              <img
                alt="Logo"
                style="max-width: 10rem;"
                class="mx-auto card-image pointer mb-4"
                title="Testar agora"
                src="@/assets/logo_white.svg"
              />
            </div>
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="
                  $router.push('/user/dashboard');
                  handleOpenMenu();
                "
              >
                Dashboard
              </li>
              <li
                class="list-group-item"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="
                  $router.push('/user/marcas');
                  handleOpenMenu();
                "
              >
                Marcas de carros
              </li>
              <li
                class="list-group-item"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="
                  $router.push('/user/carros');
                  handleOpenMenu();
                "
              >
                Carros
              </li>
              <li
                class="list-group-item"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="
                  $router.push('/user/historico');
                  handleOpenMenu();
                "
              >
                Histórico
              </li>
              <!-- <li
                class="list-group-item"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="
                  $router.push('/user/perfil');
                  handleOpenMenu();
                "
              >
                Editar Perfil
              </li> -->
              <li
                class="list-group-item text-danger"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="
                  logout();
                  handleOpenMenu();
                "
              >
                <a class="nav-link text-white">
                  <i class="fas fa-sign-out-alt fa-1x icon mr-2"></i>
                  Sair
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import api from "@/services/api";
import { logout } from "@/services/auth";

export default {
  components: {
    Sidebar,
    Navbar
  },
  data() {
    return {
      showModalMenu: false
    };
  },
  methods: {
    handleOpenMenu() {
      this.showModalMenu = !this.showModalMenu;
    },
    async logout() {
      try {
        await api.post(`/logout`);
        logout();
        this.$router.push("/");
        this.$toasted.success("Usuário deslogado com sucesso!");
      } catch (e) {
        this.$toasted.error(
          "Não foi possível encerrar a sessão, tente novamente."
        );
      }
    }
  }
};
</script>
<style scoped>
.scroll {
  max-height: calc(100vh - 6rem);
  overflow-y: auto;
}
.list-group-item {
  cursor: pointer;
}
.layout {
  min-height: 100vh;
}

.shadow {
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
.content {
  min-height: 100vh;
}
.page-content {
  position: relative;
}
.list-group-item {
  background: transparent;
}
.modal-content {
  background: linear-gradient(
      180deg,
      rgba(0, 132, 255, 0) 0.48%,
      #18879f 99.37%
    ),
    linear-gradient(0deg, #14b9dd, #14b9dd);
  position: absolute;
  top: 0;
  left: 0;
}

/* md e sm */
@media screen and (max-width: 991px) {
  .page-content {
    top: 0;
    position: absolute;
    min-height: 100%;
    width: 100%;
    left: 0;
  }
}

/* lg e xl */
@media screen and (min-width: 992px) {
  .page-content {
    top: 0;
    position: absolute;
    min-height: 100%;
    width: calc(100% - 240px);
    left: 240px;
  }
}
</style>
