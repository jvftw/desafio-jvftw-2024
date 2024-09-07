class RecintosZoo {

    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animaisExistentes: [{ especie: 'MACACO', quantidade: 3, carnivoro: false }] },
            { numero: 2, bioma: 'floresta', tamanho: 5, animaisExistentes: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animaisExistentes: [{ especie: 'GAZELA', quantidade: 1, carnivoro: false }] },
            { numero: 4, bioma: 'rio', tamanho: 8, animaisExistentes: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animaisExistentes: [{ especie: 'LEAO', quantidade: 1, carnivoro: true }] }
        ];

        this.animais = {
            LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }

        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const { tamanho, biomas, carnivoro } = this.animais[animal];
        const recintosViaveis = [];

        for (const recinto of this.recintos) {
            if (!biomas.includes(recinto.bioma) && !(animal === 'HIPOPOTAMO' && recinto.bioma === 'savana e rio')) {
                continue;
            }

            let espacoOcupado = recinto.animaisExistentes.reduce((acc, { especie, quantidade }) => {
                const tam = this.animais[especie].tamanho * quantidade;
                const extraSpace = (especie !== animal) ? 1 : 0;
                return acc + tam + extraSpace;
            }, 0);

            if (carnivoro && recinto.animaisExistentes.length > 0 && recinto.animaisExistentes[0].especie !== animal) {
                continue;
            }

            if (animal === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio') {
                continue;
            }

            if (animal === 'MACACO' && quantidade === 1 && recinto.animaisExistentes.length === 0) {
                continue;
            }

            const novoEspacoOcupado = espacoOcupado + (tamanho * quantidade);
            const espacoLivre = recinto.tamanho - novoEspacoOcupado;

            if (espacoLivre >= 0) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`);
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };
