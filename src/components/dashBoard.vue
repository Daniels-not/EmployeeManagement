<template>
  <div class="dasboard">
    <h1>DashBoard</h1>
    <ul class="collection with-header">
      <li class="collection-header"><h4>Employees</h4></li>
      <li
        v-for="employee in employees"
        v-bind:key="employee.id"
        class="collection-item"
      >
        <div class="chip">{{ employee.dept }}</div>
        {{ employee.employee_id }} : {{ employee.name }}
        <!-- generate a view option --->
        <router-link
          class="secondary-content"
          :to="{
            name: 'viewEmployee',
            params: { employee_id: employee.employee_id },
          }"
        >
          <i class="far fa-eye"></i>
        </router-link>
      </li>
    </ul>
    <div class="fixed-action-btn">
      <router-link
        :to="{ name: 'newEmployee' }"
        class="
          btn-floating btn-large
          waves-effect waves-light
          blue-grey
          darken-4
        "
        ><i class="fas fa-user-plus"></i
      ></router-link>
    </div>
  </div>
</template>

<script>
import database from "../components/firebase/firebaseinit";
export default {
  name: "dashBoard",
  data() {
    return {
      employees: [],
    };
  },
  created() {
    database
      .collection("employees")
      .orderBy("dept")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((inf) => {
          const data = {
            id: inf.id,
            employee_id: inf.data().employee_id,
            last_name: inf.data().last_name,
            name: inf.data().name,
            dept: inf.data().dept,
            position: inf.data().position,
          };
          this.employees.push(data);
        });
      });
  },
};
</script>

<style scoped></style>
