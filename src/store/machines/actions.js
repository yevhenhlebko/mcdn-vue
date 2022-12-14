import machineAPI from '../../services/api/machine'
import companyAPI from '../../services/api/company'
import * as Sentry from '@sentry/vue'

const initAcsDashboard = async ({ commit, state }) => {
  try {
    const response = await companyAPI.getCompanies()

    commit('companies/SET_COMPANIES', response.data.companies, { root: true })
    if (!state.selectedCompany) {
      commit('SET_SELECTED_COMPANY', { id: 0, name: 'All' })
    }
  } catch (error) {
    Sentry.captureException(error)
  }
}

const changeSelectedCompany = ({ commit }, company) => {
  commit('SET_SELECTED_COMPANY', company)
}

const getSystemStates = async ({ commit }, id) => {
  commit('SET_LOADING_SYSTEM_STATES', true)

  try {
    const response = await machineAPI.getSystemStates(id)

    commit('SET_SYSTEM_STATES', response.machine_states)
  } catch (error) {
    Sentry.captureException(error)
  } finally {
    commit('SET_LOADING_SYSTEM_STATES', false)
  }
}
const getWeeklyRunningHours = async ({ commit }, id) => {
  commit('SET_LOADING_WEEKLY_RUNNING_HOURS1', true)

  try {
    const response = await machineAPI.getWeeklyRunningHours(id)

    commit('SET_WEEKLY_RUNNING_HOURS', response.hours)
  } catch (error) {
    Sentry.captureException(error)
  } finally {
    commit('SET_LOADING_WEEKLY_RUNNING_HOURS1', false)
  }
}

const initLocationsTable = async ({ commit }, data) => {
  commit('SET_LOADING_LOCATIONS_TABLE', true)
  commit('locations/SET_DATA', [], { root: true })

  try {
    const response = await machineAPI.initLocationsTable(data)

    commit('locations/SET_DATA', response.locations, { root: true })
  } catch (error) {
    Sentry.captureException(error)
  } finally {
    commit('SET_LOADING_LOCATIONS_TABLE', false)
  }
}

const initZonesTable = async ({ commit }, location_id) => {
  commit('SET_LOADING_ZONES_TABLE', true)
  commit('zones/SET_DATA', [], { root: true })

  try {
    const response = await machineAPI.initZonesTable(location_id)

    commit('zones/SET_DATA', response.zones, { root: true })
  } catch (error) {
    Sentry.captureException(error)
  } finally {
    commit('SET_LOADING_ZONES_TABLE', false)
  }
}

const initMachinesTable = async ({ commit }, zone) => {
  commit('SET_LOADING_MACHINES_TABLE', true)
  commit('devices/SET_DATA', [], { root: true })

  try {
    const response = await machineAPI.initMachinesTable(zone)

    commit('devices/SET_DATA', response.devices, { root: true })
  } catch (error) {
    Sentry.captureException(error)
  } finally {
    commit('SET_LOADING_MACHINES_TABLE', false)
  }
}

const getDashboardMachinesTable = async ({ commit }, data) => {
  commit('SET_LOADING_MACHINES_TABLE', true)
  commit('devices/SET_DATA', [], { root: true })

  try {
    const response = await machineAPI.getDashboardMachinesTable(data)

    commit('devices/SET_DATA', response.devices.data, { root: true })
    commit('devices/SET_TOTAL_DEVICES', response.devices.total, { root: true })
    commit('devices/SET_PAGE_COUNT', response.devices.last_page, { root: true })
  } catch (error) {
    Sentry.captureException(error)
  } finally {
    commit('SET_LOADING_MACHINES_TABLE', false)
  }
}

const getTags = async ({ commit }, machineId) => {
  try {
    const response = await machineAPI.getTags(machineId)

    commit('SET_TAGS', response.tags)
  } catch (error) {
    Sentry.captureException(error)
    throw new Error(error)
  }
}

const getDataToolSeries = async ({ commit }, payload) => {
  commit('SET_LOADING_DATA_TOOL_SERIES', true)

  try {
    const response = await machineAPI.getDataToolSeries(payload)

    commit('SET_DATA_TOOL_SERIES', response.series)
  } catch (error) {
    Sentry.captureException(error)
    throw new Error(error)
  } finally {
    commit('SET_LOADING_DATA_TOOL_SERIES', false)
  }
}

const updateDataToolOptions = async ({ commit }, payload) => {
  commit('SET_DATA_TOOL_OPTIONS', payload)
}

const updateHopperSetting = async ({ commit }, payload) => {
  commit('SET_HOPPER_SETTING', payload)
}

const requestService = async ({ dispatch }, payload) => {
  try {
    const response = await machineAPI.requestService(payload)

    dispatch('app/showSuccess', response.message, { root: true })
  } catch (error) {
    Sentry.captureException(error)
    throw new Error(error)
  }
}

