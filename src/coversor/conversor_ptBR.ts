const SIMPLES: { [key: number]: string } = {
    1: "um",
    2: "dois",
    3: "três",
    4: "quatro",
    5: "cinco",
    6: "seis",
    7: "sete",
    8: "oito",
    9: "nove",
    10: "dez",
    11: "onze",
    12: "doze",
    13: "treze",
    14: "quatorze",
    15: "quinze",
    16: "dezesseis",
    17: "dezessete",
    18: "dezoito",
    19: "dezenove",
    20: "vinte",
    30: "trinta",
    40: "quarenta",
    50: "cinquenta",
    60: "sessenta",
    70: "setenta",
    80: "oitenta",
    90: "noventa",
    100: "cem",
    200: "duzentos",
    300: "trezentos",
    400: "quatrocentos",
    500: "quinhentos",
    600: "seiscentos",
    700: "setecentos",
    800: "oitocentos",
    900: "novecentos",
    1000: "mil",
};

const DEZENAS: { [key: string]: string } = {
    1: "dez",
    2: "vinte",
    3: "trinta",
    4: "quarenta",
    5: "cinquenta",
    6: "sessenta",
    7: "setenta",
    8: "oitenta",
    9: "noventa",
};

const CENTENAS: { [key: string]: string } = {
    1: "cento",
    2: "duzentos",
    3: "trezentos",
    4: "quatrocentos",
    5: "quinhentos",
    6: "seiscentos",
    7: "setecentos",
    8: "oitocentos",
    9: "novecentos",
};

export function converterNumero(numero: string): string {
        numero = numero.replace(',','.');
        const numeroRecebido = parseFloat(numero);
        if (!isNaN(numeroRecebido)){ 

        var retorno: string = '';
        if (numero.startsWith('-')) {
            retorno = 'menos ' + retorno;
        }

        retorno += converterNumerosSimples(numeroRecebido);
        if (retorno !== '' && retorno !== 'menos ') {
            return retorno;
        }


        var numeroInteiro = parseInt(numero.split('.')[0]);

        var numeroInteiroPositivo = Math.abs(numeroInteiro);

        retorno = converterUsandoDivisoes(numeroInteiroPositivo);

        if (numeroRecebido - numeroInteiro > 0) {
            var casasDecimais = numero.split('.')[1];
            retorno += converterCasasDecimais(casasDecimais);
        }
        return retorno;
    } 
    else {
        return "houve um erro";
    }
}

function converterCasasDecimais(numeroRecebido: string): string {
    var casasImportantes = numeroRecebido.substring(0, 3)

    if (casasImportantes === '000')
        return '';

    var sufixo: string = ' vírgula ';
    if (numeroRecebido.startsWith('0'))
        sufixo += 'zero ';
    if (numeroRecebido.startsWith('00'))
        sufixo += 'zero ';


    while (casasImportantes.endsWith('0')) {
        casasImportantes = casasImportantes.slice(0, -1);
    }

    var numero = parseInt(casasImportantes);

    return sufixo + centenasPorExtenso(numero);
}

function converterNumerosSimples(numero: number): string {
    if (numero === 0) {
        return 'zero';
    }

    var retorno: string = SIMPLES[numero];
    if (retorno === undefined)
        return '';

    return retorno;
}

function converterUsandoDivisoes(numero: number): string {
    var numeroPorExtenso: string = "maior que um milhão";
    if (numero < 1000) {
        numeroPorExtenso = centenasPorExtenso(numero);
    }
    else if (numero < 1000000) {
        const milhares = Math.trunc(numero / 1000);
        const centenas = numero % 1000;
        numeroPorExtenso = centenasPorExtenso((milhares)) + ' mil';
        if (usarEAposMilhar(centenas))
            numeroPorExtenso += ' e';
        numeroPorExtenso += ' ' + centenasPorExtenso(centenas);
    }

    numeroPorExtenso = numeroPorExtenso.replace('um mil ', 'mil ');
    return numeroPorExtenso;
}

function usarEAposMilhar(centenas: number): boolean {
    const centenas_string = centenas.toString();
    return (centenas < 99 || centenas_string.endsWith('00'));
}

function centenasPorExtenso(numero: number): string {
    const dezenas = numero % 100;
    if (dezenas === 0) {
        return converterNumerosSimples(numero);
    }

    const centena = Math.trunc(numero / 100);
    var numeroPorExtenso: string = CENTENAS[centena];

    if (numeroPorExtenso != undefined) {
        numeroPorExtenso += ' e ' + dezenasPorExtenso(dezenas);
    } else {
        numeroPorExtenso = dezenasPorExtenso(numero);
    }

    return numeroPorExtenso;
}

function dezenasPorExtenso(numero: number): string {
    var numeroPorExtenso: string = converterNumerosSimples(numero);
    if (numeroPorExtenso === '') {
        const dezena = Math.trunc(numero / 10);
        const unidade = Math.trunc(numero % 10);
        numeroPorExtenso = DEZENAS[dezena] + ' e ' + SIMPLES[unidade];
    }

    return numeroPorExtenso;
}

