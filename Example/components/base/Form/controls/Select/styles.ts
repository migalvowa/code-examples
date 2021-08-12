import { makeStyles } from '@material-ui/core'

const SELECT_ITEM_HEIGHT = 48
const MAX_ITEMS_COUNT = 7

export const useStyles = makeStyles(() => {
  return {
    label: {
      maxWidth: 'calc(100% - 48px)',
      display: 'flex',
      whiteSpace: 'nowrap',
    },
    paper: {
      margin: 0,
    },
    listbox: {
      padding: 0,
      maxHeight: `${SELECT_ITEM_HEIGHT * MAX_ITEMS_COUNT}px`,
    },
    option: {
      lineHeight: 1.2,
      height: SELECT_ITEM_HEIGHT,
    },
    input: {
      cursor: 'pointer',
    },
    inputRoot: {
      cursor: 'pointer',
    },
    notchedOutline: {
      '& fieldset legend': {
        width: 0,
      },
    },
  }
})
