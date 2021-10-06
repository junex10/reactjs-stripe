import * as env from './../enviroments/enviroment.json';

export class Utility {
   constructor() {
       
   }
   private DataJson(path: string, fileType: string) {
      return new Promise(async(resolve, reject) => {
         await import(path)
         .then(x => resolve(x))
         .catch(x => reject(`An error has ocurred while opening an file ${fileType}, codeError: ${x}`))
      });
   }
   public AppSettingsJson() {
      return (env.actualEnviroment == 'development') ? this.DataJson(`./../${env.enviroments.development.settings}`, 'json') : this.DataJson(`./../${env.enviroments.production.settings}`, 'json');
   }
   // Gettins
   static get AppSettings() { return (env.actualEnviroment == 'development') ? env.enviroments.development.settings : env.enviroments.production.settings }
   static get Enviroment() { return env; }
}