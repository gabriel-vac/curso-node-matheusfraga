import { Schema, model } from 'mongoose';

const HouseSchema = new Schema(
    {
        thumbnail: String,
        description: String,
        price: Number,
        location: String,
        status: Boolean,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        toJSON: {
            virtuals: true, //estou dizendo para colocar a variavel virtual junto na requisição
        },
    }
);

//criar um campo virtual (ou seja, quando criarmos uma casa, não irá ser criado este campo, mas quando devolvermos ele estará lá. NÃO IRÁ CRIAR O CAMPO NA TABELA)

HouseSchema.virtual('thumbnail_url').get(function () {
    //precisa ter function
    return `http://localhost:3333/files/${this.thumbnail}`;
});

export default model('House', HouseSchema);
