import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const TODAY = new Date().toISOString().substr(0, 10) // YYYY-MM-DD

const state = {
  machines: [],
  reportMachines: [],
  reportMachineTags: [],
  generateCompleted: false,
  reportName: '',
  reportsListLoading: false,
  reportsList: [],
  selectedId: 0,

  selectedCompany: null,

  isSavedMachine: false,
  isReportLoading: false,

  // Accumeter Ovation Continuous Blender
  actualRecipe2Values: [],
  targetRecipe2Values: [],

  systemStates: {},
  loadingSystemStates: false,

  // Feeder stables in machine type 2
  feederStables: [],
  loadingFeederStables2: false,

  loadingActualTargetBar: false,

  // Running hours per weekday
  loadingWeeklyRunningHours1: false,
  weeklyRuningHours: [],

  // Locations table series
  loadingLocationsTable: false,
  downtimeDistribution: [],

  // Zones table
  loadingZonesTable: false,

  loadingMachinesTable: false,

  // Alarm history
  alarmHistoryLoading: false,
  alarmHistory: [],

  timeRangeOptions: [
    {
      label: 'Last 30 minutes',
      value: 'last30Min'
    },
    {
      label: 'Last hour',
      value: 'lastHour'
    },
    {
      label: 'Last 4 hours',
      value: 'last4Hours'
    },
    {
      label: 'Last 12 hours',
      value: 'last12Hours'
    },
    {
      label: 'Last 24 hours',
      value: 'last24Hours'
    },
    {
      label: 'Last 48 hours',
      value: 'last48Hours'
    },
    {
      label: 'Last 3 days',
      value: 'last3Days'
    },
    {
      label: 'Last 7 days',
      value: 'last7Days'
    },
    {
      label: 'Last 14 days',
      value: 'last14Days'
    },
    {
      label: 'Last 24 days',
      value: 'last24Days'
    },
    {
      label: 'Custom',
      value: 'custom'
    }
  ],

  // BD Batch Blender
  totalRunningPercentage: 0,

  loadingEnabledProperties: false,
  enabledProperties: [],

  loadingDataToolSeries: false,
  dataToolSeries: [],
  tags: [],
  selectedTags: [],
  dataToolTimeRange: {
    timeRangeOption: 'last24Hours',
    dates: [TODAY, TODAY]
  },
  hopperSettingTimeRange: {
    timeRangeOption: 'last24Hours',
    dates: [TODAY, TODAY]
  },
  selectedHoppers: [{
    id: 0, name: 'Hopper 1'
  }, {
    id: 1, name: 'Hopper 2'
  }, {
    id: 2, name: 'Hopper 3'
  }],
  hopperWeightLoading: false,
  hopperWeightSeries: []
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
