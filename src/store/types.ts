// AUTH
export const SET_USER = 'SET_USER'
export const SIGN_OUT = 'SIGN_OUT'
export const SET_LOADING = 'SET_LOADING'
export const SET_ERROR = 'SET_ERROR'
export const NEED_VERIFICATION = 'NEED_VERIFICATION'
export const SET_SUCCESS = 'SET_SUCCESS'

// REGIONS
export const CREATE_REGION = 'CREATE_REGION'
export const SET_REGIONS = 'SET_REGIONS'

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

// Actions

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

// REGIONS
interface CreateRegionAction {
  type: typeof CREATE_REGION
  payload: Region
}

interface SetRegionsAction {
  type: typeof SET_REGIONS
  payload: Region[]
}

export type AuthAction =
  | SetUserAction
  | SetLoadingAction
  | SignOutAction
  | SetErrorAction
  | NeedVerificationAction
  | SetSuccessAction

export type RegionAction = CreateRegionAction | SetRegionsAction
