import React from "react";
import { promises as fs } from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const paramSlug = await params;
  const post = await fs.readFile(
    path.join(process.cwd(), "src/posts", `${paramSlug.slug}.mdx`),
    "utf-8"
  );
  const content = await compileMDX<{ title: string; description: string }>({
    source: post,
    options: { parseFrontmatter: true },
  });
  return {
    title: `${content.frontmatter.title}`,
  };
}

export default async function page({ params }: { params: { slug: string } }) {
  const paramSlug = await params;
  const post = await fs.readFile(
    path.join(process.cwd(), "src/posts", `${paramSlug.slug}.mdx`),
    "utf-8"
  );
  const content = await compileMDX<{ title: string }>({
    source: post,
    options: { parseFrontmatter: true },
  });
  return (
    <div className="w-[80%] m-auto">
      <div>{content.frontmatter.title}</div>
      <div>{content.content}</div>
    </div>
  );
}
