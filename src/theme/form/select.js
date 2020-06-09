import defaults from '../defaults.json'
import { get } from 'jsutils'
import { colors } from '../colors'
import { padding } from '../padding'
import { typography } from '../typography'
import { sharedForm } from './sharedForm'

export const select = {
  default: {
    $all: {
      ...sharedForm.border,
      ...sharedForm.inputs,
    },
    $web: {
      ...typography.font.family,
      outline: 'none',
      boxSizing: 'border-box',
    },
    $native: {
      width: '100%',
    },
  },
}
