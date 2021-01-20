import express, { Request, Response } from 'express';
import { converterNumero } from './coversor/conversor_ptBR'


const app = express();

app.get('/pt-br', (req: Request, res: Response) => {
    const { num } = req.query;
    if (num === undefined)
        return res.status(400).json({ message: 'Parâmetro não enviado'});
    else {
        var numeroInformado: string = (num || '0').toString();
        const extenso: string = converterNumero(numeroInformado);
        return res.json({ response: extenso });
    }
});

app.listen(3333);