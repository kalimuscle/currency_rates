const express = require('express');
const router = express.Router();   
const axios = require('axios');

/**
* @swagger
* /currencies/{currencyBase}/rate:
*   get:
*     name: Currencies
*     summary: Given a currencyBase, return the exchange rate for that currency respect others.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: currency base to use
*     responses:
 *       200:
 *         description: Respuesta exitosa con las tasas de cambio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Request successful
 *                   example: true
 *                 baseCurrency:
 *                   type: string
 *                   description: base currency
 *                   example: USD
 *                 rates:
 *                   type: object
 *                   description: Currency rate against currency base
 *                   additionalProperties:
 *                     type: number
 *                   example:
 *                     EUR: 0.85
 *                     GBP: 0.75
 *                     JPY: 110.5
 *       4[xx]:
 *         description: No valid request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Base currency no valid"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal server error"
 *       502:
 *         description: Extern API error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Problem with extern API communication"
*/
router.get('/:currencyBase/rate', async (req, res) => {
    
    try{
        const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${req.params.currencyBase}`;
        const response = await axios.get(url);
            
        return res.status(200).json({ 
            success: true, 
            baseCurrency: req.params.currencyBase, 
            rates: response.data.conversion_rates
        });
        
    } catch (error) {
        if (error.response) {
            // API externa respondió con un código de error
            res.status(error.response.status).json({
            success: false,
            status: error.response.status,
            message: error.response.statusText,
            data: error.response.data || null,
            });
        } else if (error.request) {
            // No hubo respuesta de la API externa
            console.error("No hubo respuesta de la API externa:", error.message);
            res.status(502).json({
            success: false,
            message: "No se obtuvo respuesta de la API externa.",
            });
        } else {
            // Otro error ocurrió al configurar la solicitud
            console.error("Error en la solicitud:", error.message);
            res.status(500).json({
            success: false,
            message: "Error al procesar la solicitud.",
            });
        }
    }
})

module.exports = router;