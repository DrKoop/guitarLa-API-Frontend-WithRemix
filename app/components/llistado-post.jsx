import Post from "./post"

export default function ListadoPost({posts}) {
  return (
    <>
      <h2 className="heading">Blog</h2>
      <div className="blog">
        {posts.map( blogpost => (
          <Post
            key={blogpost.id}
            blogpost={blogpost.attributes}
          />
        ))}
      </div>
    </>
  )
}
