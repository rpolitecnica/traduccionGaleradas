const getUrl = window.location;
//const HOST_API = 'http://localhost:3000';
const HOST_API = 'https://traducciongaleradasback.herokuapp.com';
 
export const environment = {
  production: true,
  HOST_API,
  services:{
    baseUrl: `${HOST_API}/api/usuarios`,
    baseUrlEdiciones: `${HOST_API}/api/ediciones`,
    baseUrlPeriodos: `${HOST_API}/api/periodos`,
    baseUrlCorreos: `${HOST_API}/api/correos`,
    baseUrlTraducciones: `${HOST_API}/api/traducciones`,
  }
};
