import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import {
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'

import { RootState } from '../../../../../store'
import { createCity } from '../../../../../store/actions/citiesActions'
import { openAlert } from '../../../../../store/actions/commonStoreActions'

import useStyles from './styles'

const AddCityForm = () => {
  const c = useStyles()

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [selectRegion, setSelectRegion] = useState('')
  const [population, setPopulation] = useState(1)

  const { regions } = useSelector((state: RootState) => state.regions)

  return (
    <Paper
      component="form"
      className={c.form}
      onSubmit={async (e: React.FormEvent) => {
        e.preventDefault()

        if (name.trim() && selectRegion && population)
          await dispatch(
            createCity({
              name,
              regionId: selectRegion,
              population
            })
          )
        else dispatch(openAlert('Не все поля заполнены!', 'warning'))
      }}
    >
      <Typography>Создать населенный пункт: </Typography>

      <TextField
        className={c.input}
        value={name}
        label="Название"
        variant="outlined"
        onChange={(e) => setName(e.target.value)}
      />

      <FormControl className={c.region}>
        <InputLabel id="regionInput">Регион</InputLabel>
        <Select
          labelId="regionInput"
          label="Регион"
          value={selectRegion}
          onChange={(e) => {
            setSelectRegion(e.target.value)
          }}
        >
          <MenuItem disabled>Регионы</MenuItem>
          {regions.length &&
            regions.map((region) => (
              <MenuItem key={region.id} value={region.id}>
                {region.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <TextField
        id="population"
        className={c.input}
        value={population}
        type="number"
        label="Население"
        variant="outlined"
        onChange={(e) => setPopulation(Number(e.target.value))}
      />
      <Button className={c.button} variant="contained" type="submit">
        Создать
      </Button>
    </Paper>
  )
}

export default AddCityForm
