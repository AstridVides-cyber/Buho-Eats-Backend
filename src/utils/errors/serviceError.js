// Service Error 
export class ServiceError extends Error {
    constructor(error) {
        super(`Hubo un error al buscar: ${error.message}`);
        this.code = 500;
        this.name = 'Internal Server Error';
    }
};