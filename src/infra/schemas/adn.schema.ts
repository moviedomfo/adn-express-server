import { Schema, model } from 'mongoose';

export interface IDNASchema  {
    dna:string ;
    hasMutation:boolean;
    _id:string;
    createdAt:string;
    updatedAt:string;
}


// 2. Create a Schema corresponding to the document interface.
const DNASchema = new Schema<IDNASchema>({

    dna: { type: String, required: true },
    hasMutation:{ type: Boolean, required: true }

  },{
    versionKey:false,
    timestamps:true,
  });

  export default model('DNA',DNASchema);