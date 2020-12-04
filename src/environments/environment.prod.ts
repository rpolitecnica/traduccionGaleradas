const getUrl = window.location;
//const HOST_API = 'http://localhost:3000';
const HOST_API = 'https://traducciongaleradasback.herokuapp.com';
 
export const environment = {
  production: true,
  HOST_API,
  urlFront:getUrl.protocol + '//' + getUrl.host,
  services:{
    baseUrl: `${HOST_API}/api/usuarios`,
    baseUrlEdiciones: `${HOST_API}/api/ediciones`,
    baseUrlEdicionesYear: `${HOST_API}/api/edicionesYear`,
    baseUrlEdicionesYearIdEdicion: `${HOST_API}/api/edicionesYearEdicion`,
    baseUrlPeriodos: `${HOST_API}/api/periodos`,
    baseUrlCorreos: `${HOST_API}/api/correos`,
    baseUrlTraducciones: `${HOST_API}/api/traducciones`,
    baseUrlTraduccionesdEdicionAnio: `${HOST_API}/api/traduccionesIdEdicionAnio`,
    baseUrlTraducir: `${HOST_API}/api/traducir`,
    baseUrlMenu: `${HOST_API}/api/menu`,
    baseUrlPerfiles: `${HOST_API}/api/perfiles`,
  }
};
