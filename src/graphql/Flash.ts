import { extendType, objectType,  nonNull, stringArg, intArg  } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen"; 

export const Flash = objectType({
    name: "FlashCard", // <- Name of your type
    definition(t) {
        t.nonNull.int("id"); 
        t.nonNull.string("description"); 
        t.nonNull.string("question"); 
        t.nonNull.string("answer")
    },
});


export const LinkQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("feed", {  
            type: "FlashCard",
            resolve(parent, args, context, info) {   
                return context.prisma.flashcard.findMany();
            },
        });
    },
});

export const FlashCardMutation = extendType({ 
    type: "Mutation",    
    definition(t) {
        t.nonNull.field("post", { 
            type: "FlashCard",  
            args: {  
                description: nonNull(stringArg()),
                question: nonNull(stringArg()),
                answer: nonNull(stringArg())
            },
            
            resolve(parent, args, context) {
                const { userId } = context
                if(!userId){
                    throw new Error("Admin are the only one to post flashcard, if you are an admin login please")
                }
                const newflashcard = context.prisma.flashcard.create({
                    data:{
                        description:args.description,
                        question:args.question,
                        answer:args.answer
                    }
                });
                return newflashcard
            },
        });
        t.nonNull.field("put", {
            type: "FlashCard",
            args: {
                description: nonNull(stringArg()),
                question: nonNull(stringArg()),
                answer:nonNull(stringArg()),
                id: nonNull(intArg())
            },
            resolve(parent,args,context) {
                const { userId } = context
                if(!userId){
                    throw new Error("Admin are the only one to update a flash card, if you are an admin login please")
                }
                const { description, answer,question,id } = args;  
                const updatedFlash:any = context.prisma.flashcard.update({
                    where: {id: args.id},
                    data: {
                        description: args.description,
                        question: args.answer,
                        answer: args.question,
                      },
                });
                return updatedFlash
            }
        });
        t.nonNull.field("delete", {  
            type: "FlashCard",  
            args: {   
                id: nonNull(intArg()),
            },
            
            resolve(parent, args, context) {  
                const { userId } = context
                if(!userId){
                    throw new Error("Admin are the only one to delete a flash card, if you are an admin login please")
                }  
                const { id } = args; 
                return context.prisma.flashcard.delete({
                where:{id:args.id}
                })
            },
        });
    },
});



