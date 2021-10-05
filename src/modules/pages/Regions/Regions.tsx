import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Container,
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemText,
  TextField,
  Button,
  Paper
} from '@mui/material'
import { Delete, Edit, Save } from '@mui/icons-material'

import { RootState } from '../../../store'
import {
  createNewRegion,
  deleteRegionById,
  updateRegion
} from '../../../store/actions/regionsActions'
import { openAlert } from '../../../store/actions/commonStoreActions'
import { Region } from '../../../store/types'

import useStyles from './styles'
import { Spinner } from '../../common/Spinner'

const Regions: React.FC = () => {
  const c = useStyles()

  const dispatch = useDispatch()

  const [regionName, setRegionName] = useState('')

  const [regionEdit, setRegionEdit] = useState<Region | null>()

  const { regions, loading } = useSelector((state: RootState) => state.regions)

  return (
    <Container>
      <Typography variant="h4" align="center">
        Регионы
      </Typography>

      <Paper
        component="form"
        className={c.form}
        onSubmit={async (e: React.FormEvent) => {
          e.preventDefault()

          if (regionName.trim())
            await dispatch(
              createNewRegion({
                name: regionName.trim()
              })
            )
          else dispatch(openAlert('Введите название!', 'warning'))
        }}
      >
        <Typography>Создать новый регион: </Typography>
        <TextField
          id="region-name"
          className={c.input}
          value={regionName}
          label="Название региона"
          variant="outlined"
          onChange={(e) => setRegionName(e.target.value)}
        />
        <Button className={c.button} variant="contained" type="submit">
          Создать
        </Button>
      </Paper>

      <List className={c.list}>
        {loading && <Spinner size={25} />}

        {!regions.length && (
          <Typography align="center" color="#999">
            Регионов пока нет, создайте новый выше
          </Typography>
        )}
        {regions.map((region, idx) => (
          <ListItem
            className={c.listItem}
            key={region.id}
            secondaryAction={
              <>
                {regionEdit?.id === region.id ? (
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      dispatch(
                        updateRegion({
                          ...regionEdit,
                          name: regionEdit.name.trim()
                        })
                      )
                      setRegionEdit(null)
                    }}
                  >
                    <Save />
                  </IconButton>
                ) : (
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => setRegionEdit(region)}
                  >
                    <Edit />
                  </IconButton>
                )}

                <IconButton
                  edge="end"
                  aria-label="delete"
                  sx={{ marginLeft: '10px' }}
                  onClick={async () => {
                    await dispatch(deleteRegionById(region.id))
                  }}
                >
                  <Delete />
                </IconButton>
              </>
            }
          >
            {regionEdit?.id === region.id ? (
              <TextField
                className={c.editInput}
                label="Название региона"
                variant="outlined"
                value={regionEdit?.name}
                onChange={(e) =>
                  setRegionEdit({ ...regionEdit, name: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
              />
            ) : (
              <ListItemText primary={region.name} />
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default Regions
