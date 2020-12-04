// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const getUrl = window.location;
const HOST_API = getUrl.protocol + '//' + getUrl.host;
//const HOST_API = 'http://localhost:3000';
export const environment = {
  production: false,
  HOST_API,
  urlFront:getUrl.protocol + '//' + getUrl.host,
  services:{
    baseUrl: `${HOST_API}/api/usuarios`,
    baseUrlEdiciones: `${HOST_API}/api/ediciones`,
    baseUrlEdicionesYear: `${HOST_API}/api/edicionesYear`,
    baseUrlPeriodos: `${HOST_API}/api/periodos`,
    baseUrlCorreos: `${HOST_API}/api/correos`,
    baseUrlTraducciones: `${HOST_API}/api/traducciones`,
    baseUrlTraduccionesdEdicionAnio: `${HOST_API}/api/traduccionesIdEdicionAnio`,
    baseUrlTraducir: `${HOST_API}/api/traducir`,
    baseUrlMenu: `${HOST_API}/api/menu`,
    baseUrlPerfiles: `${HOST_API}/api/perfiles`,
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
