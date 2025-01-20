export default interface postFrontmatter {
  author: string;
  coverImage: string;
  date: Date;
  description: string;
  title: string;
  tag: string;
  slug: string;
}

export default interface postFrontmatterResponse {
  frontmatter: postFrontmatter;
  content: ReactElement<unknown, string | JSXElementConstructor<any>>;
}
