<template>
  <div class="container">
    <div class="row mt-5 text-center">
      <div class="col-12">
        <div class="card p-4">
          <div class="card-body text-start">
            <div class="text-center mb-3">
              <img src="./../assets/logo.svg" />
            </div>
            <div v-if="show_login">
              <h2 class="card-title text-center">Login</h2>
              <div class="row">
                <div class="col-12 mb-3">
                  <label class="form-label">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Informe seu email"
                    v-model="model.email"
                  />
                </div>
                <div class="col-12 mb-3">
                  <label class="form-label">Senha</label>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Informe sua senha"
                    v-model="model.password"
                  />
                </div>
                <div class="col-12 mb-3">
                  <button
                    type="button"
                    class="btn btn-link"
                    @click="show_login = !show_login"
                  >
                    Ainda não possui login? Cadastre-se!
                  </button>
                </div>
                <div class="col-12 text-center">
                  <button
                    type="button"
                    class="btn btn-primary px-4"
                    :disabled="!isValidModel"
                    @click="handleLogin()"
                  >
                    Entrar
                  </button>
                </div>
              </div>
            </div>
            <div v-else>
              <h2 class="card-title text-center">Cadastro</h2>
              <div class="row">
                <div class="col-12 mb-3">
                  <label class="form-label">Nome*</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Informe seu nome"
                    v-model="model.name"
                  />
                </div>
                <div class="col-12 mb-3">
                  <label class="form-label">Email*</label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Informe seu email"
                    v-model="model.email"
                  />
                </div>
                <div class="col-12 mb-3">
                  <label class="form-label">Senha*</label>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Informe sua senha"
                    v-model="model.password"
                  />
                </div>
                <div class="col-12 mb-3">
                  <label class="form-label">Confirmação de senha*</label>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Informe sua senha"
                    v-model="model.password_confirm"
                  />
                </div>
                <div class="col-12 mb-3">
                  <button
                    type="button"
                    class="btn btn-link"
                    @click="show_login = !show_login"
                  >
                    Já possui login? Clique aqui
                  </button>
                </div>
                <div class="col-12 text-center">
                  <button
                    type="button"
                    class="btn btn-primary px-3"
                    :disabled="!isValidModel"
                    @click="handleRegister()"
                  >
                    Cadastrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../services/api";
import { login } from "../services/auth";

export default {
  name: "Login",
  data() {
    return {
      model: {
        email: "",
        name: "",
        password: "",
        password_confirm: ""
      },
      show_login: true
    };
  },
  methods: {
    async handleRegister() {
      try {
        await api.post("register", {
          name: this.model.name,
          email: this.model.email,
          password: this.model.password
        });
        this.$toasted.success("Usuário cadastrado com sucesso!");
        this.show_login = true;
      } catch (e) {
        this.$toasted.error(
          `Ocorreu um erro ao cadastrar o usuário: ${e.response.data}`
        );
      }
    },
    async handleLogin() {
      try {
        const { data } = await api.post("sessions", {
          email: this.model.email,
          password: this.model.password
        });
        login(data.auth.token);
        this.$toasted.success("Usuário logado com sucesso!");
        this.$router.push(`/user/dashboard`);
      } catch (e) {
        console.log(e);
        this.$toasted.error("Ocorreu um erro ao logar o usuário");
      }
    }
  },
  computed: {
    isValidModel() {
      if (this.show_login) {
        if (!this.model.email || !this.model.password) {
          return false;
        }
      } else {
        if (
          !this.model.email ||
          !this.model.password ||
          !this.model.name ||
          this.model.password !== this.model.password_confirm
        ) {
          return false;
        }
      }
      return true;
    }
  }
};
</script>
<style>
body {
  background: #f2f2f2;
  height: 100%;
  margin: 0;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>
