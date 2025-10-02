<i18n>
  {
    "en": {
      "username": "User",
      "password": "Password",
      "login": "Login",
      "Login System VG-RPA":"Login System VG-RPA"
    },
    "cn": {
      "username": "使用者",
      "password": "密碼",
      "login": "登入",
      "Register account":"註冊帳戶",
      "Forgot Password":"忘記密碼",
      "Login System VG-RPA":"登入系統VG-RPA"
    },
    "vi": {
      "username": "Tài khoản",
      "password": "Mật khẩu",
      "login": "Đăng nhập",
      "Register account":"Đăng ký tài khoản",
      "Forgot Password":"Quân mật khẩu",
      "Login System VG-RPA":"Đăng nhập hệ thống VG-RPA"
    }
  }
</i18n>
<template>
  <v-row justify="center">
    <v-col sm="12" md="12" cols="12" class="d-flex align-center justify-center">
      <div>
        <!-- <v-img class="mx-auto" width="430" src="vg-transports-logo.png"></v-img> -->
        <v-card :loading="isLoading" class="mx-auto mt-5" min-width="450" tile>
          <v-toolbar color="teal" dense dark flat tile>
            <v-toolbar-title class="text-center d-flex mt-3">
              {{ $t("Login System VG-RPA") }}  
              <div class="d-flex mt-1 ml-10">
              <v-radio-group 
              v-model="selectedLocation"
              row
              >
                <v-radio label="VG" value="vg" color="red"></v-radio>
                <v-radio label="AW" value="aw" color="red"></v-radio>
              </v-radio-group> 
            </div>
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <!-- <v-row justify="center">
              <v-col cols="12" class="text-center py-1">
                <h3>Choose Location</h3>
              </v-col>
              
              <v-col cols="12" class="text-center">
                <v-radio-group 
                v-model="selectedLocation"
                row
                >
                <v-radio label="VG" value="vg" color="teal"></v-radio>
                <v-radio label="AW" value="aw" color="teal"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row> -->
          
          <!-- <v-row justify="center">
            <v-col cols="12" class="text-center py-1">
              <h3>Choose Location</h3>
            </v-col>
            <v-col cols="auto" class="pt-1 mb-3">
              <v-btn 
              :color="selectedLocation === 'vg' ? 'teal' : 'grey'"
              @click="selectedLocation = 'vg'"
              class="mx-1 white--text"
              >
              VG
            </v-btn>
            <v-btn 
            :color="selectedLocation === 'aw' ? 'teal' : 'grey'"
            @click="selectedLocation = 'aw'"
            class="mx-1 white--text"
            >
            AW
          </v-btn>
        </v-col>
      </v-row> -->
      <v-text-field
      :rules="[(v) => !!v || 'Item is required']"
      required
      hide-details=""
      dense
      class="indigo--text pb-2 rounded-0"
      color="teal"
      v-model="username"
      :label="$t('username')"
      outlined
      ></v-text-field>
      <v-text-field
      :rules="[(v) => !!v || 'Item is required']"
      required
      hide-details=""
      dense
      class="indigo--text pb-2 rounded-0"
      color="teal"
      @keypress.enter="doLogin()"
      v-model="password"
      :label="$t('password')"
      type="password"
      outlined
      ></v-text-field>
      
      <div style="display: flex; justify-content: space-between">
        <a
        href="http://gmo021.cansportsvg.com/s/reset-pw"
        target="_blank"
        >{{ $t("Forgot Password") }}</a
        >
        <a
        href="http://gmo021.cansportsvg.com/s/create-account"
        target="_blank"
        >{{ $t("Register account") }}</a
        >
      </div>
    </v-form>
    <v-divider class="mb-1"></v-divider>
    <v-radio-group hide-details="" row v-model="lang">
      <v-radio
      @click.prevent.stop="$i18n.setLocale('en')"
      label="English"
      value="en"
      color="teal"
      ></v-radio>
      <v-radio
      @click.prevent.stop="$i18n.setLocale('cn')"
      label="中文"
      value="cn"
      color="teal"
      ></v-radio>
      <v-radio
      @click.prevent.stop="$i18n.setLocale('vi')"
      label="Tiếng Việt"
      value="vi"
      color="teal"
      ></v-radio>
    </v-radio-group>
    <v-divider class="mt-3"></v-divider>
  </v-card-text>
  <v-card-actions class="justify-end"> 
    <v-btn
    :loading="isLoading"
    class="px-4"
    @click="doLogin()"
    color="teal"
    tile
    dark
    >
    <v-icon left> mdi-login-variant</v-icon>
    {{ $t("login") }}
  </v-btn>
</v-card-actions>
</v-card>
</div>
</v-col> 
</v-row>
</template>

<script>
export default {
  layout: "blank",
  data() {
    return {
      username: "",
      password: "",
      api: "http://gmo021.cansportsvg.com/api/global-user/",
      data: {},
      userRole: [],
      lang: "en",
      isLoading: false,
      valid: false,
      selectedLocation: "vg",
    };
  },
  methods: {
    
    async doLogin() {
      if (this.$refs.form.validate()) {
        this.isLoading = true;
        let params = {
          username: this.username,
          password: this.password,
          option: this.selectedOption,
        };
        await this.$axios
        .post(this.api + "login", params)
        .then((res) => {
          if (res.status == 200) {
            this.data = res.data;
            this.isLoading = false;
            if (this.data != "wrong") {
              this.$set(this, "userRole", JSON.parse(this.data.app_roles));
              const userRoleObj = this.userRole.find(
              (x) => x.app == "rpa"
              );
              
              if (!userRoleObj) {
                alert("Role 'rpa' not found!");
                return;
              }
              localStorage.setItem("session-token", this.data.session_token); 
              this.$session.set("rpa", {
                name: this.data.name,
                email: this.data.email,
                username: this.data.username,
                dept: this.data.dept,
                hight_dept: this.data.high_dept, 
                role: userRoleObj.role,
                empno: this.data.empno,
                isDivisionManager: this.data.isDivisionManager,
                token: this.data.token,
                location: this.data.location,
                selectedLocation: this.selectedLocation,
              });
              this.$router.push({
                path: "/dashboard",
              });
            } else {
              alert(
              "Wrong username or password ! \n Sai tên đăng nhập hoặc mật khẩu"
              );
            }
          }
        })
        .catch((err) => {
          alert(err);
        });
      }
    },
  },
  mounted() {
    if (this.$session.has("rpa")) {
      this.$router.push({
        path: "/dashboard",
      });
    }
    if (
    this.$route.query.portal_login !== undefined &&
    this.$session.has("vg-portal")
    ) {
      let ss = this.$session.get("vg-portal");
      if (ss.has_acc == true) {
        this.username = ss.username;
        this.password = ss.password;
        setTimeout(() => {
          this.doLogin();
        }, 500);
      }
    }
  },
};
</script>
