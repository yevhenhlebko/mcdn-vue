import Vue from 'vue'
import Vuex from 'vuex'

// Global vuex
import AppModule from './app'
import auth from './auth'
import companies from './companies'
import machines from './machines'
import settings from './settings'
import users from './users'
import zones from './zones'
import locations from './locations'
import devices from './devices'
import cities from './cities'
import alarms from './alarms'
import notes from './notes'
import configurations from './configurations'
import materials from './materials'
import thresholds from './thresholds'

import barGraph from '../components/dashboard/product/common/bar-graph/store'
import overviewCard from '../components/dashboard/product/common/overview/store'

import bdBlenderAnalytics from '../components/dashboard/product/product-analytics/bd-batch-blender/store'
import accumeterOvationBlender from '../components/dashboard/product/product-analytics/accumeter-ovation-continuous-blender/store'
import ngxDryer from '../components/dashboard/product/product-analytics/ngx-dryer/store'
import ngxNomadDryer from '../components/dashboard/product/product-analytics/ngx-nomad-dryer/store'
import vtcPlusConveying from '../components/dashboard/product/product-analytics/vtc-plus-conveying-system/store'
import ghGravimetricControlHopper from '../components/dashboard/product/product-analytics/gh-gravimetric-extrusion-control-hopper/store'
import truetempTcu from '../components/dashboard/product/product-analytics/truetemp-tcu/store'
import heChiller from '../components/dashboard/product/product-analytics/he-central-chiller/store'
import t50 from '../components/dashboard/product/product-analytics/t50-central-granulator/store'

Vue.use(Vuex)

/**
 * Main Vuex Store
 */
const store = new Vuex.Store({
  modules: {
    app: AppModule,
    auth,
    machines,
    users,
    zones,
    settings,
    locations,
    companies,
    devices,
    cities,
    alarms,
    notes,
    configurations,
    materials,
    thresholds,

    barGraph,
    overviewCard,

    bdBlenderAnalytics,
    accumeterOvationBlender,
    ghGravimetricControlHopper,
    ngxDryer,
    ngxNomadDryer,
    vtcPlusConveying,
    truetempTcu,
    heChiller,
    t50
  }
})

export default store