const saveMachine = async ({ commit, dispatch }, payload) => {
  try {
    const response = await machineAPI.saveMachine(payload)

    commit('SET_SAVED_MACHINE_STATUS', response.status)
    dispatch('app/showSuccess', response.message, { root: true })
  } catch (error) {
    Sentry.captureException(error)
    throw new Error(error)
  }
}

const getSavedStatus = async ({ commit }, payload) => {
  try {
    const response = await machineAPI.getSavedStatus(payload)

    commit('SET_SAVED_MACHINE_STATUS', response.status)
  } catch (error) {
    Sentry.captureException(error)
    throw new Error(error)
  }
}

const setSavedMachineStatus = ({ commit }, status) => {
  commit('SET_SAVED_MACHINES_STATUS', status)
}

const getMachines = async ({ commit }, payload) => {
  commit('SET_REPORT_LOADING', true)
  try {
    const response = await machineAPI.getMachines(payload)

    commit('SET_REPORT_MACHINES', response.devices)
  } catch (error) {
    Sentry.captureException(error)
    throw new Error(error)
  } finally {
    commit('SET_REPORT_LOADING', false)
  }
}

const getMachineTags = async ({ commit }, payload) => {
  commit('SET_REPORT_LOADING', true)
  try {
    const response = await machineAPI.getMachineTags(payload)

    commit('SET_REPORT_MACHINE_TAGS', response.tags)
  } catch (error) {
    Sentry.captureException(error)
    throw new Error(error)
  } finally {
    commit('SET_REPORT_LOADING', false)
  }
}

const generateMachinesReport = async ({ commit, dispatch }, payload) => {
  commit('SET_REPORT_LOADING', true)
  commit('REPORT_GENERATE_COMPLETED', false)
  try {
    const response = await machineAPI.generateMachinesReport(payload)

    dispatch('app/showSuccess', response.message, { root: true })

    commit('REPORT_GENERATE_COMPLETED', true)
    commit('SET_REPORT_NAME', response.filename)
  } catch (error) {
    Sentry.captureException(error)
    throw new Error(error)
  } finally {
    commit('SET_REPORT_LOADING', false)
  }
}

const getReportsList = async ({ commit }) => {
  commit('SET_REPORT_LIST_LOADING', true)
  try {
    const response = await machineAPI.getMachinesReportList()

    commit('SET_REPORT_LIST', response.reports)
  } catch (error) {
    Sentry.captureException(error)
    throw new Error(error)
  } finally {
    commit('SET_REPORT_LIST_LOADING', false)
  }
}

const deleteReport = async ({ commit, dispatch }, payload) => {
  commit('SET_REPORT_LIST_LOADING', true)
  try {
    const response = await machineAPI.deleteMachinesReport(payload)

    if (response.status) {
      dispatch('app/showSuccess', response.message, { root: true })
    } else {
      this.$store.dispatch('app/showError', { message: 'Error: ', error: { message: response.message } }, { root: true })
    }

    commit('SET_REPORT_LIST', response.reports)
  } catch (error) {
    Sentry.captureException(error)
    throw new Error(error)
  } finally {
    commit('SET_REPORT_LIST_LOADING', false)
  }
}

const getBlenderWeights = async ({ commit }, payload) => {
  commit('SET_HOPPER_WEIGHTS_LOADING', true)
  try {
    const response = await machineAPI.getBlenderWeights(payload)

    commit('SET_HOPPER_WEIGHT_SERIES', response.series)
  } catch (error) {
    Sentry.captureException(error)
    throw new Error(error)
  } finally {
    commit('SET_HOPPER_WEIGHTS_LOADING', false)
  }
}

const getAlarmHistory = async ({ commit }, payload) => {
  commit('SET_ALARM_HISTORY_LOADING', true)
  try {
    const response = await machineAPI.getAlarmHistory(payload)

    commit('SET_ALARM_HISTORY', response.alarms)
  } catch (error) {
    Sentry.captureException(error)
    throw new Error(error)
  } finally {
    commit('SET_ALARM_HISTORY_LOADING', false)
  }
}

export default {
  initAcsDashboard,
  initLocationsTable,
  initZonesTable,
  initMachinesTable,
  getDashboardMachinesTable,
  changeSelectedCompany,
  getSystemStates,
  getWeeklyRunningHours,
  getTags,
  getDataToolSeries,
  updateDataToolOptions,
  requestService,
  saveMachine,
  getSavedStatus,
  setSavedMachineStatus,
  getMachines,
  getMachineTags,
  generateMachinesReport,
  getReportsList,
  deleteReport,
  getBlenderWeights,
  updateHopperSetting,
  getAlarmHistory
}
