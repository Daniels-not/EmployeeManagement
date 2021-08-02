<template>
  <div id="new-employee">
    <h3>New Employee</h3>
    <div class="row">
      <form @submit.prevent="saveEmployee" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="employee_id" required />
            <label>Employee ID#</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required />
            <label>Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="lastName" required />
            <label>Last Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="dept" required />
            <label>Department</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="position" required />
            <label>Position</label>
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
import db from "../components/firebase/firebaseinit";
export default {
  name: "newEmployee",
  data() {
    return {
      employee_id: null,
      name: null,
      lastName: null,
      dept: null,
      position: null,
    };
  },
  methods: {
    saveEmployee() {
      db.collection("employees")
        .add({
          employee_id: this.employee_id,
          name: this.name,
          lastName: this.lastName,
          dept: this.dept,
          position: this.position,
        })
        .then((docRef) => {
          console.log("Client added: ", docRef.id);
          this.$router.push("/");
        })
        .catch((error) => {
          console.error("Error adding employee: ", error);
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
