<template>
  <div id="sidebarMenu" class="text-white">
    <ul class="nav flex-column navbar-light bg-light shadow sidebar p-4 shadow">
      <img src="../assets/logo_white.svg" class="mt-5 mb-4" />
      <div>
        <li
          class="nav-item pointer"
          @click="$router.push('/user/dashboard')"
        >
          <a class="nav-link color active" aria-current="page">
            Dashboard
          </a>
        </li>
        <li
          class="nav-item pointer"
          @click="$router.push('/user/marcas')"
        >
          <a class="nav-link color active" aria-current="page">
            Marcas de carros
          </a>
        </li>
        <li
          class="nav-item pointer"
          @click="$router.push('/user/carros')"
        >
          <a class="nav-link color active" aria-current="page">
            Carros
          </a>
        </li>
        <li
          class="nav-item pointer"
          @click="$router.push('/user/historico')"
        >
          <a class="nav-link color active" aria-current="page">
            Histórico
          </a>
        </li>
        <!-- <li
          class="nav-item pointer"
          @click="$router.push('/user/perfil')"
        >
          <a class="nav-link color active" aria-current="page">
            Editar Perfil
          </a>
        </li> -->
        <hr />
        <li class="nav-item pointer" @click="logout()">
          <a class="nav-link text-white" routerLink="/">
            <i class="fas fa-sign-out-alt fa-1x icon mr-2"></i>
            Sair
          </a>
        </li>
      </div>
      <div class="center">
        <p class="footer text-sm text-white">Raíssa Arantes</p>
      </div>
    </ul>
  </div>
</template>
<script>
import api from "@/services/api";
import { logout } from "@/services/auth";

export default {
  name: "private-sidebar",
  methods: {
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

<style>
.mr-2 {
  margin-right: 0.5rem;
}
.ml-2 {
  margin-left: 0.5rem;
}
.sidebar {
  height: 100vh;
  background: linear-gradient(
      180deg,
      rgba(0, 132, 255, 0) 0.48%,
      #18879f 99.37%
    ),
    linear-gradient(0deg, #14b9dd, #14b9dd);
  box-shadow: 0px 4px 4px 2px rgba(0, 0, 0, 0.25);
  z-index: 9999;
  width: 240px;
}

/* menu itens */
.nav-link.color,
.list-group-item {
  color: white;
  transition: 0.5s;
}
.nav-link.color:hover,
.list-group-item:hover {
  text-decoration: underline;
  transition: 0.5s;
}
.nav-link.color.disabled,
.list-group-item.disabled {
  color: rgb(146, 146, 146);
}
.list-group-item {
  font-size: 1.5rem;
  padding: 1.5rem;
}
.pointer {
  cursor: pointer;
}
.upper {
  text-transform: uppercase;
}
.center {
  text-align: center;
}

#setShowMenu {
  margin-right: auto;
  margin-left: auto;
  max-width: 100%;
}

/* menu responsible */
@media screen and (min-width: 992px) {
  #setShowMenu {
    display: none;
  }
  #sidebarMenu {
    display: block;
  }
}

@media screen and (max-width: 991px) {
  #setShowMenu {
    display: block;
  }
  #sidebarMenu {
    display: none;
  }
}

.text-sm {
  font-size: 0.75rem;
}
.footer {
  position: absolute;
  bottom: 0;
  color: rgb(85, 85, 85);
}
</style>
