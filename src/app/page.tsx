import Image from "next/image";
import { format } from "date-fns";
import { capitalizeAllFirstLetter, capitalizeFirstLetter } from "@/lib/utils";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { PostCard } from "@/components/postCard";
import { promises as fs } from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import postFrontmatter from "@/lib/global";

export default async function Home() {
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

      const { frontmatter, content } = await compileMDX<postFrontmatter>({
        source: post,
        options: { parseFrontmatter: true },
      });
      return { frontmatter, content };
    })
  );
  console.log(posts, "post");

  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });

  // if (sortedPosts.length === 0) {
  //   return <div>Loading...</div>;
  // }
  // console.log(sortedPosts[0]);

  return (
    <div>
      <header className="flex flex-col items-center justify-center bg-gray-200 p-4 rounded-2xl my-4">
        <h1 className="text-sm tracking-widest">WELCOME TO BULETIN</h1>
        <p className="text-2xl text-center break-words max-w-[50ch]">
          Craft narratives{" "}
          <span className="inline-flex relative w-[1.5rem] h-[1.5rem]">
            <Image src="/hand-pencil.svg" fill alt="Picture of the author" />
          </span>{" "}
          that ignite <span className="text-red-500"> inspiration </span>
          <span className="inline-flex relative w-[1.5rem] h-[1.5rem]">
            <Image src="/idea.svg" fill alt="Picture of the author" />
          </span>
          ,<span className="text-red-500"> knowlegde </span>
          <span className="inline-flex relative w-[1.5rem] h-[1.5rem]">
            <Image src="/book.svg" fill alt="Picture of the author" />
          </span>
          , and <span className="text-red-500">entertainment</span>
          <span className="inline-flex relative w-[1.5rem] h-[1.5rem]">
            <Image src="/film.svg" fill alt="Picture of the author" />
          </span>
        </p>
      </header>

      <section>
        {" "}
        {/* this is the lastest post */}
        <Link
          href={`/blog/${sortedPosts[0].frontmatter.slug}`}
          className="flex gap-3 flex-col md:flex-row items-center justify-center md:justify-between md:items-start "
        >
          {/* lastest post cover image */}
          <div className="relative w-full md:min-w-[30%] aspect-video">
            <Image
              className="object-cover rounded-lg"
              src={sortedPosts[0].frontmatter.coverImage}
              alt={"cover image"}
              fill
              sizes="100%"
              priority
            />
          </div>
          {/* lasted post detail */}
          <div className="w-full gap-3 flex flex-col md:w-[60%]">
            <div className="flex gap-3">
              <div className="">{sortedPosts[0].frontmatter.author}</div>
              <div>
                {format(
                  new Date(sortedPosts[0].frontmatter.date),
                  "hh:mm dd/MM/yyyy "
                )}
              </div>
            </div>
            <div className="text-4xl ">
              {capitalizeAllFirstLetter(sortedPosts[0].frontmatter.title)}
            </div>
            <div className="line-clamp-3">{sortedPosts[0].content}</div>
            <div className="text-red-500 font-semibold">
              {capitalizeFirstLetter(sortedPosts[0].frontmatter.tag)}
            </div>
          </div>
        </Link>
        {/* new posts */}
        <div>
          <div className="flex justify-between items-center p-3">
            <h1 className="text-2xl">New Post</h1>{" "}
            <Link className="flex gap-1" href={"/post"}>
              See more <MoveRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3" key="new-post">
            {sortedPosts.slice(1, 5).map((post) => (
              <PostCard props={post} key={post.frontmatter.slug} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
