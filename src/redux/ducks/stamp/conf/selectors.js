import { getPreview } from '../utils'

export const selectConfWidth = state => state.stampConf.width
export const selectConfHeight = state => state.stampConf.height

//export const selectConfForPreview = state => getPreview(state.stampConf)
export const selectConf = state => state.stampConf