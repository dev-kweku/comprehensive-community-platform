/* eslint-disable @typescript-eslint/no-unused-vars */
import rehypeShiki from "@shikijs/rehype";
import rehypeKatex from "rehype-katex";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import smartypants from "remark-smartypants";
import { unified, type Plugin } from "unified";
import { visit } from "unist-util-visit";
import type { Root, Element, Node } from "hast";
import { removeCodeTrail } from "./remove-code-trail";


const processor = unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(remarkRehype)
	.use(rehypeSanitize)
	.use(reduceContent)
	.use(removeLinks)
	.use(remarkMath)
	.use(rehypeKatex)
	.use(removeCodeTrail)
	.use(rehypeShiki, {
		themes: { light: "vitesse-light", dark: "vitesse-dark" },
	})
	.use(smartypants)
	.use(rehypeStringify);

async function renderSummary(content: string): Promise<string> {
	return (await processor.process(content)).toString();
}

function removeLinks(): ReturnType<Plugin> {
	return (tree: Root) => {
		visit(tree, "element", (node: Element) => {
			if (node.tagName === "a") {
				node.tagName = "span";
				node.properties = {
					...node.properties,
					href: undefined,
					className: "underline hyphens-auto",
				};
			}
		});
	};
}

function reduceContent(): ReturnType<Plugin> {
	return (tree: Root) => {
		const MAX_CHILDREN = 5;
		const children = tree.children ?? [];
		if (children.length > MAX_CHILDREN) {
			tree.children = children.slice(0, MAX_CHILDREN);
			tree.children.push({
				type: "element",
				tagName: "div",
				properties: { className: "content-more" },
				children: [],
			});
		}

		visit(tree, "element", (node: Element) => {
			if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(node.tagName)) {
				const originalTag = node.tagName;
				node.tagName = "div";
				node.properties = {
					...node.properties,
					className: "reduce-heading",
				};
				node.children = [
					{
						type: "element",
						tagName: "div",
						properties: { className: "tag" },
						children: [{ type: "text", value: originalTag }],
					},
					{
						type: "element",
						tagName: "div",
						properties: {},
						children: node.children ?? [],
					},
				];
			}
		});
	};
}

export { renderSummary };
