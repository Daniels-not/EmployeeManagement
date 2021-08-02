<template>
  <div class="editemp">
    <h1>EditEmployee</h1>
    <div class="row">
      <form @submit.prevent="updateEmployee" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input disabled type="text" v-model="employee_id" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="last_name" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="dept" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="position" required />
          </div>
        </div>
        <button type="submit" class="btn my">
          <i class="far fa-paper-plane"></i> Submit
        </button>
        <router-link to="/" class="btn grey"
          ><i class="fas fa-ban"></i> Cancel</router-link
        >
      </form>
    </div>
  </div>
</template>

<script>
import database from "../components/firebase/firebaseinit";
export default {
  name: "editEmployee",
  data() {
    return {
      employee_id: null,
      name: null,
      last_name: null,
      dept: null,
      position: null,
    };
  },

  beforeRouteEnter(to, from, next) {
    database
      .collection("employees")
      .where("employee_id", "==", to.params.employee_id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((value) => {
          next((info) => {
            info.employee_id = value.data().employee_id;
            info.name = value.data().name;
            info.last_name = value.data().last_name;
            info.dept = value.data().dept;
            info.position = value.data().position;
          });
        });
      });
  },
  watch: {
    $route: "fetchData",
  },

  methods: {
    fetchData() {
      database
        .collection("employees")
        .where("employee_id", "==", this.$route.params.employee_id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((info) => {
            this.dept = info.data().dept;
            this.employee_id = info.data().employee_id;
            this.last_name = info.data().last_name;
            this.name = info.data().name;
            this.position = info.data().position;
          });
        });
    },
    updateEmployee() {
      database
        .collection("employees")
        .where("employee_id", "==", this.$route.params.employee_id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((info) => {
            info.ref
              .update({
                employee_id: this.employee_id,
                name: this.name,
                last_name: this.last_name,
                dept: this.dept,
                position: this.position,
              })
              .then(() => {
                this.$router.push({
                  name: "viewEmployee",
                  params: { employee_id: this.employee_id },
                });
              });
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.my {
  margin-right: 10px;
}
</style>