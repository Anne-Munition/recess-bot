const isProd = process.env.NODE_ENV === 'production'

export const mainVoice = isProd ? '1007826366814769162' : '1010399156403175445'
export const alphaVoice = isProd ? '1001504601046003722' : '1010399279208214528'
export const bravoVoice = isProd ? '1001494482065309731' : '1010399333578965102'
export const charlieVoice = isProd ? '1001504268785827990' : '1010399400612335666'
export const deltaVoice = isProd ? '1007824326478807050' : '1010399462109216821'
export const echoVoice = isProd ? '1007824356417736866' : '1010399556313284628'

export const studentRole = isProd ? '1001535771704053790' : '1010421037697081425'
export const alphaRole = isProd ? '1007057542565867560' : '1010421084404850758'
export const bravoRole = isProd ? '1007058107941273702' : '1010421165380079618'
export const charlieRole = isProd ? '1007058161993265274' : '1010421205100138506'
export const deltaRole = isProd ? '1007058224576483371' : '1010421258103566367'
export const echoRole = isProd ? '1007058281602240563' : '1010421302064058500'

export const map: { [key: string]: { voice: string; role: string } } = {
  alpha: {
    voice: alphaVoice,
    role: alphaRole,
  },
  bravo: {
    voice: bravoVoice,
    role: bravoRole,
  },
  charlie: {
    voice: charlieVoice,
    role: charlieRole,
  },
  delta: {
    voice: deltaVoice,
    role: deltaRole,
  },
  echo: {
    voice: echoVoice,
    role: echoRole,
  },
}
