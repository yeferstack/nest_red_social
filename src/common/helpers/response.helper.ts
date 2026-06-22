/**
 * clase encargada de construrir las respuestas de la API estandar
 */

export class ResponseHelper {
    /**
     * Respuesta exitosa
     */
    static success(
        data: any, 
        statusCode= 200,
    ) 
        {
         return {
            success: true, 
            statusCode, 
            data
        } 
    }
    /**
     * Respuesta de error
     */
    static error(
        data: any,
        statusCode= 400,
    ) {
        return {
            success: false, 
            statusCode, 
            data
        } 
    }
}