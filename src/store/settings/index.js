import settingAPI from '../../services/api/setting'
import vuetify from '../../plugins/vuetify'

const module = {
  namespaced: true,
  state: {
    private_colors: null,
    colors: [],
    basicColors: {},
    error: null,
    loading: true,
    button_loading: null,
    logo_file: null,
    auth_background_file: null,

    logoFilePath: '',
    uploadingLogo: false
  },

  actions: {
    async grabColors({
      commit
    }, url) {
      commit('BUTTON_LOAD', 'SUBMIT')
      try {
        const response = await settingAPI.grabColors({ url })

        commit('SET_COLORS', response.colors)
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('BUTTON_CLEAR')
      }
    },

    async resetSettings({
      commit
    }) {
      commit('BUTTON_LOAD', 'RESET')

      try {
        const response = await settingAPI.resetSettings()
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('BUTTON_CLEAR')
      }
    },
    async setInitialSetting({
      commit
    }) {
      try {
        let response = await settingAPI.getSetting()

        response = response.value

        // const private_colors = response.filter((data) => data.type.includes('private_color'))

        // if (private_colors.length) {
        //   const colors = []

        //   for (let i = 0; i < private_colors.length; i++) {
        //     colors.push(private_colors[i]['value'])
        //   }
        //   commit('SET_PRIVATE_COLORS', colors)
        // } else {
        //   commit('SET_PRIVATE_COLORS', ['#092954'])
        // }
        const primaryColor = response.find((colorItem) => colorItem.type === 'color_primary')
        const secondaryColor = response.find((colorItem) => colorItem.type === 'color_secondary')
        const accentColor = response.find((colorItem) => colorItem.type === 'color_accent')
        const surfaceColor = response.find((colorItem) => colorItem.type === 'color_surface')
        const backgroundColor = response.find((colorItem) => colorItem.type === 'color_background')

        commit('SET_COLOR_SETTINGS', {
          'color_primary': primaryColor ? primaryColor.value : '#ffffff',
          'color_secondary': secondaryColor ? secondaryColor.value : '#ffffff',
          'color_accent': accentColor ? accentColor.value : '#ffffff',
          'color_surface': surfaceColor ? surfaceColor.value : '#ffffff',
          'color_background': backgroundColor ? backgroundColor.value : '#ffffff'
        })

        vuetify.framework.theme.themes.light.background = backgroundColor ? backgroundColor.value : '#ffffff'
        vuetify.framework.theme.themes.light.primary = primaryColor ? primaryColor.value : '#ffffff'
        vuetify.framework.theme.themes.light.secondary = secondaryColor ? secondaryColor.value : '#ffffff'
        vuetify.framework.theme.themes.light.accent = accentColor ? accentColor.value : '#ffffff'
        vuetify.framework.theme.themes.light.surface = surfaceColor ? surfaceColor.value : '#ffffff'

        let auth_background_file = response.filter((data) => data.type.includes('auth_background_filepath'))

        if (auth_background_file.length) {
          auth_background_file = auth_background_file[0]['value']
          commit('SET_AUTH_BACKGROUND_FILE', auth_background_file)
        } else {
          commit('SET_AUTH_BACKGROUND_FILE', false)
        }

        let logo_file = response.filter((data) => data.type.includes('logo_filepath'))

        if (logo_file.length) {
          logo_file = logo_file[0]['value']
          commit('SET_LOGO_FILE', logo_file)
        } else {
          commit('SET_LOGO_FILE', false)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async applyWebsiteColors({
      commit, dispatch
    }, {
      colors
    }) {
      commit('BUTTON_LOAD', 'APPLY')
      try {
        const response = await settingAPI.applyWebsiteColors({ colors })

        vuetify.framework.theme.themes.light.background = colors[0].color
        vuetify.framework.theme.themes.light.primary = colors[1].color
        vuetify.framework.theme.themes.light.secondary = colors[2].color
        vuetify.framework.theme.themes.light.accent = colors[3].color
        vuetify.framework.theme.themes.light.surface = colors[4].color

        dispatch('app/showSuccess', response.message, { root: true })
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('BUTTON_CLEAR')
      }
    },
    async uploadLogo({
      commit
    }, {
      formData
    }) {
      commit('SET_LOGO_UPLOADING', true)

      try {
        const response = await settingAPI.uploadLogo(formData)

        commit('SET_LOGO_FILE', response.filepath)
      } catch (error) {
        console.log(error.response)
      }

      commit('SET_LOGO_UPLOADING', false)
    },

    async updateAuthBackground({
      commit
    }) {
      try {
        const response = await settingAPI.updateAuthBackground()

        commit('SET_AUTH_BACKGROUND_FILE', response.filepath)
      } catch (error) {
        console.log('error', error)
      }
    }
  },

  mutations: {
    // Set basic app settings
    SET_APP_SETTINGS(state, data) {
      state.logoFilePath = data.logo
    },

    BUTTON_LOAD(state, button) {
      state.button_loading = button
    },
    BUTTON_CLEAR(state) {
      state.button_loading = false
    },
    SET_COLORS(state, colors) {
      state.colors = colors
    },
    SET_PRIVATE_COLORS(state, private_colors) {
      state.private_colors = private_colors
    },
    SET_COLOR_SETTINGS(state, colors) {
      state.basicColors = colors
    },
    SET_LOGO_FILE(state, filepath) {
      state.logo_file = filepath
    },
    SET_AUTH_BACKGROUND_FILE(state, filepath) {
      state.auth_background_file = filepath
    },
    SET_LOGO_UPLOADING(state, value) {
      state.uploadingLogo = value
    }
  }
}

export default module
