import reactPlugin from '@vitejs/plugin-react-refresh'
import type { UserConfig } from 'vite'

const config: UserConfig = {
  plugins: [reactPlugin()]
}

export default config
