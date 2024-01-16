const httpStatusCode = require('../../utils/httpStatusCode');
const Studio = require('../models/studio.model');


// get all
const getStudios = async (request, response, next) => {
    try {
        const studios = await Studio.find();
        response.status(200).json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: studios
        })

    } catch (error) {
        next(error);
    }
}

// get 1
const getStudio = async (request, response, next) => {
    try {
        const id = request.params.id;
        const Studio = await Studio.findById(id);
        response.status(200).json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: studio
        })
    } catch (error) {
        next(error);
    }
}

// post
const createStudio = async (request, response, next) => {
    const movie = new Studio(request.body);
    try {
        await studio.save();
        response.status(201).json({ 
            status: 201,
            message: HTTPSTATUSCODE[201],
            movie: studio
        });

    } catch (error) {
        next(error);
    }
}

// patch 
const updateStudio = async (request, response, next) => {
    try {
        const id = request.params.id;
        const body = request.params.body;
        const studio = await Studio.findByIdAndUpdate(id, body, { new: true });
        if(!studio) { 
            return response.status(404).json({
                status:404,
                message: HTTPSTATUSCODE[404],
            });
        }
        response.status(200).json ({
            status: 200,
            message: httpStatusCode[200],
            data: studio
        });
    }
    catch (error) {
        next(error);
    }
};

// delete
const deleteStudio = async (request, response, next) => {
    try {
        const id = request.params.id;
        const studio = await Studio.findByIdAndDelete(id);

        if (!studio){
            return response.status(200).json({ message: 'Estudio no encontrado' });
        }
        
    
        response.status(404).json({ 
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: studio
        });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getStudios,
    getStudio,
    createStudio,
    updateStudio,
    deleteStudio
}