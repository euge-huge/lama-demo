// Common
export const SET_ALERT = 'SET_ALERT'

// Auth
export const SET_USER = 'SET_USER'
export const SIGN_OUT = 'SIGN_OUT'
export const SET_LOADING = 'SET_LOADING'
export const SET_ERROR = 'SET_ERROR'
export const NEED_VERIFICATION = 'NEED_VERIFICATION'
export const SET_SUCCESS = 'SET_SUCCESS'

// Regions
export const SET_REGIONS = 'SET_REGIONS'
export const SET_REGIONS_LOADING = 'SET_REGIONS_LOADING'

// Cities
export const SET_CITIES = 'SET_CITIES'
export const SET_CITIES_LOADING = 'SET_CITIES_LOADING'

// Common
export interface CommonState {
  alert: Alert
}

export interface Alert {
  isOpen: boolean
  message: string | null
  type?: AlertTypes
}

export type AlertTypes = 'success' | 'error' | 'warning'

// Auth
export interface User {
  firstName: string
  lastName: string
  email: string
  id: string
  createdAt: any
}

export interface AuthState {
  user: User | null
  authenticated: boolean
  loading: boolean
  error: string
  needVerification: boolean
  success: string
}

export interface SignUpData {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface SignInData {
  email: string
  password: string
}

// Regions
export interface Region {
  id: string
  name: string
  createdAt: any
  ownerId?: string
}

export interface RegionsState {
  regions: Region[]
  loading: boolean
}

export interface RegionDataForm {
  name: string
}

// Cities
export interface City {
  id: string
  name: string
  regionId: string
  population: number
  createdAt: any
  ownerId?: string
}

export interface CitiesState {
  cities: City[]
  loading: boolean
}

export interface CitiyDataForm {
  name: string
  regionId: string
  population: number
}

// Actions
// Common
interface SetAlert {
  type: typeof SET_ALERT
  payload: Alert
}

// Auth
interface SetUserAction {
  type: typeof SET_USER
  payload: User
}

interface SetLoadingAction {
  type: typeof SET_LOADING
  payload: boolean
}

interface SignOutAction {
  type: typeof SIGN_OUT
}

interface SetErrorAction {
  type: typeof SET_ERROR
  payload: string
}

interface NeedVerificationAction {
  type: typeof NEED_VERIFICATION
}

interface SetSuccessAction {
  type: typeof SET_SUCCESS
  payload: string
}

// Regions
interface SetRegionsAction {
  type: typeof SET_REGIONS
  payload: Region[]
}
interface SetRegionsLoadingAction {
  type: typeof SET_REGIONS_LOADING
  payload: boolean
}

// Cities
interface SetCitiesAction {
  type: typeof SET_CITIES
  payload: City[]
}
interface SetCitiesLoadingAction {
  type: typeof SET_CITIES_LOADING
  payload: boolean
}

export type CommonStateAction = SetAlert

export type AuthAction =
  | SetUserAction
  | SetLoadingAction
  | SignOutAction
  | SetErrorAction
  | NeedVerificationAction
  | SetSuccessAction

export type RegionAction = SetRegionsAction | SetRegionsLoadingAction

export type CitiyAction = SetCitiesAction | SetCitiesLoadingAction
