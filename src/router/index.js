import { createRouter, createWebHistory } from 'vue-router'
import MainMap from '../components/MainMap.vue'
import HomeComponent from '../components/HomeComponent.vue'
import PlacesComponent from '../components/PlacesComponent.vue'
import PeopleComponent from '../components/PeopleComponent.vue'
import DocumentsComponent from '../components/DocumentsComponent.vue'
import SeeDocument from '../components/SeeDocument.vue'
import LogInComponent from '../components/LogInComponent.vue'
import AdminDocuments from '../components/adminComponents/AdminDocuments.vue'
import AdminPlaces from '../components/adminComponents/AdminPlaces.vue'
import AdminPeople from '../components/adminComponents/AdminPeople.vue'
import TimelinesComponent from '../components/TimelinesComponent.vue'

const routes = [
  { path: '/',component:HomeComponent},
  { path: '/map', component: MainMap },
  { path: '/places',component:PlacesComponent},
  { path: '/people',component:PeopleComponent},
  { path: '/documents',component:DocumentsComponent},
  { path: '/document/:id',name:'document',component:SeeDocument,props:true},
  { path: '/login',component:LogInComponent},
  { path: '/admin/documents',component:AdminDocuments},
  { path: '/admin/places', component:AdminPlaces},
  { path: '/admin/people', component:AdminPeople},
  { path: '/timelines', component:TimelinesComponent}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router