<template>
  <div class="container">
    <div id="app">
      <nav>
        <div class="nav-wrapper indigo darken-3">
          <a href="#" class="brand-logo right">Logo</a>
          <ul id="nav-mobile" class="left hide-on-med-and-down">
            <li>
              <a href="sass.html">Sass</a>
            </li>
            <li>
              <a href="badges.html">Components</a>
            </li>
            <li>
              <a href="collapsible.html">JavaScript</a>
            </li>
          </ul>
        </div>
      </nav>

      <div class="row">
        <form class="col s12" @submit.prevent="addProduct">
          <div class="row"></div>
          <div class="row">
            <div class="input-field col s5">
              <input placeholder="Título" id="title" type="text" v-model="product.title">
            </div>
            <div class="input-field col s5">
              <input
                placeholder="Descrição"
                id="description"
                type="text"
                class="validate"
                v-model="product.description"
              >
            </div>
            <div class="input-field col s2">
              <button
                class="btn-floating btn-large waves-effect indigo darken-4"
                type="submit"
                name="save"
              >
                <i class="material-icons right">add</i>
              </button>
            </div>
          </div>
        </form>
      </div>

      <p class="message" v-if="message">{{ message }}</p>

      <table class="striped responsive-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <th>#</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="product in products" :key="product._id">
            <td>{{ product.title }}</td>
            <td>{{ product.description }}</td>
            <td>
              <button
                @click="editProduct(product._id)"
                class="btn waves-effect btn-small teal darken-4"
                type="submit"
                name="edit"
              >
                Editar
                <i class="material-icons right">edit</i>
              </button>
              <button
                @click="removeProduct(product._id)"
                class="btn waves-effect btn-small red darken-4"
                type="submit"
                name="remove"
              >
                Remover
                <i class="material-icons right">delete</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ProductService from "./services/ProductService";

export default {
  data() {
    return {
      products: [],
      product: {
        _id: 0,
        title: "",
        description: ""
      },
      message: ""
    };
  },
  mounted() {
    this.getProducts();
  },

  methods: {
    async getProducts() {
      let docs = await ProductService.getProducts();
      this.products = docs.data;
    },

    setProducts() {
      this.product = {};
      this.getProducts();
    },

    addProduct() {
      if (this.validate()) {
        let product = {
          title: this.product.title,
          description: this.product.description
        };
        ProductService.addProduct(product).then(() => this.setProducts());
      } else alert("Dados inválidos");
    },

    editProduct(id) {
      if (this.validate()) {
        this.product._id = id;
        ProductService.editProduct(id, this.product).then(() =>
          this.setProducts()
        );
      } else alert("Dados inválidos");
    },

    removeProduct(id) {
      ProductService.removeProduct(id).then(() => this.setProducts());
    },

    validate() {
      return (
        this.product &&
        this.product.title != "" &&
        this.product.description != ""
      );
    }
  }
};
</script>

<style>
</style>
