import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import {
  createNewRegion,
  getAllRegions
} from '../../../store/actions/regionsActions'

import useStyles from './styles'

const Cities: React.FC = () => {
  const dispatch = useDispatch()

  const { regions } = useSelector((state: RootState) => state.regions)

  const c = useStyles()
  return (
    <div>
      <h1>Cities</h1>
      <button
        onClick={() => {
          dispatch(
            createNewRegion({
              name: 'OMSK'
            })
          )
        }}
      >
        create
      </button>

      <button
        onClick={async () => {
          await dispatch(getAllRegions())
        }}
      >
        set
      </button>

      <p>regions:</p>
      {regions.map((region) => {
        return <div key={region.id}>{region.name}</div>
      })}
    </div>
  )
}

export default Cities
