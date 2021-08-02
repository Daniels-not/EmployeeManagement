<template>
  <div class="viewemp">
    <h1>Employees</h1>
    <div class="collection with-header">
      <div class="collection-header">
        <h4>{{ name }} {{ last_name }}</h4>
      </div>
      <li class="collection-item">
        Employee ID# : <strong>{{ employee_id }}</strong>
      </li>
      <li class="collection-item">
        Department : <strong>{{ dept }}</strong>
      </li>
      <li class="collection-item">
        Position : <strong>{{ position }}</strong>
      </li>
    </div>
    <router-link :to="{ name: 'dashboard' }" class="btn gray my"
      ><i class="fas fa-arrow-left ml"></i> Back</router-link
    >
    <button @click="deleteEmployee" class="btn red">
      <i class="far fa-trash-alt"></i> Delete
    </button>
    <div class="fixed-action-btn">
      <router-link
        :to="{ name: 'editEmployee', params: { employee_id: employee_id } }"
        class="
          btn-floating btn-large
          waves-effect waves-light
          blue-grey
          darken-4
        "
        ><i class="fas fa-user-edit"></i
      ></router-link>
    </div>
  </div>
</template>

<script>
import database from "../components/firebase/firebaseinit";
export default {
  name: "viewEmployee",
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

    deleteEmployee() {
      if (confirm("Are you sure?")) {
        database
          .collection("employees")
          .where("employee_id", "==", this.$route.params.employee_id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((value) => {
              value.ref.delete();
              this.$router.push("/");
            });
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.my {
  margin-right: 10px;
}
</style>
