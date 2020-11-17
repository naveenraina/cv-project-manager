<template><div class="md-layout">
    <div class="md-layout-item md-size-10"></div>
    <div class="md-layout-item">  
      <md-card>
        <md-card-header>
          <h3>My Profile</h3>
        </md-card-header>
        <md-card-content>
          <md-field>
            <label>First Name</label>
            <md-input v-model="user.firstName"></md-input>
          </md-field>

          <md-field>
            <label>Last Name</label>
            <md-input v-model="user.lastName"></md-input>
          </md-field>

          <div class="md-layout">     
            <div class="md-layout-item">
              <div class="block">
                <div>Birth Date</div>
                <md-datepicker v-model="user.birthDate" md-immediately/>
              </div>
            </div>
            <div class="md-layout-item">
              <md-field>
                <label>Gender</label>
                <md-select v-model="user.gender">
                  <md-option value="Male">Male</md-option>
                  <md-option value="Female">Female</md-option>
                  <md-option value="Unknown">Unknown</md-option>
                </md-select>
              </md-field>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item md-size-10"></div>    
  </div>
</template>

<script>
  export default {
    name: 'profile',
    data: () => ({
      user: {
        firstName: '',
        lastName: '',
        birthDate: '',
        gender: ''
      }
    })
  }
</script>
