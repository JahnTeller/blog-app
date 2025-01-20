import React from "react";
import { promises as fs } from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";

export default async function page() {
  const filesName = await fs.readdir(
    path.join(process.cwd(), "src/posts"),
    "utf-8"
  );
  const posts = await Promise.all(
    filesName.map(async (fileName) => {
      const post = await fs.readFile(
        path.join(process.cwd(), "src/posts", fileName),
        "utf-8"
      );

      const { frontmatter } = await compileMDX<{ title: string }>({
        source: post,
        options: { parseFrontmatter: true },
      });
      return { title: frontmatter.title, slug: fileName.replace(".mdx", "") };
    })
  );
  //   const content = await compileMDX<{ title: string }>({
  //     source: posts,
  //     options: { parseFrontmatter: true },
  //   });
  return (
    <nav className="flex flex-col gap-2">
      {posts.map((post) => (
        <Link href={`blog/${post.slug}`}>{post.title}</Link>
      ))}
    </nav>
  );
}
