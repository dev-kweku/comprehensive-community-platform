// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createTagsQuery(tagsParam:Record<string, any>={}){
    const tags=Object.entries(tagsParam).flatMap(
        ([id,selection])=>{
            if(Array.isArray(selection)){
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                return selection.map((s)=>({
                    tags:{contains:`${id}:${selection}`},
                }));
            }
            return {tags:{contains:`${id}:${selection}`}}
        }
    );
    const tagsFilter=tags.length?tags:[];

    return tagsFilter;

}

export {createTagsQuery}