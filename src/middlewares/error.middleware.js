// Error handling middleware
export const errorHandler = (err, req, res, next) => {
    return res.status(err.status || 500).json({message: err.message || 'Algo salio mal!'});
} 