import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import postFrontmatter from "@/lib/global";
export const PostCard = ({
  props,
}: {
  props: {
    frontmatter: postFrontmatter;
    content: React.ReactNode;
  };
}) => {
  return (
    <Link
      href={"/blog/" + props.frontmatter.slug}
      key={props.frontmatter.slug}
      className="flex flex-col gap-3"
    >
      <section>
        <div className="relative w-full md:min-w-[30%] aspect-square">
          <Image
            className="object-cover rounded-lg"
            src={props.frontmatter.coverImage}
            alt={"cover image"}
            fill
            sizes="100%"
          />
        </div>
        <div className="flex text-xs items-center gap-1">
          <div>{props.frontmatter.author}</div>
          <div className="rounded-[50%] w-[0.13rem] h-[0.13rem] bg-black"></div>
          <div>
            {format(new Date(props.frontmatter.date), "hh:mm dd/MM/yyyy ")}
          </div>
        </div>
        <h1 className="font-bold text-xl">{props.frontmatter.title}</h1>
        <div className="line-clamp-4 ">{props.content}</div>
        <div className="text-red-500 font-semibold">
          {props.frontmatter.tag}
        </div>
      </section>
    </Link>
  );
};
