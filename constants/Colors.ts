const tintColorLight = '#2f95dc'
const tintColorDark = '#fff'

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark
  },
  primary: '#F97316',
  secondary: '#0F172A',
  tertiary: '#808080',
  error: '#B00020',
  label: {
    pending: {
      text: '#d97706',
      background: '#fef9c3'
    },
    approved: {
      text: '#22c55e',
      background: '#dcfce7'
    },
    closed: {
      text: '#ef4444',
      background: '#fee2e2'
    }
  }
}
