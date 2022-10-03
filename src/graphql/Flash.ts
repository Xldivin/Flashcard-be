import { extendType, objectType,  nonNull, stringArg } from "nexus";
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
    },
});



