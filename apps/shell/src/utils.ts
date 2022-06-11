import path from 'path'
import {cwd} from 'process'
export const getPath = (...args: string[]) => path.join(cwd(), ...args)
