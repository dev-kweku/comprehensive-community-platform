// import { visit } from "unist-util-visit";
// import type { Plugin } from 'unified'

// function removeCodeTrail(): ReturnType<Plugin> {
// 	return (tree) => {
// 		// remove trailing newline from code
// 		visit(tree, "element", (node) => {
// 			if (node.tagName === "code") {
// 				for (const child of node.children) {
// 					if (child.type === "text") {
// 						child.value = child.value.replace(/\n$/, "");
// 					}
// 				}
// 			}
// 		});
// 	};
// }


    import { visit } from "unist-util-visit";
    import type { Plugin } from "unified";

    interface ElementNode {
    type: string;
    tagName?: string;
    children?: Array<{ type: string; value?: string }>;
    }

    function removeCodeTrail(): ReturnType<Plugin> {
    return (tree) => {
        // Traverse the tree and process nodes
        visit(tree, "element", (node: ElementNode) => {
        // Ensure the node has a tagName and children
        if (node.tagName === "code" && Array.isArray(node.children)) {
            for (const child of node.children) {
            // Check if the child is of type "text" and has a value
            if (child.type === "text" && typeof child.value === "string") {
                // Remove trailing newline from the text value
                child.value = child.value.replace(/\n$/, "");
            }
            }
        }
        });
    };
    }

export { removeCodeTrail };
