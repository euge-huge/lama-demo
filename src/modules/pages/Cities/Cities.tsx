import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Typography } from '@mui/material'
import { Delete } from '@mui/icons-material'

import {
  DataGrid,
  GridValueGetterParams,
  GridCellEditCommitParams,
  GridActionsCellItem,
  GridRowParams
} from '@mui/x-data-grid'

import { AddCityForm } from './components/AddCityForm'

import { RootState } from '../../../store'
import {
  updateCity,
  deleteСityById
} from '../../../store/actions/citiesActions'
import { City } from '../../../store/types'

const Cities: React.FC = () => {
  const dispatch = useDispatch()

  const {
    regions: { regions },
    cities: { cities, loading }
  } = useSelector((state: RootState) => state)

  const columns = [
    {
      field: 'name',
      headerName: 'Населенный пункт',
      flex: 1,
      editable: true,
      sortable: false
    },
    {
      field: 'regionId',
      headerName: 'Регион',
      type: 'singleSelect',
      valueOptions: regions.map((region) => {
        return {
          value: region.id,
          label: region.name
        }
      }),
      valueGetter: (params: GridValueGetterParams): string => {
        const region = regions.find((region) => region.id === params.value)
        return params.value && region ? region.name : 'не указано'
      },
      flex: 1,
      editable: true,
      sortable: false
    },
    {
      field: 'population',
      headerName: 'Население',
      type: 'number',
      editable: true,
      flex: 1,
      filterable: true
    },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => dispatch(deleteСityById(params.id.toString()))}
        />
      ]
    }
  ]

  const rows = cities.map((city) => {
    return {
      id: city.id,
      name: city.name,
      regionId: city.regionId,
      population: city.population
    }
  })

  return (
    <>
      <Typography variant="h4" align="center">
        Населенные пункты
      </Typography>

      <AddCityForm />

      <div style={{ width: '99%', margin: '20px auto 0 auto' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              autoHeight
              pageSize={10}
              rowsPerPageOptions={[5]}
              onCellEditCommit={(params: GridCellEditCommitParams) => {
                const city = cities.find((city) => city.id === params.id)

                const cityToUpdate = {
                  ...city,
                  [params.field]: params.value
                } as City

                dispatch(updateCity(cityToUpdate))
              }}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Cities
