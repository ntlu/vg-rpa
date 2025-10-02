import colors from "vuetify/es5/util/colors";
import vi from "vuetify/es5/locale/vi";
import en from "vuetify/es5/locale/en";
import cn from "vuetify/es5/locale/zh-Hant";

export default {
  publicRuntimeConfig: {
    toolsApi:
      process.env.TOOLS_API || "http://gmo021.cansportsvg.com/api/tools/",
    api: process.env.API || "http://gmo021.cansportsvg.com/api/vg-transport/",
    apiStorage:
      process.env.API_STORAGE ||
      "http://gmo021.cansportsvg.com/api/storage/app/vg-transports/car_thumbnail/",
    msgApi:
      process.env.MSG_API || "http://gmo021.cansportsvg.com/api/msg-center/",
    globalUserApi:
      process.env.GLOBAL_USER_API ||
      "http://gmo021.cansportsvg.com/api/global-user/",
    storageUrl:
      process.env.STORAGE_URL ||
      "http://gmo021.cansportsvg.com/api/storage/app/",
    carStorageUrl:
      process.env.CAR_STORAGE_URL ||
      "http://gmo021.cansportsvg.com/api/storage/app/vg-transports/car_thumbnail/",
    empApi: process.env.EMP_API || "http://gmo021.cansportsvg.com/api/emp/",
    skipMail: process.env.SKIP_MAIL || false,
  },
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  loading: {
    color: "orange",
    height: "5px",
  },
  ssr: false,
  server: {
    host: process.env.HOST || "gmo021.cansportsvg.com",
    // host: "10.13.34.176" || "gmo021.cansportsvg.com",
    port: 3070,
  },
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",
  router: {
    base: "/ga/rpa",
  },
  generate: {
    dir: "./dist",
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: (local) =>
      local ? `${local} - VG-RPA` : "VG-RPA",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "description",
        name: "description",
        content: "",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "logo.png",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/static/webfont.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: "~/plugins/plugins",
      mode: "client",
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "nuxtjs-mdi-font",
  ],
  axios: {
    headers: {
      common: {
        http_x_vg_authentication: "vg-serect-token",
      },
    },
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "nuxt-i18n"],
  i18n: {
    defaultLocale: "en",
    vueI18nLoader: true,
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    defaultAssets: {
      font: false,
      icons: false,
    },
    lang: {
      locales: { en, vi, cn },
      current: "en",
    },
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
